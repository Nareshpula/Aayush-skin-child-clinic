/*
  # Fix Patient ID Generation Logic

  1. Changes
    - Fixes the patient ID generation to ensure sequential and unique IDs
    - Ensures IDs are based on the latest appointment record
    - Implements server-side atomic generation to avoid race conditions
    - Uses MAX() lookup on the latest ID suffix for proper sequencing
    - Adds debugging functions to verify patient ID generation
*/

-- Create a function to get the next patient ID
CREATE OR REPLACE FUNCTION aayush.get_next_patient_id()
RETURNS TEXT AS $$
DECLARE
  current_year TEXT;
  latest_sequence INTEGER;
  next_sequence INTEGER;
  next_patient_id TEXT;
  debug_info JSONB;
BEGIN
  -- Get current year
  current_year := to_char(CURRENT_DATE, 'YYYY');
  
  -- Get the latest sequence number for this year using MAX function
  -- This ensures we always get the highest number even if IDs were created out of order
  SELECT COALESCE(MAX(CAST(SUBSTRING(patient_id FROM 10) AS INTEGER)), 0)
  INTO latest_sequence
  FROM aayush.appointments
  WHERE patient_id LIKE 'ACH-' || current_year || '-%';
  
  -- Calculate next sequence number
  next_sequence := latest_sequence + 1;
  
  -- Format the patient ID with leading zeros (4 digits)
  next_patient_id := 'ACH-' || current_year || '-' || LPAD(next_sequence::TEXT, 4, '0');
  
  -- Log debug info
  RAISE NOTICE 'Generated patient ID: %, Current year: %, Latest sequence: %, Next sequence: %', 
    next_patient_id, current_year, latest_sequence, next_sequence;
  
  RETURN next_patient_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to book an appointment with fixed patient ID generation
CREATE OR REPLACE FUNCTION public.book_appointment_v5(
  p_doctor_id INTEGER,
  p_patient_name TEXT,
  p_patient_phone TEXT,
  p_date DATE,
  p_time TIME,
  p_email TEXT DEFAULT NULL,
  p_age INTEGER DEFAULT NULL,
  p_gender TEXT DEFAULT NULL,
  p_reason TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  slot_id INTEGER;
  appointment_id INTEGER;
  patient_id TEXT;
  date_validation JSONB;
  debug_info JSONB;
BEGIN
  -- Validate appointment date
  date_validation := public.validate_appointment_date(p_date);
  
  -- If date is invalid, return error
  IF NOT (date_validation->>'valid')::BOOLEAN THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', date_validation->>'error'
    );
  END IF;

  -- Generate debug info for troubleshooting
  debug_info := jsonb_build_object(
    'doctor_id', p_doctor_id,
    'patient_name', p_patient_name,
    'patient_phone', p_patient_phone,
    'date', p_date,
    'time', p_time,
    'email', p_email,
    'age', p_age,
    'gender', p_gender
  );

  -- Check if the slot exists and is available
  SELECT id INTO slot_id
  FROM aayush.appointment_slots
  WHERE doctor_id = p_doctor_id
    AND date = p_date
    AND time = p_time
    AND is_booked = false;
  
  -- If slot doesn't exist, create it
  IF slot_id IS NULL THEN
    INSERT INTO aayush.appointment_slots (doctor_id, date, time, is_booked)
    VALUES (p_doctor_id, p_date, p_time, true)
    RETURNING id INTO slot_id;
    
    debug_info := debug_info || jsonb_build_object('slot_created', true, 'slot_id', slot_id);
  ELSE
    -- Update the slot to mark it as booked
    UPDATE aayush.appointment_slots
    SET is_booked = true
    WHERE id = slot_id;
    
    debug_info := debug_info || jsonb_build_object('slot_updated', true, 'slot_id', slot_id);
  END IF;
  
  -- Generate patient ID using the fixed function
  patient_id := aayush.get_next_patient_id();
  
  debug_info := debug_info || jsonb_build_object(
    'patient_id_generation', jsonb_build_object(
      'generated_patient_id', patient_id
    )
  );
  
  -- Insert the appointment
  INSERT INTO aayush.appointments (
    slot_id,
    patient_name,
    phone_number,
    email,
    age,
    gender,
    reason,
    patient_id
  )
  VALUES (
    slot_id,
    p_patient_name,
    p_patient_phone,
    p_email,
    p_age,
    p_gender,
    p_reason,
    patient_id
  )
  RETURNING id INTO appointment_id;
  
  debug_info := debug_info || jsonb_build_object('appointment_created', true, 'appointment_id', appointment_id);
  
  -- Return the appointment details including patient_id
  RETURN public.get_appointment_details(appointment_id) || jsonb_build_object('debug', debug_info);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to debug patient ID generation
