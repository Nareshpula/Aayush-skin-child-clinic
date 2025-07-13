/*
  # Fix Date Selection Bug in Appointment Calendar

  1. Changes
    - Adds improved timezone conversion functions
    - Fixes the day name calculation in IST timezone
    - Ensures proper handling of date selection across timezone boundaries
    - Adds debug functions to verify timezone conversions
*/

-- Create a function to convert UTC date to IST date with proper timezone handling
CREATE OR REPLACE FUNCTION public.convert_utc_date_to_ist(p_utc_date DATE)
RETURNS DATE AS $$
BEGIN
  -- Convert UTC date to IST date with explicit timezone conversion
  RETURN (p_utc_date::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::DATE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get the day name in IST timezone with proper formatting
CREATE OR REPLACE FUNCTION public.get_day_name_in_ist_v4(p_date DATE)
RETURNS TEXT AS $$
DECLARE
  ist_date DATE;
  day_name TEXT;
BEGIN
  -- Convert UTC date to IST date
  ist_date := public.convert_utc_date_to_ist(p_date);
  
  -- Get the day name and trim whitespace
  day_name := TRIM(to_char(ist_date, 'Day'));
  
  -- Return the day name
  RETURN day_name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to check if a date is Sunday in IST timezone
CREATE OR REPLACE FUNCTION public.is_sunday_in_ist_v4(p_date DATE)
RETURNS BOOLEAN AS $$
DECLARE
  ist_date DATE;
  day_of_week INTEGER;
BEGIN
  -- Convert UTC date to IST date
  ist_date := public.convert_utc_date_to_ist(p_date);
  
  -- Get the day of week (0 = Sunday)
  day_of_week := EXTRACT(DOW FROM ist_date);
  
  -- Return true if it's Sunday
  RETURN day_of_week = 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to check if a date is today in IST timezone
CREATE OR REPLACE FUNCTION public.is_today_in_ist_v2(p_date DATE)
RETURNS BOOLEAN AS $$
DECLARE
  ist_date DATE;
  ist_today DATE;
BEGIN
  -- Convert UTC date to IST date
  ist_date := public.convert_utc_date_to_ist(p_date);
  
  -- Get today's date in IST
  ist_today := (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata')::DATE;
  
  -- Return true if the date is today
  RETURN ist_date = ist_today;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a comprehensive test function for timezone conversions
CREATE OR REPLACE FUNCTION public.test_timezone_conversion_v2(
  test_date DATE
)
RETURNS JSONB AS $$
DECLARE
  ist_date DATE;
  ist_timestamp TIMESTAMP WITH TIME ZONE;
  utc_day_of_week INTEGER;
  ist_day_of_week INTEGER;
  utc_day_name TEXT;
  ist_day_name TEXT;
  is_sunday_in_utc BOOLEAN;
  is_sunday_in_ist BOOLEAN;
  is_today_in_ist BOOLEAN;
BEGIN
  -- Convert UTC date to IST
  ist_timestamp := test_date::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata';
  ist_date := ist_timestamp::DATE;
  
  -- Get day of week in UTC and IST
  utc_day_of_week := EXTRACT(DOW FROM test_date);
  ist_day_of_week := EXTRACT(DOW FROM ist_date);
  
  -- Get day name in UTC and IST
  utc_day_name := TRIM(to_char(test_date, 'Day'));
  ist_day_name := TRIM(to_char(ist_date, 'Day'));
  
  -- Check if it's Sunday in UTC and IST
  is_sunday_in_utc := utc_day_of_week = 0;
  is_sunday_in_ist := ist_day_of_week = 0;
  
  -- Check if it's today in IST
  is_today_in_ist := ist_date = (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata')::DATE;
  
  -- Return detailed information
  RETURN jsonb_build_object(
    'input_date', test_date,
    'utc_timestamp', test_date::TIMESTAMP,
    'ist_timestamp', ist_timestamp,
    'ist_date', ist_date,
    'utc_day_of_week', utc_day_of_week,
    'ist_day_of_week', ist_day_of_week,
    'utc_day_name', utc_day_name,
    'ist_day_name', ist_day_name,
    'is_sunday_in_utc', is_sunday_in_utc,
    'is_sunday_in_ist', is_sunday_in_ist,
    'is_today_in_ist', is_today_in_ist,
    'current_ist_date', (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata')::DATE,
    'timezone_offset_hours', EXTRACT(TIMEZONE_HOUR FROM ist_timestamp),
    'timezone_offset_minutes', EXTRACT(TIMEZONE_MINUTE FROM ist_timestamp)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get available slots with fixed timezone handling
CREATE OR REPLACE FUNCTION public.get_available_slots_v7(
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
  ist_date := public.convert_utc_date_to_ist(p_date);
  
  -- Check if the date is a Sunday in IST timezone
  is_sunday := EXTRACT(DOW FROM ist_date) = 0;
  
  -- Check if the date is today in IST timezone
  is_today := ist_date = (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata')::DATE;
  
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
GRANT EXECUTE ON FUNCTION public.convert_utc_date_to_ist(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_day_name_in_ist_v4(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_sunday_in_ist_v4(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_today_in_ist_v2(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.test_timezone_conversion_v2(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_available_slots_v7(INTEGER, DATE) TO anon, authenticated, service_role;

-- Add comments to explain the functions
COMMENT ON FUNCTION public.convert_utc_date_to_ist(DATE) IS 'Converts a UTC date to IST date with proper timezone handling';
COMMENT ON FUNCTION public.get_day_name_in_ist_v4(DATE) IS 'Gets the day name in IST timezone with proper formatting';
COMMENT ON FUNCTION public.is_sunday_in_ist_v4(DATE) IS 'Checks if a date is Sunday in IST timezone with proper timezone handling';
COMMENT ON FUNCTION public.is_today_in_ist_v2(DATE) IS 'Checks if a date is today in IST timezone with proper timezone handling';
COMMENT ON FUNCTION public.test_timezone_conversion_v2(DATE) IS 'Tests timezone conversion with detailed output for debugging';
COMMENT ON FUNCTION public.get_available_slots_v7(INTEGER, DATE) IS 'Gets available time slots with fixed timezone handling';