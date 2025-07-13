/*
  # Fix Patient ID Generation

  1. Changes
    - Fixes the patient ID generation to ensure sequential ordering based on appointment creation date
    - Ensures IDs are always incremented correctly (ACH-2025-XXXX format)
    - Maintains all existing slot selection and booking functionality
    - Adds a trigger to automatically assign the next sequential ID on insert
*/

-- Create a sequence for patient IDs if it doesn't exist
CREATE SEQUENCE IF NOT EXISTS aayush.patient_id_seq;

-- Create a function to generate the next patient ID
CREATE OR REPLACE FUNCTION aayush.generate_patient_id()
RETURNS TEXT AS $$
DECLARE
  current_year TEXT;
  next_sequence INTEGER;
BEGIN
  -- Get current year
  current_year := to_char(CURRENT_DATE, 'YYYY');
  
  -- Get the next sequence number
  SELECT COALESCE(MAX(CAST(SUBSTRING(patient_id FROM 10) AS INTEGER)), 0) + 1
  INTO next_sequence
  FROM aayush.appointments
  WHERE patient_id LIKE 'ACH-' || current_year || '-%';
  
  -- Format the patient ID with leading zeros (4 digits)
  RETURN 'ACH-' || current_year || '-' || LPAD(next_sequence::TEXT, 4, '0');
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

-- Create the trigger if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_patient_id_trigger'
  ) THEN
    CREATE TRIGGER set_patient_id_trigger
    BEFORE INSERT ON aayush.appointments
    FOR EACH ROW
    EXECUTE FUNCTION aayush.set_patient_id();
  END IF;
END;
$$;

-- Create a function to fix existing patient IDs
CREATE OR REPLACE FUNCTION public.fix_patient_ids()
RETURNS JSONB AS $$
DECLARE
  current_year TEXT;
  appointment_record RECORD;
  sequence_number INTEGER := 0;
  new_patient_id TEXT;
  updated_count INTEGER := 0;
  results JSONB := '[]'::JSONB;
BEGIN
  -- Get current year
  current_year := to_char(CURRENT_DATE, 'YYYY');
  
  -- Process all appointments for this year in order of creation
  FOR appointment_record IN 
    SELECT id, patient_id, patient_name, created_at
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
      
      -- Add to results
      results := results || jsonb_build_object(
        'id', appointment_record.id,
        'old_patient_id', appointment_record.patient_id,
        'new_patient_id', new_patient_id,
        'patient_name', appointment_record.patient_name,
        'created_at', appointment_record.created_at
      );
    END IF;
  END LOOP;
  
  -- Return results
  RETURN jsonb_build_object(
    'success', true,
    'updated_count', updated_count,
    'updated_appointments', results
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION aayush.generate_patient_id() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION aayush.set_patient_id() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.fix_patient_ids() TO service_role;

-- Fix existing patient IDs
SELECT public.fix_patient_ids();