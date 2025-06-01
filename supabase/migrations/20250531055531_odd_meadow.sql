/*
  # Fix SMS Logs Table and View

  1. Changes
    - Drop the existing view if it exists
    - Create the aayush.sms_logs table if it doesn't exist
    - Create proper indexes for performance
    - Set up RLS policies
    - Create a function to log SMS attempts
    - Create a public view for easier access
*/

-- First, drop the view if it exists to avoid conflicts
DROP VIEW IF EXISTS public.sms_logs;

-- Create the SMS logs table in aayush schema if it doesn't exist
CREATE TABLE IF NOT EXISTS aayush.sms_logs (
  id SERIAL PRIMARY KEY,
  phone_number TEXT NOT NULL,
  message_type TEXT NOT NULL,
  status TEXT NOT NULL,
  response_data JSONB,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_aayush_sms_logs_phone_number ON aayush.sms_logs(phone_number);
CREATE INDEX IF NOT EXISTS idx_aayush_sms_logs_status ON aayush.sms_logs(status);
CREATE INDEX IF NOT EXISTS idx_aayush_sms_logs_created_at ON aayush.sms_logs(created_at);

-- Enable RLS on the SMS logs table
ALTER TABLE aayush.sms_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for SMS logs table
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

-- Grant permissions on the SMS logs table and its sequence
GRANT ALL ON aayush.sms_logs TO anon, authenticated, service_role;
GRANT USAGE, SELECT ON SEQUENCE aayush.sms_logs_id_seq TO anon, authenticated, service_role;

-- Create a function to log SMS attempts
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

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION aayush.log_sms_attempt(TEXT, TEXT, TEXT, JSONB, TEXT) TO anon, authenticated, service_role;

-- Now create a view in public schema for the SMS logs
CREATE VIEW public.sms_logs AS
  SELECT * FROM aayush.sms_logs;

-- Grant access to the view
GRANT SELECT ON public.sms_logs TO anon, authenticated, service_role;