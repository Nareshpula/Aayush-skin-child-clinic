/*
  # Fix OTP Verification System

  1. New Tables
    - Creates otp_verifications table to store OTPs
    - Adds indexes for faster lookups

  2. New Functions
    - Adds generate_otp function to store OTPs
    - Adds verify_otp function to verify OTPs
    - Adds cleanup_expired_otps function to remove old OTPs
*/

-- Create the otp_verifications table if it doesn't exist
CREATE TABLE IF NOT EXISTS aayush.otp_verifications (
  id SERIAL PRIMARY KEY,
  phone_number TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  is_verified BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMPTZ DEFAULT (now() + INTERVAL '10 minutes')
);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_otp_verifications_phone_number ON aayush.otp_verifications(phone_number);
CREATE INDEX IF NOT EXISTS idx_otp_verifications_expires_at ON aayush.otp_verifications(expires_at);

-- Create a function to generate and store OTP
CREATE OR REPLACE FUNCTION public.generate_otp(
  p_otp_code TEXT,
  p_phone_number TEXT
)
RETURNS JSONB AS $$
DECLARE
  otp_id INTEGER;
  expiry_time TIMESTAMPTZ;
BEGIN
  -- Validate input
  IF p_otp_code IS NULL OR p_phone_number IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'OTP code and phone number are required'
    );
  END IF;
  
  -- Validate phone number format (10 digits)
  IF NOT p_phone_number ~ '^[0-9]{10}$' THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Invalid phone number format. Must be 10 digits.'
    );
  END IF;
  
  -- Set expiry time (10 minutes from now)
  expiry_time := now() + INTERVAL '10 minutes';
  
  -- Insert the OTP into the verifications table
  INSERT INTO aayush.otp_verifications (
    phone_number,
    otp_code,
    expires_at
  )
  VALUES (
    p_phone_number,
    p_otp_code,
    expiry_time
  )
  RETURNING id INTO otp_id;
  
  -- Return success
  RETURN jsonb_build_object(
    'success', true,
    'otp_id', otp_id,
    'phone_number', p_phone_number,
    'expires_at', expiry_time
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to verify OTP
CREATE OR REPLACE FUNCTION public.verify_otp(
  p_phone_number TEXT,
  p_otp_code TEXT
)
RETURNS JSONB AS $$
DECLARE
  otp_record RECORD;
  now_time TIMESTAMPTZ;
BEGIN
  -- Validate input
  IF p_otp_code IS NULL OR p_phone_number IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'OTP code and phone number are required'
    );
  END IF;
  
  -- Get current time
  now_time := now();
  
  -- Find the most recent OTP for this phone number
  SELECT * INTO otp_record
  FROM aayush.otp_verifications
  WHERE phone_number = p_phone_number
    AND otp_code = p_otp_code
    AND is_verified = FALSE
    AND expires_at > now_time
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
  UPDATE aayush.otp_verifications
  SET is_verified = TRUE
  WHERE id = otp_record.id;
  
  -- Return success
  RETURN jsonb_build_object(
    'success', true,
    'phone_number', p_phone_number
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to clean up expired OTPs
CREATE OR REPLACE FUNCTION public.cleanup_expired_otps()
RETURNS JSONB AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  -- Delete expired OTPs
  DELETE FROM aayush.otp_verifications
  WHERE expires_at < now()
  RETURNING COUNT(*) INTO deleted_count;
  
  -- Return success
  RETURN jsonb_build_object(
    'success', true,
    'deleted_count', deleted_count
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the functions
GRANT EXECUTE ON FUNCTION public.generate_otp(TEXT, TEXT) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.verify_otp(TEXT, TEXT) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.cleanup_expired_otps() TO service_role;

-- Add comments to explain the functions
COMMENT ON FUNCTION public.generate_otp(TEXT, TEXT) IS 'Generates and stores an OTP for a phone number';
COMMENT ON FUNCTION public.verify_otp(TEXT, TEXT) IS 'Verifies an OTP for a phone number';
COMMENT ON FUNCTION public.cleanup_expired_otps() IS 'Cleans up expired OTPs';