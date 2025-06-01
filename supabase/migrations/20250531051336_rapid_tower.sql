/*
  # Fix Patient ID Generation and SMS Integration

  1. Changes
    - Improve patient ID generation function with better error handling
    - Add helper function to extract numeric parts from patient IDs
    - Grant necessary permissions for edge function to work properly
    - Add additional permissions for SMS functionality
*/

-- Create or replace function to generate unique patient ID with improved error handling
CREATE OR REPLACE FUNCTION aayush.generate_patient_id() 
RETURNS TRIGGER AS $$
DECLARE
  year_part TEXT;
  sequence_num INT;
  patient_id_prefix TEXT := 'AAYUSH';
  max_id TEXT;
  id_parts TEXT[];
  extracted_num TEXT;
BEGIN
  -- Get current year (last 2 digits)
  year_part := to_char(CURRENT_DATE, 'YY');
  
  -- Get the next sequence number for this year with improved error handling
  BEGIN
    -- Find the maximum patient_id that matches our pattern
    SELECT MAX(patient_id) INTO max_id
    FROM aayush.appointments
    WHERE patient_id ~ ('^' || patient_id_prefix || '-' || year_part || '-[0-9]{5}$');
    
    IF max_id IS NULL THEN
      -- No existing IDs for this year, start with 1
      sequence_num := 1;
    ELSE
      -- Extract the sequence number using regex pattern matching
      -- This is safer than substring operations
      id_parts := regexp_match(max_id, patient_id_prefix || '-' || year_part || '-([0-9]{5})');
      
      IF id_parts IS NULL OR array_length(id_parts, 1) < 1 THEN
        -- If pattern doesn't match as expected, start with 1
        sequence_num := 1;
      ELSE
        extracted_num := id_parts[1];
        BEGIN
          -- Try to convert to integer
          sequence_num := extracted_num::INT + 1;
        EXCEPTION WHEN OTHERS THEN
          -- If conversion fails, start with 1
          sequence_num := 1;
        END;
      END IF;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    -- If any other error occurs, start with 1
    sequence_num := 1;
  END;
  
  -- Format: AAYUSH-YY-NNNNN (e.g., AAYUSH-24-00001)
  NEW.patient_id := patient_id_prefix || '-' || year_part || '-' || LPAD(sequence_num::TEXT, 5, '0');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a function to safely extract the numeric part from patient_id
CREATE OR REPLACE FUNCTION aayush.extract_patient_id_number(patient_id TEXT)
RETURNS INTEGER AS $$
DECLARE
  id_parts TEXT[];
  extracted_num TEXT;
  result INTEGER;
BEGIN
  -- Extract the sequence number using regex pattern matching
  id_parts := regexp_match(patient_id, 'AAYUSH-[0-9]{2}-([0-9]{5})');
  
  IF id_parts IS NULL OR array_length(id_parts, 1) < 1 THEN
    -- If pattern doesn't match as expected, return 0
    RETURN 0;
  ELSE
    extracted_num := id_parts[1];
    BEGIN
      -- Try to convert to integer
      result := extracted_num::INTEGER;
      RETURN result;
    EXCEPTION WHEN OTHERS THEN
      -- If conversion fails, return 0
      RETURN 0;
    END;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions for edge functions
GRANT USAGE ON SCHEMA storage TO anon, authenticated, service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA storage TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION aayush.extract_patient_id_number(TEXT) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION aayush.generate_patient_id() TO anon, authenticated, service_role;

-- Grant additional permissions needed for the SMS function
GRANT USAGE ON SCHEMA auth TO anon, authenticated, service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA auth TO anon, authenticated, service_role;

-- Grant permissions to public schema for edge functions
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated, service_role;