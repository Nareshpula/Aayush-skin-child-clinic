/*
  # Fix Appointments Function

  1. Changes
    - Drop and recreate get_appointments_with_details function with patient_id field
    - Ensure proper return type and field ordering
    - Grant execute permissions to both authenticated and anonymous users
*/

-- Drop the existing function first to avoid the return type error
DROP FUNCTION IF EXISTS public.get_appointments_with_details();

-- Recreate the function with the correct return type including patient_id
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