/*
  # Create OTP Generation and Storage Function

  1. New Table
    - Creates `otp_logs` table to store OTP codes and phone numbers
    - Includes columns for id, phone_number, otp_code, created_at in IST timezone

  2. New Functions
    - Creates `generate_otp` function to store OTP codes and phone numbers
    - Creates `validate_otp` function to verify OTP codes
*/

-- Create the otp_logs table if it doesn't exist
CREATE TABLE IF NOT EXISTS aayush.otp_logs (
  id SERIAL PRIMARY KEY,
  phone_number TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT (now() AT TIME ZONE 'Asia/Kolkata'),
  is_verified BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMPTZ DEFAULT ((now() + INTERVAL '10 minutes') AT TIME ZONE 'Asia/Kolkata')
);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_otp_logs_phone_number ON aayush.otp_logs(phone_number);

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
  expiry_time := (now() + INTERVAL '10 minutes') AT TIME ZONE 'Asia/Kolkata';
  
  -- Insert the OTP into the logs
  INSERT INTO aayush.otp_logs (
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

-- Create a function to validate OTP
CREATE OR REPLACE FUNCTION public.validate_otp(
  p_phone_number TEXT,
  p_otp_code TEXT
)
RETURNS JSONB AS $$
DECLARE
  otp_record RECORD;
  current_time TIMESTAMPTZ;
BEGIN
  -- Validate input
  IF p_otp_code IS NULL OR p_phone_number IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'OTP code and phone number are required'
    );
  END IF;
  
  -- Get current time in IST
  current_time := now() AT TIME ZONE 'Asia/Kolkata';
  
  -- Find the most recent OTP for this phone number
  SELECT * INTO otp_record
  FROM aayush.otp_logs
  WHERE phone_number = p_phone_number
    AND otp_code = p_otp_code
    AND is_verified = FALSE
    AND expires_at > current_time
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

-- Grant execute permissions on the functions
GRANT EXECUTE ON FUNCTION public.generate_otp(TEXT, TEXT) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.validate_otp(TEXT, TEXT) TO anon, authenticated, service_role;

-- Add comments to explain the functions
COMMENT ON FUNCTION public.generate_otp(TEXT, TEXT) IS 'Generates and stores an OTP for a phone number';
COMMENT ON FUNCTION public.validate_otp(TEXT, TEXT) IS 'Validates an OTP for a phone number';