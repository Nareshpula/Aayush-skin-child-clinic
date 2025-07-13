/*
  # Fix SMS Confirmation Message Format

  1. Changes
    - Creates utility functions for proper date and time formatting
    - Ensures correct message format for Fast2SMS template variables
    - Fixes the variables_values parameter format for the API
*/

-- Create a function to format date for SMS (DD-MM-YYYY)
CREATE OR REPLACE FUNCTION public.format_date_for_sms(p_date DATE)
RETURNS TEXT AS $$
BEGIN
  RETURN to_char(p_date, 'DD-MM-YYYY');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to format time for SMS (HH:MM AM/PM IST)
CREATE OR REPLACE FUNCTION public.format_time_for_sms(p_time TIME)
RETURNS TEXT AS $$
DECLARE
  hour_12 INTEGER;
  period TEXT;
BEGIN
  -- Extract hour and determine period (AM/PM)
  IF EXTRACT(HOUR FROM p_time) >= 12 THEN
    period := 'PM';
    hour_12 := EXTRACT(HOUR FROM p_time) - 12;
    IF hour_12 = 0 THEN
      hour_12 := 12;
    END IF;
  ELSE
    period := 'AM';
    hour_12 := EXTRACT(HOUR FROM p_time);
    IF hour_12 = 0 THEN
      hour_12 := 12;
    END IF;
  END IF;
  
  -- Format as HH:MM AM/PM IST
  RETURN LPAD(hour_12::TEXT, 2, '0') || ':' || 
         LPAD(EXTRACT(MINUTE FROM p_time)::TEXT, 2, '0') || ' ' || 
         period || ' IST';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to generate the SMS message with proper variable format
CREATE OR REPLACE FUNCTION public.generate_sms_message(
  p_patient_name TEXT,
  p_date DATE,
  p_time TIME
)
RETURNS TEXT AS $$
DECLARE
  formatted_date TEXT;
  formatted_time TEXT;
BEGIN
  -- Format date and time
  formatted_date := public.format_date_for_sms(p_date);
  formatted_time := public.format_time_for_sms(p_time);
  
  -- Return the variables joined with # for Fast2SMS template
  RETURN p_patient_name || '#' || formatted_date || '#' || formatted_time;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the functions
GRANT EXECUTE ON FUNCTION public.format_date_for_sms(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.format_time_for_sms(TIME) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.generate_sms_message(TEXT, DATE, TIME) TO anon, authenticated, service_role;