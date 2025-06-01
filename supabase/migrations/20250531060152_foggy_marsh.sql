-- First, drop any existing objects that might conflict
DROP VIEW IF EXISTS public.sms_logs;
DROP TABLE IF EXISTS public.sms_logs;

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

-- Create a function to log SMS attempts in aayush schema
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

-- Create a public wrapper function for logging SMS attempts
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
  -- Call the aayush schema function
  SELECT * INTO result FROM aayush.log_sms_attempt(
    p_phone_number,
    p_message_type,
    p_status,
    p_response_data,
    p_error_message
  );
  
  -- Return the result as JSON
  RETURN jsonb_build_object(
    'id', result.id,
    'phone_number', result.phone_number,
    'message_type', result.message_type,
    'status', result.status,
    'created_at', result.created_at
  );
EXCEPTION WHEN OTHERS THEN
  -- Return error information if the function fails
  RETURN jsonb_build_object(
    'error', SQLERRM,
    'detail', SQLSTATE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.log_sms_attempt(TEXT, TEXT, TEXT, JSONB, TEXT) TO anon, authenticated, service_role;