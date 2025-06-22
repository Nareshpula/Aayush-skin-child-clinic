/*
  # Fix book_appointment function for Supabase REST API

  1. Changes
    - Creates a public wrapper function for the aayush.book_appointment function
    - Ensures the function is accessible via the Supabase REST API
    - Fixes parameter order and naming to match frontend expectations
    - Adds proper error handling
*/

-- Drop the existing debug_available_slots function first
DROP FUNCTION IF EXISTS public.debug_available_slots(INTEGER, DATE);

-- Recreate the debug_available_slots function with the correct signature
CREATE OR REPLACE FUNCTION public.debug_available_slots(
  p_doctor_id INTEGER,
  p_date DATE
)
RETURNS TABLE (
  time_slot TIME,
  is_available BOOLEAN,
  is_sunday BOOLEAN,
  has_exception BOOLEAN,
  has_appointment BOOLEAN,
  slot_type TEXT
) AS $$
DECLARE
  slot_time TIME;
  is_sunday BOOLEAN;
  has_exception BOOLEAN;
  has_appointment BOOLEAN;
  end_morning_time TIME;
  start_morning_time CONSTANT TIME := '10:00:00'::TIME;
  start_evening_time CONSTANT TIME := '18:00:00'::TIME;
  end_evening_time CONSTANT TIME := '21:00:00'::TIME;
BEGIN
  -- Check if the date is a Sunday
  is_sunday := EXTRACT(DOW FROM p_date) = 0;
  
  -- Set the end time for morning slots based on whether it's Sunday
  IF is_sunday THEN
    end_morning_time := '13:00:00'::TIME;
  ELSE
    end_morning_time := '15:00:00'::TIME;
  END IF;
  
  -- Morning slots (10:00 AM to end_morning_time)
  slot_time := start_morning_time;
  
  -- Process morning slots
  WHILE slot_time < end_morning_time LOOP
    -- Check if there's any exception for this doctor at this date and time
    SELECT EXISTS (
      SELECT 1
      FROM aayush.doctor_exceptions
      WHERE doctor_id = p_doctor_id
        AND date = p_date
        AND slot_time >= start_time
        AND slot_time < end_time
    ) INTO has_exception;
    
    -- Check if there's already a booked appointment at this time
    SELECT EXISTS (
      SELECT 1
      FROM aayush.appointment_slots
      WHERE doctor_id = p_doctor_id
        AND date = p_date
        AND time = slot_time
        AND is_booked = true
    ) INTO has_appointment;
    
    -- Return the slot
    time_slot := slot_time;
    is_available := NOT (has_exception OR has_appointment);
    slot_type := 'morning';
    RETURN NEXT;
    
    -- Increment by 15 minutes
    slot_time := slot_time + INTERVAL '15 minutes';
  END LOOP;
  
  -- Evening slots (6:00 PM to 9:00 PM) - only for non-Sundays
  IF NOT is_sunday THEN
    slot_time := start_evening_time;
    WHILE slot_time < end_evening_time LOOP
      -- Check if there's any exception for this doctor at this date and time
      SELECT EXISTS (
        SELECT 1
        FROM aayush.doctor_exceptions
        WHERE doctor_id = p_doctor_id
          AND date = p_date
          AND slot_time >= start_time
          AND slot_time < end_time
      ) INTO has_exception;
      
      -- Check if there's already a booked appointment at this time
      SELECT EXISTS (
        SELECT 1
        FROM aayush.appointment_slots
        WHERE doctor_id = p_doctor_id
          AND date = p_date
          AND time = slot_time
          AND is_booked = true
      ) INTO has_appointment;
      
      -- Return the slot
      time_slot := slot_time;
      is_available := NOT (has_exception OR has_appointment);
      slot_type := 'evening';
      RETURN NEXT;
      
      -- Increment by 15 minutes
      slot_time := slot_time + INTERVAL '15 minutes';
    END LOOP;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.debug_available_slots(INTEGER, DATE) TO service_role;

-- Create a function in the aayush schema to book appointments
CREATE OR REPLACE FUNCTION aayush.book_appointment(
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
  is_available := aayush.is_doctor_available(p_doctor_id, p_date, p_time);
  
  IF NOT is_available THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Doctor is not available at this time'
    );
  END IF;
  
  -- Check if a slot exists for this doctor, date, and time
  SELECT id INTO slot_id
  FROM aayush.appointment_slots
  WHERE doctor_id = p_doctor_id
    AND date = p_date
    AND time = p_time;
  
  -- If no slot exists, create one
  IF slot_id IS NULL THEN
    INSERT INTO aayush.appointment_slots (doctor_id, date, time, is_booked)
    VALUES (p_doctor_id, p_date, p_time, true)
    RETURNING id INTO slot_id;
  ELSE
    -- Update the slot to mark it as booked
    UPDATE aayush.appointment_slots
    SET is_booked = true, updated_at = now()
    WHERE id = slot_id;
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

-- Grant execute permissions on the functions
GRANT EXECUTE ON FUNCTION aayush.book_appointment(INTEGER, TEXT, TEXT, DATE, TIME, TEXT, INTEGER, TEXT, TEXT) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.book_appointment(INTEGER, TEXT, TEXT, DATE, TIME, TEXT, INTEGER, TEXT, TEXT) TO anon, authenticated, service_role;