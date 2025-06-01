/*
  # Add Patient ID Generation Function

  1. Changes
    - Ensure patient_id column exists in appointments table
    - Create or replace the generate_patient_id function
    - Create trigger to automatically generate patient_id for new appointments
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