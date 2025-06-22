-- Create a new version of the book_appointment function that accepts parameters in the order expected by the frontend
CREATE OR REPLACE FUNCTION public.book_appointment(
  p_age INTEGER DEFAULT NULL,
  p_date DATE,
  p_doctor_id INTEGER,
  p_email TEXT DEFAULT NULL,
  p_gender TEXT DEFAULT NULL,
  p_patient_name TEXT,
  p_patient_phone TEXT,
  p_reason TEXT DEFAULT NULL,
  p_time TIME
)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  -- Log the parameters for debugging
  RAISE NOTICE 'Booking appointment with parameters: doctor_id=%, name=%, phone=%, date=%, time=%, email=%, age=%, gender=%, reason=%',
    p_doctor_id, p_patient_name, p_patient_phone, p_date, p_time, p_email, p_age, p_gender, p_reason;
  
  -- Call the aayush schema function with the parameters in the correct order
  SELECT * INTO result FROM aayush.book_appointment(
    p_doctor_id,
    p_patient_name,
    p_patient_phone,
    p_date,
    p_time,
    p_email,
    p_age,
    p_gender,
    p_reason
  );
  
  -- Return the result
  RETURN result;
EXCEPTION WHEN OTHERS THEN
  -- Return error information if the function fails
  RETURN jsonb_build_object(
    'success', false,
    'message', SQLERRM,
    'detail', SQLSTATE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.book_appointment(
  INTEGER, DATE, INTEGER, TEXT, TEXT, TEXT, TEXT, TEXT, TIME
) TO anon, authenticated, service_role;

-- Create an additional overload of the book_appointment function that accepts parameters in a different order
CREATE OR REPLACE FUNCTION public.book_appointment(
  p_age INTEGER DEFAULT NULL,
  p_date DATE,
  p_email TEXT DEFAULT NULL,
  p_gender TEXT DEFAULT NULL,
  p_reason TEXT DEFAULT NULL,
  p_time TIME,
  p_doctor_id INTEGER DEFAULT NULL,
  p_patient_name TEXT DEFAULT NULL,
  p_patient_phone TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  -- Log the parameters for debugging
  RAISE NOTICE 'Booking appointment with parameters (overload): doctor_id=%, name=%, phone=%, date=%, time=%, email=%, age=%, gender=%, reason=%',
    p_doctor_id, p_patient_name, p_patient_phone, p_date, p_time, p_email, p_age, p_gender, p_reason;
  
  -- Validate required parameters
  IF p_doctor_id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Doctor ID is required'
    );
  END IF;
  
  IF p_patient_name IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Patient name is required'
    );
  END IF;
  
  IF p_patient_phone IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Patient phone number is required'
    );
  END IF;
  
  -- Call the aayush schema function with the parameters in the correct order
  SELECT * INTO result FROM aayush.book_appointment(
    p_doctor_id,
    p_patient_name,
    p_patient_phone,
    p_date,
    p_time,
    p_email,
    p_age,
    p_gender,
    p_reason
  );
  
  -- Return the result
  RETURN result;
EXCEPTION WHEN OTHERS THEN
  -- Return error information if the function fails
  RETURN jsonb_build_object(
    'success', false,
    'message', SQLERRM,
    'detail', SQLSTATE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.book_appointment(
  INTEGER, DATE, TEXT, TEXT, TEXT, TIME, INTEGER, TEXT, TEXT
) TO anon, authenticated, service_role;

-- Create a function to fix the appointment booking issue
CREATE OR REPLACE FUNCTION public.fix_book_appointment(
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
  is_available BOOLEAN;
  patient_id TEXT;
  slot_record RECORD;
BEGIN
  -- Check if the doctor is available at this time
  SELECT EXISTS (
    SELECT 1
    FROM aayush.doctor_exceptions
    WHERE doctor_id = p_doctor_id
      AND date = p_date
      AND p_time >= start_time
      AND p_time < end_time
  ) INTO is_available;
  
  IF is_available THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Doctor is not available at this time due to an exception'
    );
  END IF;
  
  -- Check if a slot exists for this doctor, date, and time
  SELECT id, is_booked INTO slot_record
  FROM aayush.appointment_slots
  WHERE doctor_id = p_doctor_id
    AND date = p_date
    AND time = p_time;
  
  -- If no slot exists, create one
  IF slot_record IS NULL THEN
    INSERT INTO aayush.appointment_slots (doctor_id, date, time, is_booked)
    VALUES (p_doctor_id, p_date, p_time, true)
    RETURNING id INTO slot_id;
  ELSE
    -- If slot exists but is already booked
    IF slot_record.is_booked THEN
      RETURN jsonb_build_object(
        'success', false,
        'message', 'This time slot is already booked'
      );
    END IF;
    
    -- Update the slot to mark it as booked
    UPDATE aayush.appointment_slots
    SET is_booked = true, updated_at = now()
    WHERE id = slot_record.id;
    
    slot_id := slot_record.id;
  END IF;
  
  -- Insert the appointment
  INSERT INTO aayush.appointments (
    slot_id,
    patient_name,
    email,
    phone_number,
    age,
    gender,
    reason
  ) VALUES (
    slot_id,
    p_patient_name,
    p_email,
    p_patient_phone,
    COALESCE(p_age, 0),
    COALESCE(p_gender, 'Not specified'),
    p_reason
  )
  RETURNING id, patient_id INTO appointment_id, patient_id;
  
  -- Return success response
  RETURN jsonb_build_object(
    'success', true,
    'appointment_id', appointment_id,
    'patient_id', patient_id,
    'doctor_id', p_doctor_id,
    'date', p_date,
    'time', p_time,
    'slot_id', slot_id
  );
EXCEPTION WHEN OTHERS THEN
  -- Return error information if the function fails
  RETURN jsonb_build_object(
    'success', false,
    'message', SQLERRM,
    'detail', SQLSTATE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.fix_book_appointment(
  INTEGER, TEXT, TEXT, DATE, TIME, TEXT, INTEGER, TEXT, TEXT
) TO anon, authenticated, service_role;