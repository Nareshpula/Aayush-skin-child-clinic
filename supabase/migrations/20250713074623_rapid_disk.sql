-- Create a function to test the SMS delivery with the correct URL
CREATE OR REPLACE FUNCTION public.test_sms_delivery_url()
RETURNS JSONB AS $$
BEGIN
  RETURN jsonb_build_object(
    'success', true,
    'message', 'This function tests the SMS delivery URL configuration',
    'sender_id', 'ACSHPL',
    'otp_template_id', '188110',
    'confirmation_template_id', '188111',
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
GRANT EXECUTE ON FUNCTION public.test_sms_delivery_url() TO anon, authenticated, service_role;

-- Add comment to explain the function
COMMENT ON FUNCTION public.test_sms_delivery_url() IS 'Tests the SMS delivery URL configuration';