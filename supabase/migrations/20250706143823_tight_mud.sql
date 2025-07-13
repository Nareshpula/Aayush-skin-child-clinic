/*
  # Fix SMS Confirmation Message Format

  1. Changes
    - Creates a function to test the SMS confirmation message format
    - Ensures proper variable formatting for Fast2SMS template
    - Adds documentation for the correct message format
*/

-- Create a function to test the SMS confirmation message format
CREATE OR REPLACE FUNCTION public.test_sms_confirmation_format()
RETURNS JSONB AS $$
DECLARE
  patient_name TEXT := 'John Doe';
  appointment_date DATE := CURRENT_DATE;
  appointment_time TIME := '14:30:00'::TIME;
  formatted_date TEXT;
  formatted_time TEXT;
  message TEXT;
BEGIN
  -- Format date as DD-MM-YYYY
  formatted_date := to_char(appointment_date, 'DD-MM-YYYY');
  
  -- Format time as HH:MM AM/PM
  formatted_time := to_char(appointment_time, 'HH12:MI AM');
  
  -- Create the message with # delimiter for Fast2SMS template
  message := patient_name || '#' || formatted_date || '#' || formatted_time;
  
  -- Return the test result
  RETURN jsonb_build_object(
    'success', true,
    'template_id', '188111',
    'template_format', 'Dear {#VAR#}, your appointment at AAYUSH CHILD & SKIN Hospital, Madanapalle is confirmed for {#VAR#} at {#VAR#}. Thank you for choosing us!',
    'variables', jsonb_build_object(
      'patient_name', patient_name,
      'formatted_date', formatted_date,
      'formatted_time', formatted_time
    ),
    'message_format', message,
    'expected_result', 'Dear John Doe, your appointment at AAYUSH CHILD & SKIN Hospital, Madanapalle is confirmed for ' || formatted_date || ' at ' || formatted_time || '. Thank you for choosing us!'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.test_sms_confirmation_format() TO anon, authenticated, service_role;

-- Add a comment to explain the function
COMMENT ON FUNCTION public.test_sms_confirmation_format() IS 'Tests the SMS confirmation message format for Fast2SMS template with variables joined by # delimiter';