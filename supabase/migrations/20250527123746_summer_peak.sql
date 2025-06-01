/*
  # Fix OTP Confirmations Table and Schema References

  1. New Tables
    - `public.otp_confirmations` - Recreated with proper SERIAL sequence
  
  2. Security
    - Enable RLS on `public.otp_confirmations` table
    - Add policies for public access to the table
  
  3. Changes
    - Fix schema references in queries
    - Create views in public schema that reference aayush schema tables
*/

-- Drop the existing table if it exists
DROP TABLE IF EXISTS public.otp_confirmations;

-- Create OTP confirmations table with SERIAL primary key
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

-- Create views in public schema that reference aayush schema tables
CREATE OR REPLACE VIEW public.doctors AS
  SELECT * FROM aayush.doctors;

CREATE OR REPLACE VIEW public.appointment_slots AS
  SELECT * FROM aayush.appointment_slots;

CREATE OR REPLACE VIEW public.appointments AS
  SELECT * FROM aayush.appointments;

-- Grant access to the views
GRANT SELECT ON public.doctors TO anon, authenticated;
GRANT SELECT ON public.appointment_slots TO anon, authenticated;
GRANT SELECT ON public.appointments TO anon, authenticated;

-- Create functions to insert through the views
CREATE OR REPLACE FUNCTION public.insert_appointment(
  slot_id INTEGER,
  patient_name TEXT,
  email TEXT,
  phone_number TEXT,
  age INTEGER,
  gender TEXT,
  reason TEXT
) RETURNS aayush.appointments AS $$
  INSERT INTO aayush.appointments (
    slot_id, patient_name, email, phone_number, age, gender, reason
  ) VALUES (
    slot_id, patient_name, email, phone_number, age, gender, reason
  )
  RETURNING *;
$$ LANGUAGE SQL SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.update_appointment_slot(
  p_id INTEGER,
  p_is_booked BOOLEAN
) RETURNS aayush.appointment_slots AS $$
  UPDATE aayush.appointment_slots
  SET is_booked = p_is_booked, updated_at = now()
  WHERE id = p_id
  RETURNING *;
$$ LANGUAGE SQL SECURITY DEFINER;

-- Grant execute permissions on functions
GRANT EXECUTE ON FUNCTION public.insert_appointment TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.update_appointment_slot TO anon, authenticated;