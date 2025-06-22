/*
  # Create public wrapper for aayush.book_appointment function

  1. New Functions
    - Creates a public wrapper function for the aayush.book_appointment function
    - Ensures the function is accessible from the Supabase client
  
  2. Security
    - Sets the function as SECURITY DEFINER to run with elevated privileges
    - Grants execute permissions to all roles
*/

-- Create a public wrapper function for the aayush.book_appointment function
CREATE OR REPLACE FUNCTION public.book_appointment(
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
  result JSONB;
BEGIN
  -- Call the aayush schema function
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
GRANT EXECUTE ON FUNCTION public.book_appointment(INTEGER, TEXT, TEXT, DATE, TIME, TEXT, INTEGER, TEXT, TEXT) TO anon, authenticated, service_role;

-- Create a function to get available slots in the public schema
CREATE OR REPLACE FUNCTION public.get_available_slots(
  p_doctor_id INTEGER,
  p_date DATE
)
RETURNS TABLE (
  time_slot TIME,
  is_available BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM aayush.get_available_slots(p_doctor_id, p_date);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.get_available_slots(INTEGER, DATE) TO anon, authenticated, service_role;