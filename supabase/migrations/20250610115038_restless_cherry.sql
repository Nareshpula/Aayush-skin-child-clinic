/*
  # Doctor Appointment System

  1. New Tables
    - `doctor_exceptions` - Stores time ranges when doctors are unavailable
      - `id` (serial, primary key)
      - `doctor_id` (integer, references doctors)
      - `date` (date, not null)
      - `start_time` (time, not null)
      - `end_time` (time, not null)
      - `reason` (text)
      - `created_at` (timestamptz, default now())
  
  2. New Functions
    - `book_appointment` - Books an appointment with a doctor
      - Checks for doctor availability
      - Checks for existing appointments
      - Creates a new appointment if available
  
  3. Security
    - Enable RLS on doctor_exceptions table
    - Add policies for secure access
*/

-- Create doctor_exceptions table
CREATE TABLE IF NOT EXISTS aayush.doctor_exceptions (
  id SERIAL PRIMARY KEY,
  doctor_id INTEGER NOT NULL REFERENCES aayush.doctors(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  CHECK (start_time < end_time)
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_doctor_exceptions_doctor_date ON aayush.doctor_exceptions(doctor_id, date);

-- Enable RLS on doctor_exceptions table
ALTER TABLE aayush.doctor_exceptions ENABLE ROW LEVEL SECURITY;

-- Create policies for doctor_exceptions table
CREATE POLICY "Allow public read access to doctor_exceptions" 
  ON aayush.doctor_exceptions 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow authenticated users to insert doctor_exceptions" 
  ON aayush.doctor_exceptions 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update doctor_exceptions" 
  ON aayush.doctor_exceptions 
  FOR UPDATE 
  USING (true);

-- Create a view in public schema for doctor_exceptions
CREATE OR REPLACE VIEW public.doctor_exceptions AS
  SELECT * FROM aayush.doctor_exceptions;

-- Grant access to the view
GRANT SELECT ON public.doctor_exceptions TO anon, authenticated, service_role;

-- Function to check if a doctor is available at a specific time
CREATE OR REPLACE FUNCTION aayush.is_doctor_available(
  p_doctor_id INTEGER,
  p_date DATE,
  p_time TIME
)
RETURNS BOOLEAN AS $$
DECLARE
  is_available BOOLEAN := true;
  exception_record RECORD;
BEGIN
  -- Check if there's any exception for this doctor at this date and time
  SELECT * INTO exception_record
  FROM aayush.doctor_exceptions
  WHERE doctor_id = p_doctor_id
    AND date = p_date
    AND p_time >= start_time
    AND p_time < end_time;
  
  -- If an exception is found, the doctor is not available
  IF exception_record.id IS NOT NULL THEN
    is_available := false;
  END IF;
  
  -- Check if there's already an appointment at this time
  IF is_available THEN
    -- Check if there's an existing appointment for this doctor at this time
    -- We'll consider a 30-minute slot for each appointment
    IF EXISTS (
      SELECT 1
      FROM aayush.appointments a
      JOIN aayush.appointment_slots s ON a.slot_id = s.id
      WHERE s.doctor_id = p_doctor_id
        AND s.date = p_date
        AND s.time = p_time
    ) THEN
      is_available := false;
    END IF;
  END IF;
  
  RETURN is_available;
END;
$$ LANGUAGE plpgsql;

-- Function to convert IST to UTC
CREATE OR REPLACE FUNCTION aayush.ist_to_utc(
  p_date DATE,
  p_time TIME
)
RETURNS TIMESTAMP AS $$
DECLARE
  ist_timestamp TIMESTAMP;
  utc_timestamp TIMESTAMP;
BEGIN
  -- Create a timestamp from the date and time
  ist_timestamp := p_date + p_time;
  
  -- Convert IST to UTC (IST is UTC+5:30)
  utc_timestamp := ist_timestamp - INTERVAL '5 hours 30 minutes';
  
  RETURN utc_timestamp;
END;
$$ LANGUAGE plpgsql;

-- Function to convert UTC to IST
CREATE OR REPLACE FUNCTION aayush.utc_to_ist(
  p_timestamp TIMESTAMP
)
RETURNS TIMESTAMP AS $$
BEGIN
  -- Convert UTC to IST (IST is UTC+5:30)
  RETURN p_timestamp + INTERVAL '5 hours 30 minutes';
END;
$$ LANGUAGE plpgsql;

-- Function to book an appointment
CREATE OR REPLACE FUNCTION public.book_appointment(
  p_doctor_id INTEGER,
  p_patient_name TEXT,
  p_patient_phone TEXT,
  p_date DATE,
  p_time TIME,
  p_email TEXT DEFAULT NULL,
  p_age INTEGER DEFAULT NULL,
  p_gender TEXT DEFAULT NULL,
  p_reason TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  slot_id INTEGER;
  appointment_id INTEGER;
  is_available BOOLEAN;
  patient_id TEXT;
BEGIN
  -- Check if the doctor is available at this time
  is_available := aayush.is_doctor_available(p_doctor_id, p_date, p_time);
  
  IF NOT is_available THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Doctor is not available at this time'
    );
  END IF;
  
  -- Check if a slot exists for this doctor, date, and time
  SELECT id INTO slot_id
  FROM aayush.appointment_slots
  WHERE doctor_id = p_doctor_id
    AND date = p_date
    AND time = p_time;
  
  -- If no slot exists, create one
  IF slot_id IS NULL THEN
    INSERT INTO aayush.appointment_slots (doctor_id, date, time, is_booked)
    VALUES (p_doctor_id, p_date, p_time, true)
    RETURNING id INTO slot_id;
  ELSE
    -- Update the slot to mark it as booked
    UPDATE aayush.appointment_slots
    SET is_booked = true, updated_at = now()
    WHERE id = slot_id;
  END IF;
  
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
    p_patient_name,
    p_email,
    p_patient_phone,
    COALESCE(p_age, 0),
    COALESCE(p_gender, 'Not specified'),
    p_reason
  )
  RETURNING id, patient_id INTO appointment_id, patient_id;
  
  -- Return success response
  RETURN jsonb_build_object(
    'success', true,
    'appointment_id', appointment_id,
    'patient_id', patient_id,
    'doctor_id', p_doctor_id,
    'date', p_date,
    'time', p_time,
    'slot_id', slot_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the functions
GRANT EXECUTE ON FUNCTION aayush.is_doctor_available(INTEGER, DATE, TIME) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION aayush.ist_to_utc(DATE, TIME) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION aayush.utc_to_ist(TIMESTAMP) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.book_appointment(INTEGER, TEXT, TEXT, DATE, TIME, TEXT, INTEGER, TEXT, TEXT) TO anon, authenticated, service_role;

-- Insert some sample doctor exceptions
INSERT INTO aayush.doctor_exceptions (doctor_id, date, start_time, end_time, reason)
VALUES 
  (1, CURRENT_DATE + INTERVAL '1 day', '12:00:00', '14:00:00', 'Lunch break'),
  (1, CURRENT_DATE + INTERVAL '2 days', '10:00:00', '12:00:00', 'Hospital meeting'),
  (2, CURRENT_DATE + INTERVAL '1 day', '13:00:00', '15:00:00', 'Lunch break'),
  (2, CURRENT_DATE + INTERVAL '3 days', '18:00:00', '20:00:00', 'Personal appointment');

-- Create a function to get available slots for a doctor on a specific date
CREATE OR REPLACE FUNCTION public.get_available_slots(
  p_doctor_id INTEGER,
  p_date DATE
)
RETURNS TABLE (
  time TIME,
  is_available BOOLEAN
) AS $$
DECLARE
  slot_time TIME;
  is_sunday BOOLEAN;
BEGIN
  -- Check if the date is a Sunday
  is_sunday := EXTRACT(DOW FROM p_date) = 0;
  
  -- Morning slots
  slot_time := '10:00:00'::TIME;
  
  -- For Sundays, only check until 3 PM
  IF is_sunday THEN
    WHILE slot_time < '15:00:00'::TIME LOOP
      time := slot_time;
      is_available := aayush.is_doctor_available(p_doctor_id, p_date, slot_time);
      RETURN NEXT;
      
      -- Increment by 30 minutes
      slot_time := slot_time + INTERVAL '30 minutes';
    END LOOP;
  ELSE
    -- Regular day - Morning slots (10 AM to 3 PM)
    WHILE slot_time < '15:00:00'::TIME LOOP
      time := slot_time;
      is_available := aayush.is_doctor_available(p_doctor_id, p_date, slot_time);
      RETURN NEXT;
      
      -- Increment by 30 minutes
      slot_time := slot_time + INTERVAL '30 minutes';
    END LOOP;
    
    -- Evening slots (6 PM to 9 PM)
    slot_time := '18:00:00'::TIME;
    WHILE slot_time < '21:00:00'::TIME LOOP
      time := slot_time;
      is_available := aayush.is_doctor_available(p_doctor_id, p_date, slot_time);
      RETURN NEXT;
      
      -- Increment by 30 minutes
      slot_time := slot_time + INTERVAL '30 minutes';
    END LOOP;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.get_available_slots(INTEGER, DATE) TO anon, authenticated, service_role;

-- Create a function to get doctor exceptions
CREATE OR REPLACE FUNCTION public.get_doctor_exceptions(
  p_doctor_id INTEGER DEFAULT NULL,
  p_start_date DATE DEFAULT CURRENT_DATE,
  p_end_date DATE DEFAULT CURRENT_DATE + INTERVAL '30 days'
)
RETURNS TABLE (
  id INTEGER,
  doctor_id INTEGER,
  doctor_name TEXT,
  date DATE,
  start_time TIME,
  end_time TIME,
  reason TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    e.id,
    e.doctor_id,
    d.name as doctor_name,
    e.date,
    e.start_time,
    e.end_time,
    e.reason
  FROM aayush.doctor_exceptions e
  JOIN aayush.doctors d ON e.doctor_id = d.id
  WHERE (p_doctor_id IS NULL OR e.doctor_id = p_doctor_id)
    AND e.date >= p_start_date
    AND e.date <= p_end_date
  ORDER BY e.date, e.start_time;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.get_doctor_exceptions(INTEGER, DATE, DATE) TO anon, authenticated, service_role;

-- Create a function to add a doctor exception
CREATE OR REPLACE FUNCTION public.add_doctor_exception(
  p_doctor_id INTEGER,
  p_date DATE,
  p_start_time TIME,
  p_end_time TIME,
  p_reason TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  exception_id INTEGER;
BEGIN
  -- Validate input
  IF p_start_time >= p_end_time THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Start time must be before end time'
    );
  END IF;
  
  -- Insert the exception
  INSERT INTO aayush.doctor_exceptions (
    doctor_id,
    date,
    start_time,
    end_time,
    reason
  ) VALUES (
    p_doctor_id,
    p_date,
    p_start_time,
    p_end_time,
    p_reason
  )
  RETURNING id INTO exception_id;
  
  -- Return success response
  RETURN jsonb_build_object(
    'success', true,
    'exception_id', exception_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.add_doctor_exception(INTEGER, DATE, TIME, TIME, TEXT) TO anon, authenticated, service_role;

-- Create a function to remove a doctor exception
CREATE OR REPLACE FUNCTION public.remove_doctor_exception(
  p_exception_id INTEGER
)
RETURNS JSONB AS $$
DECLARE
  exception_record aayush.doctor_exceptions;
BEGIN
  -- Get the exception record
  SELECT * INTO exception_record
  FROM aayush.doctor_exceptions
  WHERE id = p_exception_id;
  
  -- Check if the exception exists
  IF exception_record.id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Exception not found'
    );
  END IF;
  
  -- Delete the exception
  DELETE FROM aayush.doctor_exceptions
  WHERE id = p_exception_id;
  
  -- Return success response
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Exception removed successfully'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.remove_doctor_exception(INTEGER) TO anon, authenticated, service_role;