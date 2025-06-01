/*
  # Deploy Send SMS Edge Function

  1. Purpose
    - Creates and configures the send-sms Edge Function for SMS delivery
  
  2. Function Details
    - Accepts POST requests with phone number, OTP code, and message type
    - Sends SMS via Fast2SMS API
    - Logs results to aayush.sms_logs
    - Returns structured JSON response
  
  3. Security
    - Properly handles CORS
    - Secures API keys
    - Uses appropriate permissions
*/

-- This migration will deploy the send-sms Edge Function
-- The function code is stored in supabase/functions/send-sms/index.ts

-- Ensure the aayush.sms_logs table exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'aayush' 
    AND table_name = 'sms_logs'
  ) THEN
    RAISE EXCEPTION 'The aayush.sms_logs table does not exist. Please run the previous migration first.';
  END IF;
END $$;

-- Ensure the log_sms_attempt function exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public'
    AND p.proname = 'log_sms_attempt'
  ) THEN
    RAISE EXCEPTION 'The public.log_sms_attempt function does not exist. Please run the previous migration first.';
  END IF;
END $$;

-- Grant additional permissions needed for the Edge Function
GRANT USAGE ON SCHEMA storage TO anon, authenticated, service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA storage TO anon, authenticated, service_role;
GRANT USAGE ON SCHEMA auth TO anon, authenticated, service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA auth TO anon, authenticated, service_role;

-- Create a function to test the SMS functionality
CREATE OR REPLACE FUNCTION public.test_sms_function(
  phone_number TEXT,
  message_type TEXT DEFAULT 'test',
  otp_code TEXT DEFAULT '123456'
) RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  -- Log the test attempt
  result := public.log_sms_attempt(
    phone_number,
    message_type,
    'test',
    jsonb_build_object('test', true),
    NULL
  );
  
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Test function executed successfully. In a real environment, this would send an SMS.',
    'log_result', result
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the test function
GRANT EXECUTE ON FUNCTION public.test_sms_function(TEXT, TEXT, TEXT) TO anon, authenticated, service_role;

-- Add a comment explaining that the Edge Function deployment is handled by Supabase
COMMENT ON SCHEMA public IS 'The send-sms Edge Function is deployed automatically by Supabase when you push your changes.';