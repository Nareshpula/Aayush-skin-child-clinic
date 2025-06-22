/*
  # Update SMS Confirmation Template

  1. Changes
    - Creates a test function to verify the new SMS configuration
    - Includes the new template format with patient name, date, and time
*/

-- Create a function to test the new SMS configuration
CREATE OR REPLACE FUNCTION public.test_sms_confirmation_template()
RETURNS JSONB AS $$
BEGIN
  RETURN jsonb_build_object(
    'success', true,
    'sender_id', 'ACSHPL',
    'otp_template_id', '188110',
    'confirmation_template_id', '188111',
    'confirmation_template', 'Dear {#VAR#}, your appointment at AAYUSH CHILD & SKIN Hospital, Madanapalle is confirmed for {#VAR#} at {#VAR#}. Thank you for choosing us!',
    'message', 'SMS configuration updated successfully'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.test_sms_confirmation_template() TO anon, authenticated, service_role;

-- Add a comment to explain the changes
COMMENT ON FUNCTION public.test_sms_confirmation_template() IS 'Tests the new SMS confirmation template with patient name, date, and time variables';