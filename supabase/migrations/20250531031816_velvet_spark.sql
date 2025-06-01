/*
  # Fix Appointment Functions to Use Aayush Schema

  1. Changes
    - Create update_appointment_slot function in public schema that references aayush schema
    - Ensure all functions properly reference the aayush schema tables
    - Fix permissions for all functions
*/

-- Create or replace the update_appointment_slot function
CREATE OR REPLACE FUNCTION public.update_appointment_slot(
  p_id INTEGER,
  p_doctor_id INTEGER,
  p_date DATE,
  p_time TIME,
  p_is_booked BOOLEAN
) RETURNS aayush.appointment_slots AS $$
DECLARE
  result aayush.appointment_slots;
BEGIN
  -- If p_id is null, insert a new slot
  IF p_id IS NULL THEN
    INSERT INTO aayush.appointment_slots (
      doctor_id, 
      date, 
      time, 
      is_booked
    ) VALUES (
      p_doctor_id, 
      p_date, 
      p_time, 
      p_is_booked
    )
    RETURNING * INTO result;
  -- Otherwise, update the existing slot
  ELSE
    UPDATE aayush.appointment_slots
    SET 
      doctor_id = p_doctor_id,
      date = p_date,
      time = p_time,
      is_booked = p_is_booked,
      updated_at = now()
    WHERE id = p_id
    RETURNING * INTO result;
  END IF;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.update_appointment_slot(INTEGER, INTEGER, DATE, TIME, BOOLEAN) TO anon, authenticated;

-- Create or replace the get_appointments_with_details function to ensure it works correctly
CREATE OR REPLACE FUNCTION public.get_appointments_with_details()
RETURNS TABLE (
  id integer,
  slot_id integer,
  patient_name text,
  email text,
  phone_number text,
  age integer,
  gender text,
  reason text,
  created_at timestamptz,
  updated_at timestamptz,
  doctor_id integer,
  doctor_name text,
  doctor_specialization text,
  slot_date date,
  slot_time time
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.slot_id,
    a.patient_name,
    a.email,
    a.phone_number,
    a.age,
    a.gender,
    a.reason,
    a.created_at,
    a.updated_at,
    d.id as doctor_id,
    d.name as doctor_name,
    d.specialization as doctor_specialization,
    s.date as slot_date,
    s.time as slot_time
  FROM aayush.appointments a
  JOIN aayush.appointment_slots s ON a.slot_id = s.id
  JOIN aayush.doctors d ON s.doctor_id = d.id
  ORDER BY s.date DESC, s.time DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.get_appointments_with_details() TO anon, authenticated;

-- Create or replace the insert_appointment function to ensure it works correctly
CREATE OR REPLACE FUNCTION public.insert_appointment(
  slot_id INTEGER,
  patient_name TEXT,
  email TEXT,
  phone_number TEXT,
  age INTEGER,
  gender TEXT,
  reason TEXT
) RETURNS aayush.appointments AS $$
DECLARE
  result aayush.appointments;
BEGIN
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
    patient_name, 
    email, 
    phone_number, 
    age, 
    gender, 
    reason
  )
  RETURNING * INTO result;
  
  -- Update the slot to mark it as booked
  UPDATE aayush.appointment_slots
  SET is_booked = true, updated_at = now()
  WHERE id = slot_id;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.insert_appointment(INTEGER, TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT) TO anon, authenticated;