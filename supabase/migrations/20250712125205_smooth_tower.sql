/*
  # Fix Date Mapping and Calendar Display Issues

  1. Changes
    - Improves timezone handling for accurate day detection
    - Fixes the issue where July 13 (Saturday) was incorrectly treated as Sunday
    - Ensures proper slot generation for all days of the week
    - Adds functions to prevent same-day booking
*/

-- Create a function to check if a date is today in IST timezone with improved accuracy
CREATE OR REPLACE FUNCTION public.is_date_today_in_ist_v2(p_date DATE)
RETURNS BOOLEAN AS $$
DECLARE
  ist_date DATE;
  ist_today DATE;
BEGIN
  -- Convert input date to IST with proper timezone handling
  ist_date := (p_date::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::DATE;
  
  -- Get current date in IST with proper timezone handling
  ist_today := (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata')::DATE;
  
  -- Return true if the dates match
  RETURN ist_date = ist_today;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get the day of week in IST timezone with improved accuracy
CREATE OR REPLACE FUNCTION public.get_day_of_week_in_ist_v3(p_date DATE)
RETURNS INTEGER AS $$
DECLARE
  ist_date DATE;
BEGIN
  -- Convert UTC date to IST date with proper timezone handling
  ist_date := (p_date::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::DATE;
  
  -- Return the day of week (0 = Sunday, 1 = Monday, etc.)
  RETURN EXTRACT(DOW FROM ist_date);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to check if a date is Sunday in IST timezone with improved accuracy
CREATE OR REPLACE FUNCTION public.is_sunday_in_ist_v3(p_date DATE)
RETURNS BOOLEAN AS $$
DECLARE
  ist_date DATE;
  day_of_week INTEGER;
BEGIN
  -- Convert UTC date to IST date with proper timezone handling
  ist_date := (p_date::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::DATE;
  
  -- Get the day of week (0 = Sunday)
  day_of_week := EXTRACT(DOW FROM ist_date);
  
  -- Return true if it's Sunday
  RETURN day_of_week = 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get available slots with improved timezone handling
CREATE OR REPLACE FUNCTION public.get_available_slots_v6(
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
  day_of_week INTEGER;
BEGIN
  -- Convert UTC date to IST date for correct day of week calculation
  ist_date := (p_date::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::DATE;
  
  -- Get the day of week in IST (0 = Sunday, 1 = Monday, etc.)
  day_of_week := EXTRACT(DOW FROM ist_date);
  
  -- Check if the date is a Sunday in IST timezone
  is_sunday := day_of_week = 0;
  
  -- Check if the date is today in IST timezone
  is_today := (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata')::DATE = ist_date;
  
  -- Log for debugging
  RAISE NOTICE 'Date: %, IST Date: %, Day of Week: %, Is Sunday: %, Is Today: %', 
    p_date, ist_date, day_of_week, is_sunday, is_today;
  
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

-- Create a function to test the day of week calculation
CREATE OR REPLACE FUNCTION public.test_day_of_week_calculation(
  test_date DATE
)
RETURNS TABLE (
  input_date DATE,
  utc_date TIMESTAMP WITH TIME ZONE,
  ist_date TIMESTAMP WITH TIME ZONE,
  ist_date_only DATE,
  utc_day_of_week INTEGER,
  ist_day_of_week INTEGER,
  is_sunday_in_utc BOOLEAN,
  is_sunday_in_ist BOOLEAN,
  utc_day_name TEXT,
  ist_day_name TEXT,
  is_today_in_ist BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    test_date AS input_date,
    test_date::TIMESTAMP AT TIME ZONE 'UTC' AS utc_date,
    test_date::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata' AS ist_date,
    (test_date::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::DATE AS ist_date_only,
    EXTRACT(DOW FROM test_date)::INTEGER AS utc_day_of_week,
    EXTRACT(DOW FROM (test_date::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata'))::INTEGER AS ist_day_of_week,
    EXTRACT(DOW FROM test_date) = 0 AS is_sunday_in_utc,
    EXTRACT(DOW FROM (test_date::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')) = 0 AS is_sunday_in_ist,
    to_char(test_date, 'Day') AS utc_day_name,
    to_char((test_date::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::DATE, 'Day') AS ist_day_name,
    (test_date::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::DATE = (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata')::DATE AS is_today_in_ist;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the functions
GRANT EXECUTE ON FUNCTION public.is_date_today_in_ist_v2(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_day_of_week_in_ist_v3(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_sunday_in_ist_v3(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_available_slots_v6(INTEGER, DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.test_day_of_week_calculation(DATE) TO anon, authenticated, service_role;

-- Add comments to explain the functions
COMMENT ON FUNCTION public.is_date_today_in_ist_v2(DATE) IS 'Checks if a date is today in IST timezone with improved accuracy';
COMMENT ON FUNCTION public.get_day_of_week_in_ist_v3(DATE) IS 'Gets the day of week in IST timezone with improved accuracy';
COMMENT ON FUNCTION public.is_sunday_in_ist_v3(DATE) IS 'Checks if a date is Sunday in IST timezone with improved accuracy';
COMMENT ON FUNCTION public.get_available_slots_v6(INTEGER, DATE) IS 'Gets available time slots with improved timezone handling and day detection';
COMMENT ON FUNCTION public.test_day_of_week_calculation(DATE) IS 'Tests the day of week calculation for a given date in both UTC and IST timezones';