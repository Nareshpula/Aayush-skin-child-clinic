/*
  # Fix IST Timezone and Slot Display Issues

  1. Changes
    - Fixes Sunday detection to properly use IST timezone
    - Ensures all time slots are properly displayed including end times
    - Adds proper timezone conversion for all days of the week
    - Includes debugging functions to verify timezone conversions
*/

-- Create or replace the get_available_slots function in the public schema
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

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.get_available_slots(INTEGER, DATE) TO anon, authenticated, service_role;

-- Create a function to test the IST timezone conversion
CREATE OR REPLACE FUNCTION public.test_ist_timezone_conversion_v3(
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
GRANT EXECUTE ON FUNCTION public.test_ist_timezone_conversion_v3(DATE) TO service_role;

-- Create a function to test the slot generation with IST timezone
CREATE OR REPLACE FUNCTION public.test_slot_generation_with_ist_v3(
  p_doctor_id INTEGER,
  p_date DATE
)
RETURNS TABLE (
  time_slot TIME,
  is_available BOOLEAN,
  is_sunday_in_utc BOOLEAN,
  is_sunday_in_ist BOOLEAN,
  end_morning_time TIME,
  total_slots INTEGER,
  utc_date DATE,
  ist_date DATE
) AS $$
DECLARE
  is_sunday_utc BOOLEAN;
  is_sunday_ist BOOLEAN;
  end_time TIME;
  ist_date_val DATE;
  slot_count INTEGER := 0;
BEGIN
  -- Convert UTC date to IST date for correct day of week calculation
  ist_date_val := (p_date::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::DATE;
  
  -- Calculate Sunday status in both UTC and IST
  is_sunday_utc := EXTRACT(DOW FROM p_date) = 0;
  is_sunday_ist := EXTRACT(DOW FROM ist_date_val) = 0;
  
  -- Set end time based on IST Sunday
  IF is_sunday_ist THEN
    end_time := '13:00:00'::TIME;
  ELSE
    end_time := '15:00:00'::TIME;
  END IF;
  
  -- Count the total number of slots
  SELECT COUNT(*) INTO slot_count FROM public.get_available_slots(p_doctor_id, p_date);
  
  -- Get available slots
  FOR time_slot, is_available IN 
    SELECT s.time_slot, s.is_available FROM public.get_available_slots(p_doctor_id, p_date) s
  LOOP
    RETURN QUERY
    SELECT 
      time_slot,
      is_available,
      is_sunday_utc,
      is_sunday_ist,
      end_time,
      slot_count,
      p_date,
      ist_date_val;
  END LOOP;
  
  -- If no slots were returned, return a single row with NULL time_slot
  IF NOT FOUND THEN
    RETURN QUERY
    SELECT 
      NULL::TIME,
      FALSE,
      is_sunday_utc,
      is_sunday_ist,
      end_time,
      0,
      p_date,
      ist_date_val;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.test_slot_generation_with_ist_v3(INTEGER, DATE) TO service_role;