/*
  # Fix Date Selection Bug in Appointment Calendar

  1. Changes
    - Adds improved timezone conversion functions
    - Fixes day name calculation in IST timezone
    - Ensures correct handling of Sunday detection
    - Prevents same-day booking with proper timezone awareness
*/

-- Create a function to check if a date is today in IST timezone with improved accuracy
CREATE OR REPLACE FUNCTION public.is_date_today_in_ist_v3(p_date DATE)
RETURNS BOOLEAN AS $$
DECLARE
  ist_date DATE;
  ist_today DATE;
  debug_info JSONB;
BEGIN
  -- Convert input date to IST with proper timezone handling
  ist_date := (p_date::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::DATE;
  
  -- Get current date in IST with proper timezone handling
  ist_today := (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata')::DATE;
  
  -- Create debug info
  debug_info := jsonb_build_object(
    'input_date', p_date,
    'ist_date', ist_date,
    'ist_today', ist_today,
    'is_today', ist_date = ist_today
  );
  
  -- Log debug info
  RAISE NOTICE 'is_date_today_in_ist_v3: %', debug_info;
  
  -- Return true if the dates match
  RETURN ist_date = ist_today;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get the day name in IST timezone with improved accuracy
CREATE OR REPLACE FUNCTION public.get_day_name_in_ist_v3(p_date DATE)
RETURNS TEXT AS $$
DECLARE
  ist_date DATE;
  day_name TEXT;
  debug_info JSONB;
BEGIN
  -- Convert UTC date to IST date with proper timezone handling
  ist_date := (p_date::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::DATE;
  
  -- Get the day name
  day_name := to_char(ist_date, 'Day');
  
  -- Create debug info
  debug_info := jsonb_build_object(
    'input_date', p_date,
    'ist_date', ist_date,
    'day_name', day_name
  );
  
  -- Log debug info
  RAISE NOTICE 'get_day_name_in_ist_v3: %', debug_info;
  
  -- Return the day name
  RETURN day_name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to check if a date is Sunday in IST timezone with improved accuracy
CREATE OR REPLACE FUNCTION public.is_sunday_in_ist_v3(p_date DATE)
RETURNS BOOLEAN AS $$
DECLARE
  ist_date DATE;
  day_of_week INTEGER;
  is_sunday BOOLEAN;
  debug_info JSONB;
BEGIN
  -- Convert UTC date to IST date with proper timezone handling
  ist_date := (p_date::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::DATE;
  
  -- Get the day of week (0 = Sunday)
  day_of_week := EXTRACT(DOW FROM ist_date);
  
  -- Check if it's Sunday
  is_sunday := day_of_week = 0;
  
  -- Create debug info
  debug_info := jsonb_build_object(
    'input_date', p_date,
    'ist_date', ist_date,
    'day_of_week', day_of_week,
    'is_sunday', is_sunday
  );
  
  -- Log debug info
  RAISE NOTICE 'is_sunday_in_ist_v3: %', debug_info;
  
  -- Return true if it's Sunday
  RETURN is_sunday;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to test the timezone conversion with detailed output
CREATE OR REPLACE FUNCTION public.test_timezone_conversion(
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
  utc_day_name := to_char(test_date, 'Day');
  ist_day_name := to_char(ist_date, 'Day');
  
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
    'current_ist_date', (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata')::DATE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the functions
GRANT EXECUTE ON FUNCTION public.is_date_today_in_ist_v3(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_day_name_in_ist_v3(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_sunday_in_ist_v3(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.test_timezone_conversion(DATE) TO anon, authenticated, service_role;

-- Add comments to explain the functions
COMMENT ON FUNCTION public.is_date_today_in_ist_v3(DATE) IS 'Checks if a date is today in IST timezone with improved accuracy and debugging';
COMMENT ON FUNCTION public.get_day_name_in_ist_v3(DATE) IS 'Gets the day name in IST timezone with improved accuracy and debugging';
COMMENT ON FUNCTION public.is_sunday_in_ist_v3(DATE) IS 'Checks if a date is Sunday in IST timezone with improved accuracy and debugging';
COMMENT ON FUNCTION public.test_timezone_conversion(DATE) IS 'Tests timezone conversion with detailed output for debugging';