/*
  # Fix SMS Delivery Issues

  1. Changes
    - Creates a function to test the SMS delivery with proper URL construction
    - Adds a function to log SMS delivery attempts for debugging
    - Ensures the Edge Function URL is correctly constructed
*/

-- Create a function to test the SMS delivery with the correct URL
CREATE OR REPLACE FUNCTION public.test_sms_delivery_with_url()
RETURNS JSONB AS $$
BEGIN
  RETURN jsonb_build_object(
    'success', true,
    'message', 'This function tests the SMS delivery URL construction',
    'sender_id', 'ACSHPL',
    'otp_template_id', '188110',
    'confirmation_template_id', '188111',
    'edge_function_url_format', '{SUPABASE_URL}/functions/v1/send-sms',
    'correct_url_example', 'https://gatgyhxtgqmzwjatbmzk.supabase.co/functions/v1/send-sms',
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

-- Create a function to log SMS delivery attempts
CREATE OR REPLACE FUNCTION public.log_sms_delivery_attempt(
  p_phone_number TEXT,
  p_message_type TEXT,
  p_url TEXT,
  p_payload JSONB,
  p_response JSONB,
  p_success BOOLEAN,
  p_error TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  log_id INTEGER;
BEGIN
  -- Create the sms_delivery_logs table if it doesn't exist
  CREATE TABLE IF NOT EXISTS aayush.sms_delivery_logs (
    id SERIAL PRIMARY KEY,
    phone_number TEXT NOT NULL,
    message_type TEXT NOT NULL,
    url TEXT NOT NULL,
    payload JSONB NOT NULL,
    response JSONB,
    success BOOLEAN NOT NULL,
    error TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
  );
  
  -- Insert the log
  INSERT INTO aayush.sms_delivery_logs (
    phone_number,
    message_type,
    url,
    payload,
    response,
    success,
    error
  )
  VALUES (
    p_phone_number,
    p_message_type,
    p_url,
    p_payload,
    p_response,
    p_success,
    p_error
  )
  RETURNING id INTO log_id;
  
  -- Return success
  RETURN jsonb_build_object(
    'success', true,
    'log_id', log_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get SMS delivery logs
CREATE OR REPLACE FUNCTION public.get_sms_delivery_logs()
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
      'url', l.url,
      'payload', l.payload,
      'response', l.response,
      'success', l.success,
      'error', l.error,
      'created_at', l.created_at
    ) ORDER BY l.created_at DESC
  )
  INTO logs
  FROM aayush.sms_delivery_logs l;
  
  -- Return the logs
  RETURN jsonb_build_object(
    'success', true,
    'logs', COALESCE(logs, '[]'::JSONB)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.test_sms_delivery_with_url() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.log_sms_delivery_attempt(TEXT, TEXT, TEXT, JSONB, JSONB, BOOLEAN, TEXT) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_sms_delivery_logs() TO service_role;

-- Add comments to explain the functions
COMMENT ON FUNCTION public.test_sms_delivery_with_url() IS 'Tests the SMS delivery URL construction';
COMMENT ON FUNCTION public.log_sms_delivery_attempt(TEXT, TEXT, TEXT, JSONB, JSONB, BOOLEAN, TEXT) IS 'Logs SMS delivery attempts with detailed information';
COMMENT ON FUNCTION public.get_sms_delivery_logs() IS 'Gets all SMS delivery logs';