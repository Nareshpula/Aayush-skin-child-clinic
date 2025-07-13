/*
  # Fix SMS Confirmation Message Format

  1. Changes
    - Creates a function to format date and time for SMS messages
    - Ensures proper variable formatting for Fast2SMS template
    - Fixes the confirmation message to include patient name, date, and time
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

-- Create a function to test the SMS message format
CREATE OR REPLACE FUNCTION public.test_sms_message_format(
  p_patient_name TEXT DEFAULT 'John Doe',
  p_date DATE DEFAULT CURRENT_DATE,
  p_time TIME DEFAULT '14:30:00'::TIME
)
RETURNS JSONB AS $$
DECLARE
  formatted_date TEXT;
  formatted_time TEXT;
  message TEXT;
BEGIN
  -- Format date and time
  formatted_date := public.format_date_for_sms(p_date);
  formatted_time := public.format_time_for_sms(p_time);
  
  -- Create the message with # delimiter for Fast2SMS template
  message := p_patient_name || '#' || formatted_date || '#' || formatted_time;
  
  -- Return the test result
  RETURN jsonb_build_object(
    'success', true,
    'sender_id', 'ACSHPL',
    'otp_template_id', '188110',
    'confirmation_template_id', '188111',
    'template', 'Dear {#VAR#}, your appointment at AAYUSH CHILD & SKIN Hospital, Madanapalle is confirmed for {#VAR#} at {#VAR#}. Thank you for choosing us!',
    'variables', jsonb_build_array(p_patient_name, formatted_date, formatted_time),
    'message_format', message,
    'expected_sms', 'Dear ' || p_patient_name || ', your appointment at AAYUSH CHILD & SKIN Hospital, Madanapalle is confirmed for ' || formatted_date || ' at ' || formatted_time || '. Thank you for choosing us!'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the functions
GRANT EXECUTE ON FUNCTION public.format_date_for_sms(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.format_time_for_sms(TIME) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.test_sms_message_format(TEXT, DATE, TIME) TO anon, authenticated, service_role;