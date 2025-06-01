/*
  # Add get_appointments_with_details function

  1. New Function
    - Creates a function to fetch appointments with related doctor and slot details
    - Returns all appointment details including:
      - Appointment information (id, patient details, etc.)
      - Slot information (date, time)
      - Doctor information (name, specialization)
    
  2. Security
    - Grants EXECUTE permission to authenticated and anon roles
*/

-- Create the function to get appointments with details
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
) 
LANGUAGE sql
SECURITY DEFINER
AS $$
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
$$;

-- Grant execute permission to authenticated and anon roles
GRANT EXECUTE ON FUNCTION public.get_appointments_with_details() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_appointments_with_details() TO anon;