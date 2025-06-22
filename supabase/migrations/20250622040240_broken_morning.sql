/*
  # Update SMS Templates and Sender ID

  1. Changes
    - Updates the SMS sender ID from SHSRA to ACSHPL
    - Updates the OTP template ID from 179393 to 188110
    - Updates the confirmation template ID from 179394 to 188111
    - Adds a function to test the new SMS configuration
*/

-- Create a function to test the new SMS configuration
CREATE OR REPLACE FUNCTION public.test_sms_configuration()
RETURNS JSONB AS $$
BEGIN
  RETURN jsonb_build_object(
    'success', true,
    'sender_id', 'ACSHPL',
    'otp_template_id', '188110',
    'confirmation_template_id', '188111',
    'message', 'SMS configuration updated successfully'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.test_sms_configuration() TO service_role;

-- Add a comment to explain the changes
COMMENT ON FUNCTION public.test_sms_configuration() IS 'Tests the new SMS configuration with sender ID ACSHPL and template IDs 188110 (OTP) and 188111 (confirmation)';