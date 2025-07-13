/*
  # Implement IST Timezone Functions for Appointment System

  1. New Functions
    - Creates functions to handle IST timezone conversions
    - Adds utility functions for date and time formatting in IST
    - Implements proper Sunday detection in IST timezone
    - Ensures correct slot generation based on IST day of week

  2. Changes
    - Fixes the get_available_slots function to use IST timezone
    - Ensures Sunday slots are only 10:00 AM to 1:00 PM IST
    - Weekday slots are 10:00 AM to 3:00 PM and 6:00 PM to 9:00 PM IST
*/

-- Create a function to convert UTC to IST
CREATE OR REPLACE FUNCTION public.convert_utc_to_ist(p_utc_timestamp TIMESTAMP WITH TIME ZONE)
RETURNS TIMESTAMP WITH TIME ZONE AS $$
BEGIN
  RETURN p_utc_timestamp AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to convert IST to UTC
CREATE OR REPLACE FUNCTION public.convert_ist_to_utc(p_ist_timestamp TIMESTAMP WITH TIME ZONE)
RETURNS TIMESTAMP WITH TIME ZONE AS $$
BEGIN
  RETURN p_ist_timestamp AT TIME ZONE 'Asia/Kolkata' AT TIME ZONE 'UTC';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to check if a date is Sunday in IST
CREATE OR REPLACE FUNCTION public.is_sunday_in_ist(p_date DATE)
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

-- Create a function to get the day of week in IST
CREATE OR REPLACE FUNCTION public.get_day_of_week_in_ist(p_date DATE)
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

-- Create a function to get the day name in IST
CREATE OR REPLACE FUNCTION public.get_day_name_in_ist(p_date DATE)
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

-- Create or replace the get_available_slots function to use IST timezone
CREATE OR REPLACE FUNCTION public.get_available_slots(
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
  exception_record RECORD;
  slot_exists BOOLEAN;
  slot_booked BOOLEAN;
  end_morning_time TIME;
  start_morning_time CONSTANT TIME := '10:00:00'::TIME;
  start_evening_time CONSTANT TIME := '18:00:00'::TIME;
  end_evening_time CONSTANT TIME := '21:00:00'::TIME;
  ist_date DATE;
BEGIN
  -- Convert UTC date to IST date for correct day of week calculation
  ist_date := (p_date::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::DATE;
  
  -- Check if the date is a Sunday in IST timezone
  is_sunday := EXTRACT(DOW FROM ist_date) = 0;
  
  -- Log the date and whether it's detected as Sunday for debugging
  RAISE NOTICE 'UTC Date: %, IST Date: %, Is Sunday in IST: %', p_date, ist_date, is_sunday;
  
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
  
  -- Log the number of slots returned for debugging
  RAISE NOTICE 'Generated slots for doctor % on % (UTC) / % (IST) (Sunday in IST: %)', 
    p_doctor_id, 
    p_date,
    ist_date,
    is_sunday;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the functions
GRANT EXECUTE ON FUNCTION public.convert_utc_to_ist(TIMESTAMP WITH TIME ZONE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.convert_ist_to_utc(TIMESTAMP WITH TIME ZONE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_sunday_in_ist(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_day_of_week_in_ist(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_day_name_in_ist(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_available_slots(INTEGER, DATE) TO anon, authenticated, service_role;

-- Create a function to test the IST timezone conversion
CREATE OR REPLACE FUNCTION public.test_ist_timezone_conversion(
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
  ist_day_name TEXT
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
    to_char((test_date::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::DATE, 'Day') AS ist_day_name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.test_ist_timezone_conversion(DATE) TO anon, authenticated, service_role;