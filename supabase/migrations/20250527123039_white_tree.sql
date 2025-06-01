/*
  # Fix OTP Confirmations Table

  1. New Tables
    - Recreate `public.otp_confirmations` table with proper sequence handling
  
  2. Security
    - Enable RLS on the table
    - Add policies for public access
*/

-- Drop the existing table if it exists
DROP TABLE IF EXISTS public.otp_confirmations;

-- Create OTP confirmations table in public schema with proper sequence
CREATE TABLE IF NOT EXISTS public.otp_confirmations (
  id SERIAL PRIMARY KEY,
  phone_number TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  appointment_id INTEGER,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.otp_confirmations ENABLE ROW LEVEL SECURITY;

-- Create policies for otp_confirmations table
CREATE POLICY "Allow public insert access to otp_confirmations" 
  ON public.otp_confirmations 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public read access to otp_confirmations" 
  ON public.otp_confirmations 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public update access to otp_confirmations" 
  ON public.otp_confirmations 
  FOR UPDATE 
  USING (true);

-- Grant necessary permissions
GRANT ALL ON public.otp_confirmations TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.otp_confirmations_id_seq TO anon, authenticated;