/*
  # Fix Patient ID Generation

  1. Changes
    - Drops the existing function with CASCADE to handle dependencies
    - Creates a dedicated sequence for patient IDs
    - Sets the sequence value based on the highest existing ID
    - Creates a new generation function that uses the sequence
    - Adds a trigger to automatically set the patient ID on insert
    - Fixes existing IDs to ensure they're sequential based on creation order
    - Adds a test function to verify the ID generation works correctly
*/

-- First, drop the existing function and trigger with CASCADE to handle dependencies
DROP FUNCTION IF EXISTS aayush.generate_patient_id() CASCADE;

-- Create a sequence to track patient IDs
CREATE SEQUENCE IF NOT EXISTS aayush.patient_id_seq;

-- Set the sequence value based on the current maximum ID
DO $$
DECLARE
  max_id INTEGER;
BEGIN
  -- Find the current maximum numeric part of patient IDs
  SELECT COALESCE(MAX(
    CASE 
      WHEN patient_id ~ '^ACH-\d{4}-\d{4}$' 
      THEN CAST(SUBSTRING(patient_id FROM 10 FOR 4) AS INTEGER)
      ELSE 0
    END
  ), 0) INTO max_id
  FROM aayush.appointments;
  
  -- Set the sequence to start from the next number after the current maximum
  EXECUTE 'ALTER SEQUENCE aayush.patient_id_seq RESTART WITH ' || (max_id + 1)::TEXT;
  
  RAISE NOTICE 'Patient ID sequence set to start from %', max_id + 1;
END;
$$;

-- Create the new generate_patient_id function using the sequence
CREATE OR REPLACE FUNCTION aayush.generate_patient_id()
RETURNS TEXT AS $$
DECLARE
  year_part TEXT;
  sequence_number INTEGER;
  formatted_id TEXT;
BEGIN
  -- Get the current year
  year_part := TO_CHAR(CURRENT_DATE, 'YYYY');
  
  -- Get the next value from the sequence (atomic operation)
  sequence_number := NEXTVAL('aayush.patient_id_seq');
  
  -- Format the ID with proper zero-padding
  formatted_id := 'ACH-' || year_part || '-' || LPAD(sequence_number::TEXT, 4, '0');
  
  RETURN formatted_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger function to set the patient_id on insert
CREATE OR REPLACE FUNCTION aayush.set_patient_id()
RETURNS TRIGGER AS $$
BEGIN
  -- Only set patient_id if it's NULL or empty
  IF NEW.patient_id IS NULL OR NEW.patient_id = '' THEN
    NEW.patient_id := aayush.generate_patient_id();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER generate_patient_id_trigger
BEFORE INSERT ON aayush.appointments
FOR EACH ROW
EXECUTE FUNCTION aayush.set_patient_id();

-- Fix existing patient IDs to ensure they're sequential based on creation order
DO $$
DECLARE
  current_year TEXT;
  appointment_record RECORD;
  sequence_number INTEGER := 0;
  new_patient_id TEXT;
  updated_count INTEGER := 0;
BEGIN
  -- Get current year
  current_year := to_char(CURRENT_DATE, 'YYYY');
  
  -- Process all appointments for this year in order of creation
  FOR appointment_record IN 
    SELECT id, patient_id, created_at
    FROM aayush.appointments
    WHERE patient_id LIKE 'ACH-' || current_year || '-%'
    ORDER BY created_at ASC
  LOOP
    -- Increment sequence number
    sequence_number := sequence_number + 1;
    
    -- Generate new patient ID
    new_patient_id := 'ACH-' || current_year || '-' || LPAD(sequence_number::TEXT, 4, '0');
    
    -- Update the appointment if the patient ID is different
    IF appointment_record.patient_id != new_patient_id THEN
      UPDATE aayush.appointments
      SET patient_id = new_patient_id
      WHERE id = appointment_record.id;
      
      updated_count := updated_count + 1;
    END IF;
  END LOOP;
  
  -- Update the sequence to start after the highest used number
  IF sequence_number > 0 THEN
    EXECUTE 'ALTER SEQUENCE aayush.patient_id_seq RESTART WITH ' || (sequence_number + 1)::TEXT;
  END IF;
  
  RAISE NOTICE 'Updated % patient IDs and set sequence to %', updated_count, sequence_number + 1;
END;
$$;

-- Create a function to test the patient ID generation
CREATE OR REPLACE FUNCTION public.test_patient_id_generation()
RETURNS TABLE (
  generated_id TEXT,
  sequence_value BIGINT
) AS $$
DECLARE
  test_id TEXT;
  current_val BIGINT;
BEGIN
  -- Get the current sequence value (without incrementing)
  SELECT last_value INTO current_val FROM aayush.patient_id_seq;
  
  -- Generate a test ID (this will increment the sequence)
  test_id := aayush.generate_patient_id();
  
  -- Return the generated ID and the new sequence value
  generated_id := test_id;
  sequence_value := current_val + 1;
  RETURN NEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION aayush.generate_patient_id() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION aayush.set_patient_id() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.test_patient_id_generation() TO service_role;

-- Add comments to explain the functions
COMMENT ON FUNCTION aayush.generate_patient_id() IS 'Generates a sequential patient ID in the format ACH-YYYY-XXXX using a dedicated sequence';
COMMENT ON FUNCTION aayush.set_patient_id() IS 'Trigger function to automatically set patient_id on insert';
COMMENT ON FUNCTION public.test_patient_id_generation() IS 'Tests the patient ID generation to ensure it works correctly';