/*
  # Update SMS Confirmation Template

  1. Changes
    - Updates the confirmation SMS template to include patient name, date, and time
    - Ensures proper formatting of date (DD-MM-YYYY) and time (HH:MM AM/PM IST)
    - Creates a function to format date and time values for SMS
*/

-- Create a function to format date for SMS (DD-MM-YYYY)
CREATE OR REPLACE FUNCTION aayush.format_date_for_sms(p_date DATE)
RETURNS TEXT AS $$
BEGIN
  RETURN to_char(p_date, 'DD-MM-YYYY');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to format time for SMS (HH:MM AM/PM IST)
CREATE OR REPLACE FUNCTION aayush.format_time_for_sms(p_time TIME)
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

-- Create a function to generate the confirmation SMS message with variables
CREATE OR REPLACE FUNCTION aayush.generate_confirmation_sms(
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
  formatted_date := aayush.format_date_for_sms(p_date);
  formatted_time := aayush.format_time_for_sms(p_time);
  
  -- Return the formatted message
  RETURN 'Dear ' || p_patient_name || 
         ', your appointment at AAYUSH CHILD & SKIN Hospital, Madanapalle is confirmed for ' || 
         formatted_date || ' at ' || formatted_time || 
         '. Thank you for choosing us!';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a public wrapper function to test the SMS template
CREATE OR REPLACE FUNCTION public.test_confirmation_sms_template(
  p_patient_name TEXT DEFAULT 'John Doe',
  p_date DATE DEFAULT CURRENT_DATE,
  p_time TIME DEFAULT '14:30:00'::TIME
)
RETURNS JSONB AS $$
DECLARE
  message TEXT;
  template TEXT := 'Dear {#VAR#}, your appointment at AAYUSH CHILD & SKIN Hospital, Madanapalle is confirmed for {#VAR#} at {#VAR#}. Thank you for choosing us!';
  formatted_date TEXT;
  formatted_time TEXT;
BEGIN
  -- Get the formatted message
  message := aayush.generate_confirmation_sms(p_patient_name, p_date, p_time);
  
  -- Get the formatted date and time separately for verification
  formatted_date := aayush.format_date_for_sms(p_date);
  formatted_time := aayush.format_time_for_sms(p_time);
  
  -- Return the result
  RETURN jsonb_build_object(
    'success', true,
    'sender_id', 'ACSHPL',
    'otp_template_id', '188110',
    'confirmation_template_id', '188111',
    'template', template,
    'message', message,
    'variables', jsonb_build_object(
      'patient_name', p_patient_name,
      'date', formatted_date,
      'time', formatted_time
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the functions
GRANT EXECUTE ON FUNCTION aayush.format_date_for_sms(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION aayush.format_time_for_sms(TIME) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION aayush.generate_confirmation_sms(TEXT, DATE, TIME) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.test_confirmation_sms_template(TEXT, DATE, TIME) TO anon, authenticated, service_role;

-- Create a function to update the send-sms edge function configuration
CREATE OR REPLACE FUNCTION public.get_sms_config()
RETURNS JSONB AS $$
BEGIN
  RETURN jsonb_build_object(
    'sender_id', 'ACSHPL',
    'otp_template_id', '188110',
    'confirmation_template_id', '188111',
    'template_format', 'Dear {#VAR#}, your appointment at AAYUSH CHILD & SKIN Hospital, Madanapalle is confirmed for {#VAR#} at {#VAR#}. Thank you for choosing us!'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.get_sms_config() TO anon, authenticated, service_role;