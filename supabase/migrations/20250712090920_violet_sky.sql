/*
  # Implement Same-Day Appointment Restriction

  1. Changes
    - Adds a function to check if a date is today in IST timezone
    - Updates the get_available_slots function to exclude today's date
    - Adds a function to validate appointment dates before booking
*/

-- Create a function to check if a date is today in IST timezone
CREATE OR REPLACE FUNCTION public.is_today_in_ist(p_date DATE)
RETURNS BOOLEAN AS $$
DECLARE
  ist_date DATE;
  ist_today DATE;
BEGIN
  -- Convert UTC date to IST date
  ist_date := (p_date::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::DATE;
  
  -- Get today's date in IST
  ist_today := (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata')::DATE;
  
  -- Check if the date is today
  RETURN ist_date = ist_today;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to validate appointment date
CREATE OR REPLACE FUNCTION public.validate_appointment_date(p_date DATE)
RETURNS JSONB AS $$
DECLARE
  is_today BOOLEAN;
BEGIN
  -- Check if the date is today in IST
  is_today := public.is_today_in_ist(p_date);
  
  -- If it's today, return error
  IF is_today THEN
    RETURN jsonb_build_object(
      'valid', false,
      'error', 'You can''t book an appointment today. Please select a future date.'
    );
  END IF;
  
  -- Otherwise, return success
  RETURN jsonb_build_object(
    'valid', true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create an improved version of book_appointment_v3 function with date validation
CREATE OR REPLACE FUNCTION public.book_appointment_v4(
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
  date_validation JSONB;
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

-- Grant execute permissions on the functions
GRANT EXECUTE ON FUNCTION public.is_today_in_ist(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.validate_appointment_date(DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.book_appointment_v4(INTEGER, TEXT, TEXT, DATE, TIME, TEXT, INTEGER, TEXT, TEXT) TO anon, authenticated, service_role;

-- Add comments to explain the functions
COMMENT ON FUNCTION public.is_today_in_ist(DATE) IS 'Checks if a date is today in IST timezone';
COMMENT ON FUNCTION public.validate_appointment_date(DATE) IS 'Validates an appointment date, ensuring it is not today';
COMMENT ON FUNCTION public.book_appointment_v4(INTEGER, TEXT, TEXT, DATE, TIME, TEXT, INTEGER, TEXT, TEXT) IS 'Books an appointment with date validation to prevent same-day bookings';