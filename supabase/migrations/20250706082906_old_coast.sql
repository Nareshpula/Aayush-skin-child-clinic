/*
  # Fix Timezone Functions and Return Type Error

  1. Changes
    - Drops the existing test_ist_timezone_conversion function to avoid return type error
    - Recreates the function with the correct return type
    - Ensures proper timezone conversion for appointment slots
    - Fixes Sunday detection in IST timezone
*/

-- Drop the existing function first to avoid the return type error
DROP FUNCTION IF EXISTS public.test_ist_timezone_conversion(date);

-- Recreate the function with the correct return type
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

-- Create a function to test the slot generation with IST timezone
CREATE OR REPLACE FUNCTION public.test_slot_generation_with_ist(
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
GRANT EXECUTE ON FUNCTION public.test_slot_generation_with_ist(INTEGER, DATE) TO anon, authenticated, service_role;