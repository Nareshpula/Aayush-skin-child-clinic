-- Drop the existing validate_otp function
DROP FUNCTION IF EXISTS public.validate_otp(text, text);

-- Create a function to validate OTP with fixed variable name
CREATE OR REPLACE FUNCTION public.validate_otp(
  p_phone_number TEXT,
  p_otp_code TEXT
)
RETURNS JSONB AS $$
DECLARE
  otp_record RECORD;
  now_ist TIMESTAMPTZ;
BEGIN
  -- Validate input
  IF p_otp_code IS NULL OR p_phone_number IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'OTP code and phone number are required'
    );
  END IF;
  
  -- Get current time
  now_ist := now();
  
  -- Find the most recent OTP for this phone number
  SELECT * INTO otp_record
  FROM aayush.otp_logs
  WHERE phone_number = p_phone_number
    AND otp_code = p_otp_code
    AND is_verified = FALSE
    AND expires_at > now_ist
  ORDER BY created_at DESC
  LIMIT 1;
  
  -- If no OTP found or expired, return error
  IF otp_record IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Invalid or expired OTP'
    );
  END IF;
  
  -- Mark the OTP as verified
  UPDATE aayush.otp_logs
  SET is_verified = TRUE
  WHERE id = otp_record.id;
  
  -- Return success
  RETURN jsonb_build_object(
    'success', true,
    'phone_number', p_phone_number
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to verify OTP without sending SMS
CREATE OR REPLACE FUNCTION public.verify_otp(
  p_phone_number TEXT,
  p_otp_code TEXT
)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  -- Call the validate_otp function
  result := public.validate_otp(p_phone_number, p_otp_code);
  
  -- Return the result
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the functions
GRANT EXECUTE ON FUNCTION public.validate_otp(TEXT, TEXT) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.verify_otp(TEXT, TEXT) TO anon, authenticated, service_role;

-- Add comments to explain the functions
COMMENT ON FUNCTION public.validate_otp(TEXT, TEXT) IS 'Validates an OTP for a phone number with proper variable naming to avoid reserved keyword conflicts';
COMMENT ON FUNCTION public.verify_otp(TEXT, TEXT) IS 'Verifies an OTP for a phone number (wrapper for validate_otp)';