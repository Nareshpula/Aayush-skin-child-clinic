/*
  # Simplify Timezone Handling for Appointment System

  1. Changes
    - Creates simple functions for timezone handling without complex conversions
    - Adds utility functions for date formatting and day detection
    - Ensures proper Sunday detection for appointment scheduling
*/

-- Create a simple function to check if a date is a Sunday
CREATE OR REPLACE FUNCTION public.is_sunday_simple_v2(p_date DATE)
RETURNS BOOLEAN AS $$
BEGIN
  -- Simply check if the day of week is Sunday (0)
  RETURN EXTRACT(DOW FROM p_date) = 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to format date for display
CREATE OR REPLACE FUNCTION public.format_date_for_display_v2(p_date DATE)
RETURNS TEXT AS $$
BEGIN
  RETURN to_char(p_date, 'Day, Month DD, YYYY');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get the day name
CREATE OR REPLACE FUNCTION public.get_day_name_v2(p_date DATE)
RETURNS TEXT AS $$
BEGIN
  RETURN TRIM(to_char(p_date, 'Day'));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to check if a date is today or in the past
CREATE OR REPLACE FUNCTION public.is_date_today_or_past(p_date DATE)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN p_date <= CURRENT_DATE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to check if a date is in the future
CREATE OR REPLACE FUNCTION public.is_date_future(p_date DATE)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN p_date > CURRENT_DATE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get available slots with simplified approach
CREATE OR REPLACE FUNCTION public.get_available_slots_simple_v2(
  p_doctor_id INTEGER,
  p_date DATE
)
RETURNS TABLE (
  time_slot TIME,
  is_available BOOLEAN
) AS $$
DECLARE
  slot_time TIME;
  is_sunday BOOLEAN;
  slot_booked BOOLEAN;
  end_morning_time TIME;
  start_morning_time CONSTANT TIME := '10:00:00'::TIME;
  start_evening_time CONSTANT TIME := '18:00:00'::TIME;
  end_evening_time CONSTANT TIME := '21:00:00'::TIME;
  is_today BOOLEAN;
BEGIN
  -- Check if the date is a Sunday
  is_sunday := public.is_sunday_simple_v2(p_date);
  
  -- Check if the date is today
  is_today := p_date = CURRENT_DATE;
  
  -- Log for debugging
  RAISE NOTICE 'Date: %, Is Sunday: %, Is Today: %', p_date, is_sunday, is_today;
  
  -- If it's today, return no available slots
  IF is_today THEN
    RETURN;
  END IF;
  
  -- Set the end time for morning slots based on whether it's Sunday
  IF is_sunday THEN
    end_morning_time := '13:00:00'::TIME;
  ELSE
    end_morning_time := '15:00:00'::TIME;
  END IF;
  
  -- Morning slots (10:00 AM to end_morning_time)
  slot_time := start_morning_time;
  
  -- Process morning slots - INCLUDE the end time (<=)
  WHILE slot_time <= end_morning_time LOOP
    -- Check if there's any exception for this doctor at this date and time
    SELECT EXISTS (
      SELECT 1
      FROM aayush.doctor_exceptions
      WHERE doctor_id = p_doctor_id
        AND date = p_date
        AND slot_time >= start_time
        AND slot_time < end_time
    ) INTO slot_booked;
    
    -- Check if there's already a booked appointment at this time
    IF NOT slot_booked THEN
      SELECT EXISTS (
        SELECT 1
        FROM aayush.appointment_slots
        WHERE doctor_id = p_doctor_id
          AND date = p_date
          AND time = slot_time
          AND is_booked = true
      ) INTO slot_booked;
    END IF;
    
    -- Return the slot
    time_slot := slot_time;
    is_available := NOT slot_booked;
    RETURN NEXT;
    
    -- Increment by 15 minutes
    slot_time := slot_time + INTERVAL '15 minutes';
  END LOOP;
  
  -- Evening slots (6:00 PM to 9:00 PM) - only for non-Sundays
  IF NOT is_sunday THEN
    slot_time := start_evening_time;
    -- Process evening slots - INCLUDE the end time (<=)
    WHILE slot_time <= end_evening_time LOOP
      -- Check if there's any exception for this doctor at this date and time
      SELECT EXISTS (
        SELECT 1
        FROM aayush.doctor_exceptions
        WHERE doctor_id = p_doctor_id
          AND date = p_date
          AND slot_time >= start_time
          AND slot_time < end_time
      ) INTO slot_booked;
      
      -- Check if there's already a booked appointment at this time
      IF NOT slot_booked THEN
        SELECT EXISTS (
          SELECT 1
          FROM aayush.appointment_slots
          WHERE doctor_id = p_doctor_id
            AND date = p_date
            AND time = slot_time
            AND is_booked = true
        ) INTO slot_booked;
      END IF;
      
      -- Return the slot
      time_slot := slot_time;
      is_available := NOT slot_booked;
      RETURN NEXT;
      
      -- Increment by 15 minutes
      slot_time := slot_time + INTERVAL '15 minutes';
    END LOOP;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the functions
GRANT EXECUTE ON FUNCTION public.is_sunday_simple_v2(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.format_date_for_display_v2(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_day_name_v2(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_date_today_or_past(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_date_future(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_available_slots_simple_v2(INTEGER, DATE) TO anon, authenticated, service_role;

-- Add comments to explain the functions
COMMENT ON FUNCTION public.is_sunday_simple_v2(DATE) IS 'Simple function to check if a date is a Sunday';
COMMENT ON FUNCTION public.format_date_for_display_v2(DATE) IS 'Formats a date for display';
COMMENT ON FUNCTION public.get_day_name_v2(DATE) IS 'Gets the day name for a date';
COMMENT ON FUNCTION public.is_date_today_or_past(DATE) IS 'Checks if a date is today or in the past';
COMMENT ON FUNCTION public.is_date_future(DATE) IS 'Checks if a date is in the future';
COMMENT ON FUNCTION public.get_available_slots_simple_v2(INTEGER, DATE) IS 'Gets available time slots with a simplified approach';