/*
  # Fix Patient ID Generation Logic

  1. Changes
    - Drops and recreates the generate_patient_id function to ensure sequential IDs
    - Implements a more robust ID generation mechanism using a dedicated sequence
    - Ensures IDs are always incremented based on appointment creation order
    - Maintains the ACH-YYYY-XXXX format with proper zero-padding
*/

-- First, drop the existing function to avoid the return type error
DROP FUNCTION IF EXISTS aayush.generate_patient_id();

-- Create a sequence if it doesn't exist to track patient IDs
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

-- Create the new generate_patient_id function
CREATE OR REPLACE FUNCTION aayush.generate_patient_id()
RETURNS TEXT AS $$
DECLARE
  year_part TEXT;
  sequence_number INTEGER;
  formatted_id TEXT;
BEGIN
  -- Get the current year
  year_part := TO_CHAR(CURRENT_DATE, 'YYYY');
  
  -- Get the next value from the sequence
  sequence_number := NEXTVAL('aayush.patient_id_seq');
  
  -- Format the ID with proper zero-padding
  formatted_id := 'ACH-' || year_part || '-' || LPAD(sequence_number::TEXT, 4, '0');
  
  RETURN formatted_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION aayush.generate_patient_id() TO anon, authenticated, service_role;

-- Add a comment to explain the function
COMMENT ON FUNCTION aayush.generate_patient_id() IS 'Generates a sequential patient ID in the format ACH-YYYY-XXXX';

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

-- Grant execute permissions on the test function
GRANT EXECUTE ON FUNCTION public.test_patient_id_generation() TO service_role;