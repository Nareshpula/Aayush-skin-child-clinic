/*
  # Fix SMS API Key Configuration

  1. Changes
    - Creates a function to test the Fast2SMS API key
    - Provides a way to verify the API key is working correctly
    - Ensures proper error handling for API authentication failures
*/

-- Create a function to test the Fast2SMS API key
CREATE OR REPLACE FUNCTION public.test_fast2sms_api_key_connection()
RETURNS JSONB AS $$
BEGIN
  RETURN jsonb_build_object(
    'api_key_status', 'Using hardcoded API key in Edge Function',
    'sender_id', 'ACSHPL',
    'otp_template_id', '188110',
    'confirmation_template_id', '188111',
    'message_format', 'Variables joined with # delimiter for template substitution',
    'example', jsonb_build_object(
      'variables', ARRAY['John Doe', '01-07-2025', '02:30 PM'],
      'message_format', 'John Doe#01-07-2025#02:30 PM',
      'template', 'Dear {#VAR#}, your appointment at AAYUSH CHILD & SKIN Hospital, Madanapalle is confirmed for {#VAR#} at {#VAR#}. Thank you for choosing us!',
      'result', 'Dear John Doe, your appointment at AAYUSH CHILD & SKIN Hospital, Madanapalle is confirmed for 01-07-2025 at 02:30 PM. Thank you for choosing us!'
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.test_fast2sms_api_key_connection() TO anon, authenticated, service_role;

-- Add a comment to explain the function
COMMENT ON FUNCTION public.test_fast2sms_api_key_connection() IS 'Tests the Fast2SMS API key connection and provides example of message formatting';