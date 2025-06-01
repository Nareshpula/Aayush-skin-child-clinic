/*
  # Add insert_appointment function to public schema

  1. New Functions
    - `public.insert_appointment` - Function to insert appointments into aayush.appointments table
  
  2. Security
    - Grant execute permissions to anon and authenticated roles
*/

-- Create or replace the insert_appointment function
CREATE OR REPLACE FUNCTION public.insert_appointment(
  slot_id INTEGER,
  patient_name TEXT,
  email TEXT,
  phone_number TEXT,
  age INTEGER,
  gender TEXT,
  reason TEXT
) RETURNS aayush.appointments AS $$
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
  RETURNING *;
$$ LANGUAGE SQL SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.insert_appointment(INTEGER, TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT) TO anon, authenticated;