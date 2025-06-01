/*
  # Create Public Log SMS Function

  1. New Functions
    - Creates a public wrapper function for the aayush.log_sms_attempt function
    - Ensures the function is accessible from Edge Functions
  
  2. Security
    - Sets the function as SECURITY DEFINER to run with elevated privileges
    - Grants execute permissions to all roles
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
EXCEPTION WHEN OTHERS THEN
  -- Return error information if the function fails
  RETURN jsonb_build_object(
    'error', SQLERRM,
    'detail', SQLSTATE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.log_sms_attempt(TEXT, TEXT, TEXT, JSONB, TEXT) TO anon, authenticated, service_role;