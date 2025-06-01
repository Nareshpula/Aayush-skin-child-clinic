/*
  # Fix Schema Issues

  1. Changes
    - Fix schema references in RLS policies
    - Add missing schema qualifiers to functions
    - Update triggers to properly reference schema
    - Add missing indexes for performance
*/

-- Fix RLS policies to properly reference schema
DROP POLICY IF EXISTS "Allow public read access to doctors" ON aayush.doctors;
CREATE POLICY "Allow public read access to doctors" 
  ON aayush.doctors 
  FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert doctors" ON aayush.doctors;
CREATE POLICY "Allow authenticated users to insert doctors" 
  ON aayush.doctors 
  FOR INSERT 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read access to appointment_slots" ON aayush.appointment_slots;
CREATE POLICY "Allow public read access to appointment_slots" 
  ON aayush.appointment_slots 
  FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert appointment_slots" ON aayush.appointment_slots;
CREATE POLICY "Allow public insert access to appointment_slots" 
  ON aayush.appointment_slots 
  FOR INSERT 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated users to update appointment_slots" ON aayush.appointment_slots;
CREATE POLICY "Allow public update access to appointment_slots" 
  ON aayush.appointment_slots 
  FOR UPDATE 
  USING (true);

DROP POLICY IF EXISTS "Allow public read access to appointments" ON aayush.appointments;
CREATE POLICY "Allow public read access to appointments" 
  ON aayush.appointments 
  FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Allow public insert access to appointments" ON aayush.appointments;
CREATE POLICY "Allow public insert access to appointments" 
  ON aayush.appointments 
  FOR INSERT 
  WITH CHECK (true);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_appointment_slots_doctor_date ON aayush.appointment_slots(doctor_id, date);
CREATE INDEX IF NOT EXISTS idx_appointments_slot_id ON aayush.appointments(slot_id);
CREATE INDEX IF NOT EXISTS idx_otp_confirmations_phone ON aayush.otp_confirmations(phone_number);

-- Fix function to properly reference schema
DROP FUNCTION IF EXISTS aayush.update_slot_booking_status CASCADE;
CREATE OR REPLACE FUNCTION aayush.update_slot_booking_status()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE aayush.appointment_slots
  SET is_booked = true, updated_at = now()
  WHERE id = NEW.slot_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate trigger
DROP TRIGGER IF EXISTS update_slot_booking_status_trigger ON aayush.appointments;
CREATE TRIGGER update_slot_booking_status_trigger
AFTER INSERT ON aayush.appointments
FOR EACH ROW
EXECUTE FUNCTION aayush.update_slot_booking_status();

-- Fix function to properly reference schema
DROP FUNCTION IF EXISTS aayush.reset_slot_booking_status CASCADE;
CREATE OR REPLACE FUNCTION aayush.reset_slot_booking_status()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE aayush.appointment_slots
  SET is_booked = false, updated_at = now()
  WHERE id = OLD.slot_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Recreate trigger
DROP TRIGGER IF EXISTS reset_slot_booking_status_trigger ON aayush.appointments;
CREATE TRIGGER reset_slot_booking_status_trigger
AFTER DELETE ON aayush.appointments
FOR EACH ROW
EXECUTE FUNCTION aayush.reset_slot_booking_status();

-- Grant necessary permissions to anon and authenticated roles
GRANT USAGE ON SCHEMA aayush TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA aayush TO anon, authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA aayush TO anon, authenticated;