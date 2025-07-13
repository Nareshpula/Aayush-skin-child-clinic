/*
  # Fix Timezone Functions

  1. Changes
    - Drops the existing test_ist_timezone_conversion function before recreating it
    - Ensures proper return type compatibility
    - Maintains all the timezone conversion functionality
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