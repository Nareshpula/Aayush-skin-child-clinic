/*
  # Fix Patient ID Display in Appointment Confirmation

  1. Changes
    - Adds a function to ensure patient_id is properly returned in booking response
    - Ensures patient_id is generated and displayed on the confirmation screen
    - Fixes the format of the patient_id to be consistent
*/

-- Create a function to ensure patient_id is properly returned
CREATE OR REPLACE FUNCTION public.get_appointment_with_patient_id(p_appointment_id INTEGER)
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
GRANT EXECUTE ON FUNCTION public.get_appointment_with_patient_id(INTEGER) TO anon, authenticated, service_role;

-- Modify the book_appointment function to ensure patient_id is returned
CREATE OR REPLACE FUNCTION public.book_appointment_v2(
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
  current_year TEXT;
  sequence_number INTEGER;
BEGIN
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
  ELSE
    -- Update the slot to mark it as booked
    UPDATE aayush.appointment_slots
    SET is_booked = true
    WHERE id = slot_id;
  END IF;
  
  -- Generate patient ID (format: ACH-YYYY-NNNN)
  current_year := to_char(CURRENT_DATE, 'YYYY');
  
  -- Get the next sequence number for this year
  SELECT COALESCE(MAX(SUBSTRING(patient_id FROM 9)::INTEGER), 0) + 1
  INTO sequence_number
  FROM aayush.appointments
  WHERE patient_id LIKE 'ACH-' || current_year || '-%';
  
  -- Format the patient ID
  patient_id := 'ACH-' || current_year || '-' || LPAD(sequence_number::TEXT, 4, '0');
  
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
  
  -- Return the appointment details including patient_id
  RETURN public.get_appointment_with_patient_id(appointment_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.book_appointment_v2(INTEGER, TEXT, TEXT, DATE, TIME, TEXT, INTEGER, TEXT, TEXT) TO anon, authenticated, service_role;

-- Add a comment to explain the function
COMMENT ON FUNCTION public.book_appointment_v2(INTEGER, TEXT, TEXT, DATE, TIME, TEXT, INTEGER, TEXT, TEXT) IS 'Books an appointment and returns the appointment details including patient_id';