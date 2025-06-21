/*
  # Fix Doctor Data in Aayush Schema

  1. Changes
    - Ensures the aayush.doctors table has the correct doctor data
    - Updates existing doctor records with correct information
    - Adds missing fields if needed
*/

-- First, check if the doctors table exists in aayush schema
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'aayush' 
    AND table_name = 'doctors'
  ) THEN
    RAISE EXCEPTION 'The aayush.doctors table does not exist. Please run the previous migrations first.';
  END IF;
END $$;

-- Update or insert Dr. G Sridhar
INSERT INTO aayush.doctors (id, name, specialization, profile_image, available_days)
VALUES (
  1, 
  'Dr. G Sridhar', 
  'Pediatrics', 
  'https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Doctors-Image/Sridhar-Image.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNmRjYTIxMy05OWY0LTQyNmQtOWNjNC0yZjAwYjJhNzQ0MWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRG9jdG9ycy1JbWFnZS9TcmlkaGFyLUltYWdlLmpwZyIsImlhdCI6MTc0OTM0OTI2OCwiZXhwIjoxOTA3MDI5MjY4fQ.eJ32umItgxbVzIBqKE7q6aFiCXpbuYVxVG5ExE7neCk', 
  ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  specialization = EXCLUDED.specialization,
  profile_image = EXCLUDED.profile_image,
  available_days = EXCLUDED.available_days;

-- Update or insert Dr. Himabindu Sridhar
INSERT INTO aayush.doctors (id, name, specialization, profile_image, available_days)
VALUES (
  2, 
  'Dr. Himabindu Sridhar', 
  'Dermatology', 
  'https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/Header-Bar-Images/Doctors-Image/Dr-Himabindu-image.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNmRjYTIxMy05OWY0LTQyNmQtOWNjNC0yZjAwYjJhNzQ0MWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvSGVhZGVyLUJhci1JbWFnZXMvRG9jdG9ycy1JbWFnZS9Eci1IaW1hYmluZHUtaW1hZ2UuanBnIiwiaWF0IjoxNzQ5ODg5NzcwLCJleHAiOjE5MDc1Njk3NzB9.6gJZWdZJ6PvX_gtxzcOqYcdQvI8FOjkcmFffN5tJA2g', 
  ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  specialization = EXCLUDED.specialization,
  profile_image = EXCLUDED.profile_image,
  available_days = EXCLUDED.available_days;

-- Delete any other doctors that might exist in the table
DELETE FROM aayush.doctors WHERE id NOT IN (1, 2);

-- Create a function to verify doctor data
CREATE OR REPLACE FUNCTION public.verify_doctor_data()
RETURNS TABLE (
  id INTEGER,
  name TEXT,
  specialization TEXT,
  available_days TEXT[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT d.id, d.name, d.specialization, d.available_days
  FROM aayush.doctors d
  ORDER BY d.id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.verify_doctor_data() TO anon, authenticated, service_role;