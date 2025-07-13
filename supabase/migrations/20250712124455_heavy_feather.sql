/*
  # Fix Date-Day Mapping and Same-Day Booking Issues

  1. Changes
    - Adds a function to properly check if a date is today in IST timezone
    - Ensures correct day of week calculation in IST timezone
    - Blocks same-day appointment bookings
    - Fixes Sunday slot generation logic
*/

-- Create a function to check if a date is today in IST timezone
CREATE OR REPLACE FUNCTION public.is_date_today_in_ist(p_date DATE)
RETURNS BOOLEAN AS $$
DECLARE
  ist_date DATE;
  ist_today DATE;
BEGIN
  -- Convert input date to IST
  ist_date := (p_date::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::DATE;
  
  -- Get current date in IST
  ist_today := (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata')::DATE;
  
  -- Return true if the dates match
  RETURN ist_date = ist_today;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get the correct day of week in IST timezone
CREATE OR REPLACE FUNCTION public.get_day_of_week_in_ist_v2(p_date DATE)
RETURNS INTEGER AS $$
DECLARE
  ist_date DATE;
BEGIN
  -- Convert UTC date to IST date
  ist_date := (p_date::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::DATE;
  
  -- Return the day of week (0 = Sunday, 1 = Monday, etc.)
  RETURN EXTRACT(DOW FROM ist_date);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get the correct day name in IST timezone
CREATE OR REPLACE FUNCTION public.get_day_name_in_ist_v2(p_date DATE)
RETURNS TEXT AS $$
DECLARE
  ist_date DATE;
BEGIN
  -- Convert UTC date to IST date
  ist_date := (p_date::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::DATE;
  
  -- Return the day name
  RETURN to_char(ist_date, 'Day');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to check if a date is Sunday in IST timezone
CREATE OR REPLACE FUNCTION public.is_sunday_in_ist_v2(p_date DATE)
RETURNS BOOLEAN AS $$
DECLARE
  ist_date DATE;
BEGIN
  -- Convert UTC date to IST date
  ist_date := (p_date::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::DATE;
  
  -- Check if it's Sunday (day of week = 0)
  RETURN EXTRACT(DOW FROM ist_date) = 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to validate appointment date with improved error messages
CREATE OR REPLACE FUNCTION public.validate_appointment_date_v2(p_date DATE)
RETURNS JSONB AS $$
DECLARE
  is_today BOOLEAN;
BEGIN
  -- Check if the date is today in IST
  is_today := public.is_date_today_in_ist(p_date);
  
  -- If it's today, return error
  IF is_today THEN
    RETURN jsonb_build_object(
      'valid', false,
      'error', 'Same-day appointments are not allowed. Please select a future date.'
    );
  END IF;
  
  -- Otherwise, return success
  RETURN jsonb_build_object(
    'valid', true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create an improved version of get_available_slots function
CREATE OR REPLACE FUNCTION public.get_available_slots_v5(
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
  ist_date DATE;
  is_today BOOLEAN;
BEGIN
  -- Convert UTC date to IST date for correct day of week calculation
  ist_date := (p_date::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::DATE;
  
  -- Check if the date is a Sunday in IST timezone
  is_sunday := EXTRACT(DOW FROM ist_date) = 0;
  
  -- Check if the date is today in IST timezone
  is_today := public.is_date_today_in_ist(p_date);
  
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
GRANT EXECUTE ON FUNCTION public.is_date_today_in_ist(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_day_of_week_in_ist_v2(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_day_name_in_ist_v2(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_sunday_in_ist_v2(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.validate_appointment_date_v2(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_available_slots_v5(INTEGER, DATE) TO anon, authenticated, service_role;

-- Add comments to explain the functions
COMMENT ON FUNCTION public.is_date_today_in_ist(DATE) IS 'Checks if a date is today in IST timezone with improved accuracy';
COMMENT ON FUNCTION public.get_day_of_week_in_ist_v2(DATE) IS 'Gets the day of week in IST timezone with improved accuracy';
COMMENT ON FUNCTION public.get_day_name_in_ist_v2(DATE) IS 'Gets the day name in IST timezone with improved accuracy';
COMMENT ON FUNCTION public.is_sunday_in_ist_v2(DATE) IS 'Checks if a date is Sunday in IST timezone with improved accuracy';
COMMENT ON FUNCTION public.validate_appointment_date_v2(DATE) IS 'Validates an appointment date with improved error messages';
COMMENT ON FUNCTION public.get_available_slots_v5(INTEGER, DATE) IS 'Gets available time slots with improved timezone handling and same-day booking prevention';