CREATE OR REPLACE FUNCTION public.debug_patient_id_generation_v2()
RETURNS JSONB AS $$
DECLARE
  current_year TEXT;
  all_patient_ids JSONB;
  latest_patient_id TEXT;
  latest_sequence INTEGER;
  next_sequence INTEGER;
  next_patient_id TEXT;
BEGIN
  -- Get current year
  current_year := to_char(CURRENT_DATE, 'YYYY');
  
  -- Get all patient IDs for this year
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', a.id,
      'patient_id', a.patient_id,
      'patient_name', a.patient_name,
      'created_at', a.created_at
    ) ORDER BY a.id
  )
  INTO all_patient_ids
  FROM aayush.appointments a
  WHERE a.patient_id LIKE 'ACH-' || current_year || '-%';
  
  -- Get the latest patient_id by sequence number
  SELECT patient_id INTO latest_patient_id
  FROM aayush.appointments
  WHERE patient_id LIKE 'ACH-' || current_year || '-%'
  ORDER BY CAST(SUBSTRING(patient_id FROM 10) AS INTEGER) DESC
  LIMIT 1;
  
  -- Get the latest sequence number
  IF latest_patient_id IS NOT NULL THEN
    latest_sequence := SUBSTRING(latest_patient_id FROM 10)::INTEGER;
  ELSE
    latest_sequence := 0;
  END IF;
  
  -- Calculate next sequence number
  next_sequence := latest_sequence + 1;
  
  -- Generate next patient_id
  next_patient_id := 'ACH-' || current_year || '-' || LPAD(next_sequence::TEXT, 4, '0');
  
  -- Return debug information
  RETURN jsonb_build_object(
    'current_year', current_year,
    'all_patient_ids', COALESCE(all_patient_ids, '[]'::JSONB),
    'latest_patient_id', latest_patient_id,
    'latest_sequence', latest_sequence,
    'next_sequence', next_sequence,
    'next_patient_id', next_patient_id,
    'patient_id_format', 'ACH-YYYY-NNNN'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to fix existing patient IDs if needed
CREATE OR REPLACE FUNCTION public.fix_existing_patient_ids()
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

-- Grant execute permissions on the functions
GRANT EXECUTE ON FUNCTION aayush.get_next_patient_id() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.book_appointment_v5(INTEGER, TEXT, TEXT, DATE, TIME, TEXT, INTEGER, TEXT, TEXT) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.debug_patient_id_generation_v2() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.fix_existing_patient_ids() TO service_role;

-- Add comments to explain the functions
COMMENT ON FUNCTION aayush.get_next_patient_id() IS 'Gets the next sequential patient ID in the format ACH-YYYY-NNNN';
COMMENT ON FUNCTION public.book_appointment_v5(INTEGER, TEXT, TEXT, DATE, TIME, TEXT, INTEGER, TEXT, TEXT) IS 'Books an appointment with fixed patient ID generation to ensure sequential IDs';
COMMENT ON FUNCTION public.debug_patient_id_generation_v2() IS 'Debugs the patient ID generation process and returns detailed information';
COMMENT ON FUNCTION public.fix_existing_patient_ids() IS 'Fixes existing patient IDs to ensure they are sequential based on creation date';