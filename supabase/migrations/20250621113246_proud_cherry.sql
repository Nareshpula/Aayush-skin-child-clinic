/*
  # Fix Doctor Data and Add RPC Functions

  1. Changes
    - Updates doctor profile images in the aayush schema
    - Creates RPC function to fetch doctors from aayush schema
    - Adds debugging function to compare doctor data across schemas
*/

-- Create a function to get doctors from the aayush schema
CREATE OR REPLACE FUNCTION public.get_doctors_from_aayush()
RETURNS SETOF aayush.doctors AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM aayush.doctors;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.get_doctors_from_aayush() TO anon, authenticated, service_role;

-- Update Dr. G Sridhar's profile image
UPDATE aayush.doctors
SET profile_image = 'https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Doctors-Image/Sridhar-Image.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNmRjYTIxMy05OWY0LTQyNmQtOWNjNC0yZjAwYjJhNzQ0MWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRG9jdG9ycy1JbWFnZS9TcmlkaGFyLUltYWdlLmpwZyIsImlhdCI6MTc0OTM0OTI2OCwiZXhwIjoxOTA3MDI5MjY4fQ.eJ32umItgxbVzIBqKE7q6aFiCXpbuYVxVG5ExE7neCk'
WHERE id = 1;

-- Update Dr. Himabindu Sridhar's profile image
UPDATE aayush.doctors
SET profile_image = 'https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Doctors-Image/Dr-Himabindu-image.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNmRjYTIxMy05OWY0LTQyNmQtOWNjNC0yZjAwYjJhNzQ0MWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRG9jdG9ycy1JbWFnZS9Eci1IaW1hYmluZHUtaW1hZ2UuanBnIiwiaWF0IjoxNzQ5ODg5NzcwLCJleHAiOjE5MDc1Njk3NzB9.6gJZWdZJ6PvX_gtxzcOqYcdQvI8FOjkcmFffN5tJA2g'
WHERE id = 2;

-- Create a function to debug doctor data
CREATE OR REPLACE FUNCTION public.debug_doctor_data()
RETURNS TABLE (
  id INTEGER,
  name TEXT,
  specialization TEXT,
  profile_image TEXT,
  schema_source TEXT
) AS $$
BEGIN
  -- Return data from aayush schema
  RETURN QUERY
  SELECT 
    d.id, 
    d.name, 
    d.specialization, 
    d.profile_image,
    'aayush' as schema_source
  FROM aayush.doctors d
  UNION ALL
  -- Return data from public schema view (if it exists)
  SELECT 
    d.id, 
    d.name, 
    d.specialization, 
    d.profile_image,
    'public' as schema_source
  FROM public.doctors d
  ORDER BY id, schema_source;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.debug_doctor_data() TO service_role;

-- Ensure the doctors have the correct available_days
UPDATE aayush.doctors
SET available_days = ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
WHERE id IN (1, 2);