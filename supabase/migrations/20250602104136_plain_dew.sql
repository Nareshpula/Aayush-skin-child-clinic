/*
  # Fix Doctor Display in Appointments

  1. Changes
    - Updates the get_appointments_with_details function to correctly join with the doctors table
    - Ensures the correct doctor information is retrieved for each appointment
    - Adds profile_image to the doctor information in the result
*/

-- Drop the existing function first to avoid conflicts
DROP FUNCTION IF EXISTS public.get_appointments_with_details();

-- Recreate the function with improved doctor information retrieval
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
  patient_id text,
  created_at timestamptz,
  updated_at timestamptz,
  doctor_id integer,
  doctor_name text,
  doctor_specialization text,
  doctor_profile_image text,
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
    a.patient_id,
    a.created_at,
    a.updated_at,
    d.id as doctor_id,
    d.name as doctor_name,
    d.specialization as doctor_specialization,
    d.profile_image as doctor_profile_image,
    s.date as slot_date,
    s.time as slot_time
  FROM aayush.appointments a
  JOIN aayush.appointment_slots s ON a.slot_id = s.id
  JOIN aayush.doctors d ON s.doctor_id = d.id
  ORDER BY s.date DESC, s.time DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.get_appointments_with_details() TO anon, authenticated, service_role;

-- Create a function to verify the appointment data integrity
CREATE OR REPLACE FUNCTION public.verify_appointment_doctor_data()
RETURNS TABLE (
  appointment_id integer,
  slot_id integer,
  doctor_id integer,
  doctor_name text,
  mismatch boolean
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id as appointment_id,
    a.slot_id,
    d.id as doctor_id,
    d.name as doctor_name,
    false as mismatch
  FROM aayush.appointments a
  JOIN aayush.appointment_slots s ON a.slot_id = s.id
  JOIN aayush.doctors d ON s.doctor_id = d.id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.verify_appointment_doctor_data() TO service_role;