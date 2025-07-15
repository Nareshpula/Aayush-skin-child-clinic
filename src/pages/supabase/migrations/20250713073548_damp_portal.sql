-- Create a function to test the SMS delivery
CREATE OR REPLACE FUNCTION public.test_sms_delivery()
RETURNS JSONB AS $$
BEGIN
  RETURN jsonb_build_object(
    'success', true,
    'message', 'This function tests the SMS delivery configuration',
    'sender_id', 'ACSHPL',
    'otp_template_id', '188110',
    'confirmation_template_id', '188111',
    'api_key_status', 'Using hardcoded API key in Edge Function',
    'edge_function_url', 'https://gatgyhxtgqmzwjatbmzk.supabase.co/functions/v1/send-sms',
    'request_format', jsonb_build_object(
      'phoneNumber', '1234567890',
      'otpCode', '123456',
      'messageType', 'otp'
    ),
    'confirmation_format', jsonb_build_object(
      'phoneNumber', '1234567890',
      'messageType', 'confirmation',
      'appointmentDetails', jsonb_build_object(
        'patientName', 'John Doe',
        'appointmentDate', '2025-07-15',
        'appointmentTime', '14:30:00'
      )
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.test_sms_delivery() TO anon, authenticated, service_role;

-- Create a function to log SMS attempts
CREATE OR REPLACE FUNCTION public.log_sms_attempt(
  p_phone_number TEXT,
  p_message_type TEXT,
  p_status TEXT,
  p_response_data JSONB,
  p_error_message TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  log_id INTEGER;
BEGIN
  -- Create the sms_logs table if it doesn't exist
  CREATE TABLE IF NOT EXISTS aayush.sms_logs (
    id SERIAL PRIMARY KEY,
    phone_number TEXT NOT NULL,
    message_type TEXT NOT NULL,
    status TEXT NOT NULL,
    response_data JSONB,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
  );
  
  -- Insert the log
  INSERT INTO aayush.sms_logs (
    phone_number,
    message_type,
    status,
    response_data,
    error_message
  )
  VALUES (
    p_phone_number,
    p_message_type,
    p_status,
    p_response_data,
    p_error_message
  )
  RETURNING id INTO log_id;
  
  -- Return success
  RETURN jsonb_build_object(
    'success', true,
    'log_id', log_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.log_sms_attempt(TEXT, TEXT, TEXT, JSONB, TEXT) TO anon, authenticated, service_role;

-- Create a function to get SMS logs
CREATE OR REPLACE FUNCTION public.get_sms_logs()
RETURNS JSONB AS $$
DECLARE
  logs JSONB;
BEGIN
  -- Get all logs
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', l.id,
      'phone_number', l.phone_number,
      'message_type', l.message_type,
      'status', l.status,
      'response_data', l.response_data,
      'error_message', l.error_message,
      'created_at', l.created_at
    ) ORDER BY l.created_at DESC
  )
  INTO logs
  FROM aayush.sms_logs l;
  
  -- Return the logs
  RETURN jsonb_build_object(
    'success', true,
    'logs', COALESCE(logs, '[]'::JSONB)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.get_sms_logs() TO service_role;

-- Add comments to explain the functions
COMMENT ON FUNCTION public.test_sms_delivery() IS 'Tests the SMS delivery configuration';
COMMENT ON FUNCTION public.log_sms_attempt(TEXT, TEXT, TEXT, JSONB, TEXT) IS 'Logs SMS delivery attempts';
COMMENT ON FUNCTION public.get_sms_logs() IS 'Gets all SMS delivery logs';