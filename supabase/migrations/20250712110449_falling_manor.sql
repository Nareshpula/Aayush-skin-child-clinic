/*
  # Fix Appointment Booking System

  1. Changes
    - Separates patient ID generation logic from date/slot selection
    - Restores working slot loading mechanism
    - Ensures proper timezone handling for slot availability
    - Maintains auto-incrementing patient ID logic
*/

-- Create an improved version of get_available_slots function
CREATE OR REPLACE FUNCTION public.get_available_slots_v4(
  p_doctor_id INTEGER,
  p_date DATE
)
RETURNS TABLE (
  time_slot TIME,
  is_available BOOLEAN
) AS $$
DECLARE
  slot_time TIME;
  is_sunday BOOLEAN;
  slot_booked BOOLEAN;
  end_morning_time TIME;
  start_morning_time CONSTANT TIME := '10:00:00'::TIME;
  start_evening_time CONSTANT TIME := '18:00:00'::TIME;
  end_evening_time CONSTANT TIME := '21:00:00'::TIME;
  ist_date DATE;
  is_today BOOLEAN;
BEGIN
  -- Convert UTC date to IST date for correct day of week calculation
  ist_date := (p_date::TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::DATE;
  
  -- Check if the date is a Sunday in IST timezone
  is_sunday := EXTRACT(DOW FROM ist_date) = 0;
  
  -- Check if the date is today in IST timezone
  is_today := (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata')::DATE = ist_date;
  
  -- If it's today, return no available slots
  IF is_today THEN
    RETURN;
  END IF;
  
  -- Set the end time for morning slots based on whether it's Sunday
  IF is_sunday THEN
    end_morning_time := '13:00:00'::TIME;
  ELSE
    end_morning_time := '15:00:00'::TIME;
  END IF;
  
  -- Morning slots (10:00 AM to end_morning_time)
  slot_time := start_morning_time;
  
  -- Process morning slots - INCLUDE the end time (<=)
  WHILE slot_time <= end_morning_time LOOP
    -- Check if there's any exception for this doctor at this date and time
    SELECT EXISTS (
      SELECT 1
      FROM aayush.doctor_exceptions
      WHERE doctor_id = p_doctor_id
        AND date = p_date
        AND slot_time >= start_time
        AND slot_time < end_time
    ) INTO slot_booked;
    
    -- Check if there's already a booked appointment at this time
    IF NOT slot_booked THEN
      SELECT EXISTS (
        SELECT 1
        FROM aayush.appointment_slots
        WHERE doctor_id = p_doctor_id
          AND date = p_date
          AND time = slot_time
          AND is_booked = true
      ) INTO slot_booked;
    END IF;
    
    -- Return the slot
    time_slot := slot_time;
    is_available := NOT slot_booked;
    RETURN NEXT;
    
    -- Increment by 15 minutes
    slot_time := slot_time + INTERVAL '15 minutes';
  END LOOP;
  
  -- Evening slots (6:00 PM to 9:00 PM) - only for non-Sundays
  IF NOT is_sunday THEN
    slot_time := start_evening_time;
    -- Process evening slots - INCLUDE the end time (<=)
    WHILE slot_time <= end_evening_time LOOP
      -- Check if there's any exception for this doctor at this date and time
      SELECT EXISTS (
        SELECT 1
        FROM aayush.doctor_exceptions
        WHERE doctor_id = p_doctor_id
          AND date = p_date
          AND slot_time >= start_time
          AND slot_time < end_time
      ) INTO slot_booked;
      
      -- Check if there's already a booked appointment at this time
      IF NOT slot_booked THEN
        SELECT EXISTS (
          SELECT 1
          FROM aayush.appointment_slots
          WHERE doctor_id = p_doctor_id
            AND date = p_date
            AND time = slot_time
            AND is_booked = true
        ) INTO slot_booked;
      END IF;
      
      -- Return the slot
      time_slot := slot_time;
      is_available := NOT slot_booked;
      RETURN NEXT;
      
      -- Increment by 15 minutes
      slot_time := slot_time + INTERVAL '15 minutes';
    END LOOP;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to book an appointment with separated concerns
CREATE OR REPLACE FUNCTION public.book_appointment_v6(
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
  patient_id TEXT;
  date_validation JSONB;
  debug_info JSONB;
BEGIN
  -- Validate appointment date
  date_validation := public.validate_appointment_date(p_date);
  
  -- If date is invalid, return error
  IF NOT (date_validation->>'valid')::BOOLEAN THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', date_validation->>'error'
    );
  END IF;

  -- Generate debug info for troubleshooting
  debug_info := jsonb_build_object(
    'doctor_id', p_doctor_id,
    'patient_name', p_patient_name,
    'patient_phone', p_patient_phone,
    'date', p_date,
    'time', p_time,
    'email', p_email,
    'age', p_age,
    'gender', p_gender
  );

  -- Check if the slot exists and is available
  SELECT id INTO slot_id
  FROM aayush.appointment_slots
  WHERE doctor_id = p_doctor_id
    AND date = p_date
    AND time = p_time
    AND is_booked = false;
  
  -- If slot doesn't exist, create it
  IF slot_id IS NULL THEN
    INSERT INTO aayush.appointment_slots (doctor_id, date, time, is_booked)
    VALUES (p_doctor_id, p_date, p_time, true)
    RETURNING id INTO slot_id;
    
    debug_info := debug_info || jsonb_build_object('slot_created', true, 'slot_id', slot_id);
  ELSE
    -- Update the slot to mark it as booked
    UPDATE aayush.appointment_slots
    SET is_booked = true
    WHERE id = slot_id;
    
    debug_info := debug_info || jsonb_build_object('slot_updated', true, 'slot_id', slot_id);
  END IF;
  
  -- Generate patient ID using the fixed function
  patient_id := aayush.get_next_patient_id();
  
  debug_info := debug_info || jsonb_build_object(
    'patient_id_generation', jsonb_build_object(
      'generated_patient_id', patient_id
    )
  );
  
  -- Insert the appointment
  INSERT INTO aayush.appointments (
    slot_id,
    patient_name,
    phone_number,
    email,
    age,
    gender,
    reason,
    patient_id
  )
  VALUES (
    slot_id,
    p_patient_name,
    p_patient_phone,
    p_email,
    p_age,
    p_gender,
    p_reason,
    patient_id
  )
  RETURNING id INTO appointment_id;
  
  debug_info := debug_info || jsonb_build_object('appointment_created', true, 'appointment_id', appointment_id);
  
  -- Return the appointment details including patient_id
  RETURN public.get_appointment_details(appointment_id) || jsonb_build_object('debug', debug_info);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the functions
GRANT EXECUTE ON FUNCTION public.get_available_slots_v4(INTEGER, DATE) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.book_appointment_v6(INTEGER, TEXT, TEXT, DATE, TIME, TEXT, INTEGER, TEXT, TEXT) TO anon, authenticated, service_role;

-- Add comments to explain the functions
COMMENT ON FUNCTION public.get_available_slots_v4(INTEGER, DATE) IS 'Gets available time slots for a doctor on a specific date, with improved timezone handling';
COMMENT ON FUNCTION public.book_appointment_v6(INTEGER, TEXT, TEXT, DATE, TIME, TEXT, INTEGER, TEXT, TEXT) IS 'Books an appointment with separated concerns for slot selection and patient ID generation';