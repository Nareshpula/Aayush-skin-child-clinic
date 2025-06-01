/*
  # Create SMS Edge Function Deployment Migration

  1. New Tables
    - Ensures aayush.sms_logs table exists for logging SMS attempts
  
  2. Functions
    - Creates functions for logging SMS attempts in aayush schema
    - Creates public wrapper functions for easy access
  
  3. Security
    - Sets up proper RLS policies for the tables
    - Grants necessary permissions for edge function execution
*/

-- Create the SMS logs table in aayush schema
CREATE TABLE IF NOT EXISTS aayush.sms_logs (
  id SERIAL PRIMARY KEY,
  phone_number TEXT NOT NULL,
  message_type TEXT NOT NULL,
  status TEXT NOT NULL,
  response_data JSONB,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_aayush_sms_logs_phone_number ON aayush.sms_logs(phone_number);
CREATE INDEX IF NOT EXISTS idx_aayush_sms_logs_status ON aayush.sms_logs(status);
CREATE INDEX IF NOT EXISTS idx_aayush_sms_logs_created_at ON aayush.sms_logs(created_at);

-- Enable RLS
ALTER TABLE aayush.sms_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "Allow public insert access to sms_logs" ON aayush.sms_logs;
CREATE POLICY "Allow public insert access to sms_logs" 
  ON aayush.sms_logs 
  FOR INSERT 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read access to sms_logs" ON aayush.sms_logs;
CREATE POLICY "Allow public read access to sms_logs" 
  ON aayush.sms_logs 
  FOR SELECT 
  USING (true);

-- Grants
GRANT ALL ON aayush.sms_logs TO anon, authenticated, service_role;
GRANT USAGE, SELECT ON SEQUENCE aayush.sms_logs_id_seq TO anon, authenticated, service_role;

-- Function to log SMS in aayush schema
CREATE OR REPLACE FUNCTION aayush.log_sms_attempt(
  p_phone_number TEXT,
  p_message_type TEXT,
  p_status TEXT,
  p_response_data JSONB,
  p_error_message TEXT
) RETURNS aayush.sms_logs AS $$
DECLARE
  result aayush.sms_logs;
BEGIN
  INSERT INTO aayush.sms_logs (
    phone_number,
    message_type,
    status,
    response_data,
    error_message
  ) VALUES (
    p_phone_number,
    p_message_type,
    p_status,
    p_response_data,
    p_error_message
  )
  RETURNING * INTO result;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION aayush.log_sms_attempt(TEXT, TEXT, TEXT, JSONB, TEXT) TO anon, authenticated, service_role;

-- Public wrapper function
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
  SELECT * INTO result FROM aayush.log_sms_attempt(
    p_phone_number,
    p_message_type,
    p_status,
    p_response_data,
    p_error_message
  );

  RETURN jsonb_build_object(
    'id', result.id,
    'phone_number', result.phone_number,
    'message_type', result.message_type,
    'status', result.status,
    'created_at', result.created_at
  );
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object(
    'error', SQLERRM,
    'detail', SQLSTATE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.log_sms_attempt(TEXT, TEXT, TEXT, JSONB, TEXT) TO anon, authenticated, service_role;

-- Grant additional permissions needed for the Edge Function
GRANT USAGE ON SCHEMA storage TO anon, authenticated, service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA storage TO anon, authenticated, service_role;
GRANT USAGE ON SCHEMA auth TO anon, authenticated, service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA auth TO anon, authenticated, service_role;