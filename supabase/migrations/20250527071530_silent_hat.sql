/*
  # Create aayush schema and appointment system tables

  1. New Schema
    - Creates a new schema named `aayush` for Aayush Child & Skin Hospital

  2. New Tables
    - `doctors` - Stores doctor information including name, specialization, profile image, available days
    - `appointment_slots` - Stores available appointment slots with doctor_id, date, time, booking status
    - `appointments` - Stores appointment details with slot_id, patient information, and reason

  3. Security
    - Enables RLS on all tables
    - Creates policies for secure access to appointment data
*/

-- Create the aayush schema
CREATE SCHEMA IF NOT EXISTS aayush;

-- Create doctors table
CREATE TABLE IF NOT EXISTS aayush.doctors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  profile_image TEXT,
  available_days TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create appointment_slots table
CREATE TABLE IF NOT EXISTS aayush.appointment_slots (
  id SERIAL PRIMARY KEY,
  doctor_id INTEGER NOT NULL REFERENCES aayush.doctors(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TIME NOT NULL,
  is_booked BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(doctor_id, date, time)
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS aayush.appointments (
  id SERIAL PRIMARY KEY,
  slot_id INTEGER NOT NULL REFERENCES aayush.appointment_slots(id) ON DELETE CASCADE,
  patient_name TEXT NOT NULL,
  email TEXT,
  phone_number TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE aayush.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE aayush.appointment_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE aayush.appointments ENABLE ROW LEVEL SECURITY;

-- Create policies for doctors table
CREATE POLICY "Allow public read access to doctors" 
  ON aayush.doctors 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow authenticated users to insert doctors" 
  ON aayush.doctors 
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Create policies for appointment_slots table
CREATE POLICY "Allow public read access to appointment_slots" 
  ON aayush.appointment_slots 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow authenticated users to insert appointment_slots" 
  ON aayush.appointment_slots 
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update appointment_slots" 
  ON aayush.appointment_slots 
  FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- Create policies for appointments table
CREATE POLICY "Allow public read access to appointments" 
  ON aayush.appointments 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert access to appointments" 
  ON aayush.appointments 
  FOR INSERT 
  WITH CHECK (true);

-- Create function to update appointment_slots when an appointment is created
CREATE OR REPLACE FUNCTION aayush.update_slot_booking_status()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE aayush.appointment_slots
  SET is_booked = true, updated_at = now()
  WHERE id = NEW.slot_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update appointment_slots when an appointment is created
CREATE TRIGGER update_slot_booking_status_trigger
AFTER INSERT ON aayush.appointments
FOR EACH ROW
EXECUTE FUNCTION aayush.update_slot_booking_status();

-- Create function to update appointment_slots when an appointment is deleted
CREATE OR REPLACE FUNCTION aayush.reset_slot_booking_status()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE aayush.appointment_slots
  SET is_booked = false, updated_at = now()
  WHERE id = OLD.slot_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update appointment_slots when an appointment is deleted
CREATE TRIGGER reset_slot_booking_status_trigger
AFTER DELETE ON aayush.appointments
FOR EACH ROW
EXECUTE FUNCTION aayush.reset_slot_booking_status();

-- Insert sample doctors
INSERT INTO aayush.doctors (name, specialization, profile_image, available_days)
VALUES 
  ('Dr. G Sridhar', 'Pediatrics', 'https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/doctors/Dr-Dinesh-Kumar-Chirla.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvZG9jdG9ycy9Eci1EaW5lc2gtS3VtYXItQ2hpcmxhLmpwZyIsImlhdCI6MTc0MjY2MjE5MCwiZXhwIjoxOTAwMzQyMTkwfQ.YXqBF9_HYVilPmvFWGXPX_7mUh-kHQqp_kK_qJ_xQhE', ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']),
  ('Dr. Himabindu Sridhar', 'Dermatology', 'https://voaxktqgbljtsattacbn.supabase.co/storage/v1/object/sign/aayush-hospital/doctors/Dr-Himabindhu.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYXl1c2gtaG9zcGl0YWwvZG9jdG9ycy9Eci1IaW1hYmluZGh1LmpwZyIsImlhdCI6MTc0MjY2MjE5MCwiZXhwIjoxOTAwMzQyMTkwfQ.YXqBF9_HYVilPmvFWGXPX_7mUh-kHQqp_kK_qJ_xQhE', ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);