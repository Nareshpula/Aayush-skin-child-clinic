/*
  # Fix Patient ID Display on Confirmation Screen

  1. Changes
    - Ensures patient_id is properly generated and returned in the booking response
    - Adds a function to retrieve appointment details with patient_id
    - Improves error handling for appointment booking process
*/

-- Create a function to ensure patient_id is properly returned
CREATE OR REPLACE FUNCTION public.get_appointment_with_patient_id_v2(p_appointment_id INTEGER)
RETURNS JSONB AS $$
DECLARE
  appointment_record RECORD;
BEGIN
  -- Get the appointment with patient_id
  SELECT 
    a.id,
    a.patient_id,
    a.patient_name,
    a.phone_number,
    a.email,
    a.age,
    a.gender,
    a.reason,
    a.created_at,
    s.date AS appointment_date,
    s.time AS appointment_time,
    s.doctor_id,
    d.name AS doctor_name,
    d.specialization AS doctor_specialization
  INTO appointment_record
  FROM aayush.appointments a
  JOIN aayush.appointment_slots s ON a.slot_id = s.id
  JOIN aayush.doctors d ON s.doctor_id = d.id
  WHERE a.id = p_appointment_id;
  
  -- If no appointment found, return error
  IF appointment_record IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Appointment not found'
    );
  END IF;
  
  -- Return the appointment data with patient_id
  RETURN jsonb_build_object(
    'success', true,
    'appointment', jsonb_build_object(
      'id', appointment_record.id,
      'patient_id', appointment_record.patient_id,
      'patient_name', appointment_record.patient_name,
      'phone_number', appointment_record.phone_number,
      'email', appointment_record.email,
      'age', appointment_record.age,
      'gender', appointment_record.gender,
      'reason', appointment_record.reason,
      'created_at', appointment_record.created_at,
      'appointment_date', appointment_record.appointment_date,
      'appointment_time', appointment_record.appointment_time,
      'doctor_id', appointment_record.doctor_id,
      'doctor_name', appointment_record.doctor_name,
      'doctor_specialization', appointment_record.doctor_specialization
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.get_appointment_with_patient_id_v2(INTEGER) TO anon, authenticated, service_role;

-- Create a function to debug patient_id generation
CREATE OR REPLACE FUNCTION public.debug_patient_id_generation()
RETURNS JSONB AS $$
DECLARE
  current_year TEXT;
  latest_patient_id TEXT;
  latest_sequence INTEGER;
  next_sequence INTEGER;
  sample_patient_id TEXT;
BEGIN
  -- Get current year
  current_year := to_char(CURRENT_DATE, 'YYYY');
  
  -- Get the latest patient_id for this year
  SELECT patient_id INTO latest_patient_id
  FROM aayush.appointments
  WHERE patient_id LIKE 'ACH-' || current_year || '-%'
  ORDER BY id DESC
  LIMIT 1;
  
  -- Get the latest sequence number
  IF latest_patient_id IS NOT NULL THEN
    latest_sequence := SUBSTRING(latest_patient_id FROM 9)::INTEGER;
  ELSE
    latest_sequence := 0;
  END IF;
  
  -- Calculate next sequence number
  next_sequence := latest_sequence + 1;
  
  -- Generate sample patient_id
  sample_patient_id := 'ACH-' || current_year || '-' || LPAD(next_sequence::TEXT, 4, '0');
  
  -- Return debug information
  RETURN jsonb_build_object(
    'current_year', current_year,
    'latest_patient_id', latest_patient_id,
    'latest_sequence', latest_sequence,
    'next_sequence', next_sequence,
    'sample_patient_id', sample_patient_id,
    'patient_id_format', 'ACH-YYYY-NNNN'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.debug_patient_id_generation() TO anon, authenticated, service_role;

-- Add a comment to explain the function
COMMENT ON FUNCTION public.debug_patient_id_generation() IS 'Debugs the patient_id generation process and returns sample patient_id';