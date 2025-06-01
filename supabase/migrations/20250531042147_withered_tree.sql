/*
  # Fix Patient ID Generation

  1. Changes
    - Ensure patient_id column exists in appointments table
    - Create or replace function to generate unique patient IDs
    - Add trigger to automatically generate patient IDs for new appointments
    - Update existing appointments without patient_id
*/

-- Add patient_id column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'aayush' 
    AND table_name = 'appointments' 
    AND column_name = 'patient_id'
  ) THEN
    ALTER TABLE aayush.appointments ADD COLUMN patient_id TEXT;
  END IF;
END $$;

-- Create or replace function to generate unique patient ID
CREATE OR REPLACE FUNCTION aayush.generate_patient_id() 
RETURNS TRIGGER AS $$
DECLARE
  year_part TEXT;
  sequence_num INT;
  patient_id_prefix TEXT := 'AAYUSH';
BEGIN
  -- Get current year (last 2 digits)
  year_part := to_char(CURRENT_DATE, 'YY');
  
  -- Get the next sequence number for this year
  SELECT COALESCE(MAX(SUBSTRING(patient_id, 9)::INT), 0) + 1 INTO sequence_num
  FROM aayush.appointments
  WHERE patient_id LIKE patient_id_prefix || '-' || year_part || '-%';
  
  -- Format: AAYUSH-YY-NNNNN (e.g., AAYUSH-24-00001)
  NEW.patient_id := patient_id_prefix || '-' || year_part || '-' || LPAD(sequence_num::TEXT, 5, '0');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS generate_patient_id_trigger ON aayush.appointments;

-- Create trigger to automatically generate patient_id
CREATE TRIGGER generate_patient_id_trigger
BEFORE INSERT ON aayush.appointments
FOR EACH ROW
WHEN (NEW.patient_id IS NULL)
EXECUTE FUNCTION aayush.generate_patient_id();

-- Update existing appointments without patient_id
UPDATE aayush.appointments
SET patient_id = NULL
WHERE patient_id IS NULL;

-- Update the get_appointments_with_details function to include patient_id
CREATE OR REPLACE FUNCTION public.get_appointments_with_details()
RETURNS TABLE (
  id integer,
  slot_id integer,
  patient_name text,
  email text,
  phone_number text,
  age integer,
  gender text,
  reason text,
  patient_id text,
  created_at timestamptz,
  updated_at timestamptz,
  doctor_id integer,
  doctor_name text,
  doctor_specialization text,
  slot_date date,
  slot_time time
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.slot_id,
    a.patient_name,
    a.email,
    a.phone_number,
    a.age,
    a.gender,
    a.reason,
    a.patient_id,
    a.created_at,
    a.updated_at,
    d.id as doctor_id,
    d.name as doctor_name,
    d.specialization as doctor_specialization,
    s.date as slot_date,
    s.time as slot_time
  FROM aayush.appointments a
  JOIN aayush.appointment_slots s ON a.slot_id = s.id
  JOIN aayush.doctors d ON s.doctor_id = d.id
  ORDER BY s.date DESC, s.time DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.get_appointments_with_details() TO anon, authenticated;