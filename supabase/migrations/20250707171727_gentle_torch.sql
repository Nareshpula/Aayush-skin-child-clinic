/*
  # Fix Patient ID Ambiguity and Booking Issues

  1. Changes
    - Fixes the "column reference patient_id is ambiguous" error
    - Updates the book_appointment_v2 function to properly return patient_id
    - Adds a function to retrieve appointment details with unambiguous column references
    - Improves error handling and debugging for appointment booking
*/

-- Create a function to get appointment details with unambiguous column references
CREATE OR REPLACE FUNCTION public.get_appointment_details(p_appointment_id INTEGER)
RETURNS JSONB AS $$
DECLARE
  appointment_record RECORD;
BEGIN
  -- Get the appointment with unambiguous column references
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
GRANT EXECUTE ON FUNCTION public.get_appointment_details(INTEGER) TO anon, authenticated, service_role;

-- Create an improved version of book_appointment_v2 function
CREATE OR REPLACE FUNCTION public.book_appointment_v3(
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
  debug_info JSONB;
BEGIN
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
  
  -- Generate patient ID (format: ACH-YYYY-NNNN)
  current_year := to_char(CURRENT_DATE, 'YYYY');
  
  -- Get the next sequence number for this year
  SELECT COALESCE(MAX(SUBSTRING(a.patient_id FROM 9)::INTEGER), 0) + 1
  INTO sequence_number
  FROM aayush.appointments a
  WHERE a.patient_id LIKE 'ACH-' || current_year || '-%';
  
  -- Format the patient ID
  patient_id := 'ACH-' || current_year || '-' || LPAD(sequence_number::TEXT, 4, '0');
  
  debug_info := debug_info || jsonb_build_object(
    'patient_id_generation', jsonb_build_object(
      'current_year', current_year,
      'sequence_number', sequence_number,
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

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.book_appointment_v3(INTEGER, TEXT, TEXT, DATE, TIME, TEXT, INTEGER, TEXT, TEXT) TO anon, authenticated, service_role;

-- Add a comment to explain the function
COMMENT ON FUNCTION public.book_appointment_v3(INTEGER, TEXT, TEXT, DATE, TIME, TEXT, INTEGER, TEXT, TEXT) IS 'Books an appointment and returns the appointment details including patient_id with improved error handling';

-- Create a function to get appointments with unambiguous column references
CREATE OR REPLACE FUNCTION public.get_appointments_with_details_v2()
RETURNS SETOF JSONB AS $$
BEGIN
  RETURN QUERY
  SELECT jsonb_build_object(
    'id', a.id,
    'slot_id', a.slot_id,
    'patient_id', a.patient_id,
    'patient_name', a.patient_name,
    'phone_number', a.phone_number,
    'email', a.email,
    'age', a.age,
    'gender', a.gender,
    'reason', a.reason,
    'created_at', a.created_at,
    'updated_at', a.updated_at,
    'slot', jsonb_build_object(
      'id', s.id,
      'doctor_id', s.doctor_id,
      'date', s.date,
      'time', s.time,
      'is_booked', s.is_booked
    ),
    'doctor', jsonb_build_object(
      'id', d.id,
      'name', d.name,
      'specialization', d.specialization,
      'profile_image', d.profile_image
    )
  )
  FROM aayush.appointments a
  JOIN aayush.appointment_slots s ON a.slot_id = s.id
  JOIN aayush.doctors d ON s.doctor_id = d.id
  ORDER BY s.date DESC, s.time ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.get_appointments_with_details_v2() TO anon, authenticated, service_role;

-- Add a comment to explain the function
COMMENT ON FUNCTION public.get_appointments_with_details_v2() IS 'Gets all appointments with details using unambiguous column references';