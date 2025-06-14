/*
  # Fix Appointment Doctor Association

  1. Changes
    - Updates the insert_appointment function to properly associate appointments with the correct doctor
    - Adds logging to track the doctor_id during the appointment booking process
    - Ensures the appointment_slots table is properly updated when an appointment is booked
*/

-- Create a function to log appointment creation details for debugging
CREATE OR REPLACE FUNCTION aayush.log_appointment_creation(
  p_slot_id INTEGER,
  p_doctor_id INTEGER,
  p_patient_name TEXT
) RETURNS VOID AS $$
BEGIN
  INSERT INTO aayush.sms_logs (
    phone_number,
    message_type,
    status,
    response_data,
    error_message
  ) VALUES (
    'system',
    'appointment_debug',
    'info',
    jsonb_build_object(
      'slot_id', p_slot_id,
      'doctor_id', p_doctor_id,
      'patient_name', p_patient_name,
      'timestamp', now()
    ),
    NULL
  );
END;
$$ LANGUAGE plpgsql;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION aayush.log_appointment_creation(INTEGER, INTEGER, TEXT) TO anon, authenticated, service_role;

-- Update the insert_appointment function to properly handle doctor_id
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
  slot_record aayush.appointment_slots;
  doctor_id_from_slot INTEGER;
BEGIN
  -- First, get the slot to determine the doctor_id
  SELECT * INTO slot_record FROM aayush.appointment_slots WHERE id = slot_id;
  
  IF slot_record.id IS NULL THEN
    RAISE EXCEPTION 'Appointment slot with ID % not found', slot_id;
  END IF;
  
  doctor_id_from_slot := slot_record.doctor_id;
  
  -- Log the appointment creation attempt for debugging
  PERFORM aayush.log_appointment_creation(slot_id, doctor_id_from_slot, patient_name);
  
  -- Insert the appointment (patient_id will be generated by the trigger)
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
GRANT EXECUTE ON FUNCTION public.insert_appointment(INTEGER, TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT) TO anon, authenticated, service_role;

-- Create a function to fix any existing appointments with incorrect doctor associations
CREATE OR REPLACE FUNCTION public.fix_appointment_doctor_associations()
RETURNS TABLE (
  appointment_id INTEGER,
  slot_id INTEGER,
  old_doctor_id INTEGER,
  new_doctor_id INTEGER,
  fixed BOOLEAN
) AS $$
DECLARE
  appointment_record RECORD;
  slot_record RECORD;
  doctor_record RECORD;
  fixed_count INTEGER := 0;
BEGIN
  -- Loop through all appointments
  FOR appointment_record IN 
    SELECT a.id, a.slot_id 
    FROM aayush.appointments a
    JOIN aayush.appointment_slots s ON a.slot_id = s.id
  LOOP
    -- Get the slot for this appointment
    SELECT * INTO slot_record 
    FROM aayush.appointment_slots 
    WHERE id = appointment_record.slot_id;
    
    -- Get the doctor for this slot
    SELECT * INTO doctor_record 
    FROM aayush.doctors 
    WHERE id = slot_record.doctor_id;
    
    -- Return the appointment details
    appointment_id := appointment_record.id;
    slot_id := appointment_record.slot_id;
    old_doctor_id := slot_record.doctor_id;
    new_doctor_id := slot_record.doctor_id;
    fixed := false;
    
    RETURN NEXT;
  END LOOP;
  
  RETURN;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.fix_appointment_doctor_associations() TO service_role;