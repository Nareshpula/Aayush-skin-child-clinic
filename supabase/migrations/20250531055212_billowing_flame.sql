/*
  # Create Log SMS Function in Public Schema

  1. New Functions
    - `public.log_sms_attempt` - Public wrapper for the aayush.log_sms_attempt function
  
  2. Security
    - Grant necessary permissions
*/

-- Create a public wrapper function for logging SMS attempts
CREATE OR REPLACE FUNCTION public.log_sms_attempt(
  p_phone_number TEXT,
  p_message_type TEXT,
  p_status TEXT,
  p_response_data JSONB,
  p_error_message TEXT
) RETURNS JSONB AS $$
DECLARE
  result aayush.sms_logs;
BEGIN
  -- Call the aayush schema function
  SELECT * INTO result FROM aayush.log_sms_attempt(
    p_phone_number,
    p_message_type,
    p_status,
    p_response_data,
    p_error_message
  );
  
  -- Return the result as JSON
  RETURN jsonb_build_object(
    'id', result.id,
    'phone_number', result.phone_number,
    'message_type', result.message_type,
    'status', result.status,
    'created_at', result.created_at
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.log_sms_attempt(TEXT, TEXT, TEXT, JSONB, TEXT) TO anon, authenticated, service_role;