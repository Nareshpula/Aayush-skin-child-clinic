/*
  # Fix SMS Logs Table Sequence

  1. Changes
    - Drop and recreate the sms_logs table with proper sequence handling
    - Ensure all permissions are correctly granted
    - Add additional indexes for better performance
*/

-- Drop the existing table if it exists
DROP TABLE IF EXISTS public.sms_logs;

-- Create the SMS logs table with proper sequence
CREATE TABLE public.sms_logs (
  id SERIAL PRIMARY KEY,
  phone_number TEXT NOT NULL,
  message_type TEXT NOT NULL,
  status TEXT NOT NULL,
  response_data JSONB,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create index for better query performance
CREATE INDEX idx_sms_logs_phone_number ON public.sms_logs(phone_number);
CREATE INDEX idx_sms_logs_status ON public.sms_logs(status);
CREATE INDEX idx_sms_logs_created_at ON public.sms_logs(created_at);

-- Enable RLS on the SMS logs table
ALTER TABLE public.sms_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for SMS logs table
CREATE POLICY "Allow public insert access to sms_logs" 
  ON public.sms_logs 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public read access to sms_logs" 
  ON public.sms_logs 
  FOR SELECT 
  USING (true);

-- Grant permissions on the SMS logs table and its sequence
GRANT ALL ON public.sms_logs TO anon, authenticated, service_role;
GRANT USAGE, SELECT ON SEQUENCE public.sms_logs_id_seq TO anon, authenticated, service_role;