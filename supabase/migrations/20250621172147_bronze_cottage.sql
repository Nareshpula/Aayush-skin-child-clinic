-- Create a new version of the book_appointment function that accepts any combination of parameters
CREATE OR REPLACE FUNCTION public.book_appointment(
  p_email TEXT DEFAULT NULL,
  p_reason TEXT DEFAULT NULL,
  p_age INTEGER DEFAULT NULL,
  p_date DATE DEFAULT NULL,
  p_gender TEXT DEFAULT NULL,
  p_time TIME DEFAULT NULL,
  p_doctor_id INTEGER DEFAULT NULL,
  p_patient_name TEXT DEFAULT NULL,
  p_patient_phone TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  -- Log the parameters for debugging
  RAISE NOTICE 'Booking appointment with flexible parameters: doctor_id=%, name=%, phone=%, date=%, time=%, email=%, age=%, gender=%, reason=%',
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
  
  IF p_date IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Appointment date is required'
    );
  END IF;
  
  IF p_time IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Appointment time is required'
    );
  END IF;
  
  -- Call the fix_book_appointment function with the parameters in the correct order
  SELECT * INTO result FROM public.fix_book_appointment(
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
  TEXT, TEXT, INTEGER, DATE, TEXT, TIME, INTEGER, TEXT, TEXT
) TO anon, authenticated, service_role;