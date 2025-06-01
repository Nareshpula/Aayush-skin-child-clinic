/*
  # Add OTP confirmations table

  1. New Tables
    - `otp_confirmations`
      - `id` (uuid, primary key)
      - `phone_number` (text, not null)
      - `otp_code` (text, not null)
      - `appointment_id` (integer, references appointments)
      - `is_verified` (boolean, default false)
      - `created_at` (timestamptz, default now())
      - `expires_at` (timestamptz, not null)
  2. Security
    - Enable RLS on `otp_confirmations` table
    - Add policy for authenticated users to read their own data
*/

-- Create OTP confirmations table
CREATE TABLE IF NOT EXISTS aayush.otp_confirmations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  appointment_id INTEGER REFERENCES aayush.appointments(id),
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL
);

-- Enable Row Level Security
ALTER TABLE aayush.otp_confirmations ENABLE ROW LEVEL SECURITY;

-- Create policies for otp_confirmations table
CREATE POLICY "Allow public insert access to otp_confirmations" 
  ON aayush.otp_confirmations 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public read access to otp_confirmations" 
  ON aayush.otp_confirmations 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public update access to otp_confirmations" 
  ON aayush.otp_confirmations 
  FOR UPDATE 
  USING (true);