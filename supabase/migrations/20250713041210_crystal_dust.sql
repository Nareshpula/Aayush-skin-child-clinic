-- Create a simplified function to convert UTC date to IST date
CREATE OR REPLACE FUNCTION public.convert_utc_to_ist_simple(p_date DATE)
RETURNS DATE AS $$
BEGIN
  -- Add 5 hours and 30 minutes to the date to convert from UTC to IST
  RETURN (p_date::TIMESTAMP + INTERVAL '5 hours 30 minutes')::DATE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a simplified function to check if a date is Sunday in IST timezone
CREATE OR REPLACE FUNCTION public.is_sunday_simple(p_date DATE)
RETURNS BOOLEAN AS $$
DECLARE
  ist_date DATE;
BEGIN
  -- Convert to IST using the simple function
  ist_date := public.convert_utc_to_ist_simple(p_date);
  
  -- Check if it's Sunday (day of week = 0)
  RETURN EXTRACT(DOW FROM ist_date) = 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a simplified function to check if a date is today in IST timezone
CREATE OR REPLACE FUNCTION public.is_today_simple(p_date DATE)
RETURNS BOOLEAN AS $$
DECLARE
  ist_date DATE;
  ist_today DATE;
BEGIN
  -- Convert to IST using the simple function
  ist_date := public.convert_utc_to_ist_simple(p_date);
  
  -- Get today's date in IST
  ist_today := (CURRENT_TIMESTAMP + INTERVAL '5 hours 30 minutes')::DATE;
  
  -- Check if it's today
  RETURN ist_date = ist_today;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a simplified function to get the day name in IST timezone
CREATE OR REPLACE FUNCTION public.get_day_name_simple(p_date DATE)
RETURNS TEXT AS $$
DECLARE
  ist_date DATE;
BEGIN
  -- Convert to IST using the simple function
  ist_date := public.convert_utc_to_ist_simple(p_date);
  
  -- Return the day name
  RETURN TRIM(to_char(ist_date, 'Day'));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get available slots with simplified timezone handling
CREATE OR REPLACE FUNCTION public.get_available_slots_simple(
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
  -- Convert to IST using the simple function
  ist_date := public.convert_utc_to_ist_simple(p_date);
  
  -- Check if it's Sunday using the simple function
  is_sunday := public.is_sunday_simple(p_date);
  
  -- Check if it's today using the simple function
  is_today := public.is_today_simple(p_date);
  
  -- Log for debugging
  RAISE NOTICE 'Date: %, IST Date: %, Is Sunday: %, Is Today: %', 
    p_date, ist_date, is_sunday, is_today;
  
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
GRANT EXECUTE ON FUNCTION public.convert_utc_to_ist_simple(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_sunday_simple(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_today_simple(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_day_name_simple(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_available_slots_simple(INTEGER, DATE) TO anon, authenticated, service_role;

-- Add comments to explain the functions
COMMENT ON FUNCTION public.convert_utc_to_ist_simple(DATE) IS 'Converts a UTC date to IST date with simple offset addition';
COMMENT ON FUNCTION public.is_sunday_simple(DATE) IS 'Checks if a date is Sunday in IST timezone with simple conversion';
COMMENT ON FUNCTION public.is_today_simple(DATE) IS 'Checks if a date is today in IST timezone with simple conversion';
COMMENT ON FUNCTION public.get_day_name_simple(DATE) IS 'Gets the day name in IST timezone with simple conversion';
COMMENT ON FUNCTION public.get_available_slots_simple(INTEGER, DATE) IS 'Gets available time slots with simplified timezone handling';