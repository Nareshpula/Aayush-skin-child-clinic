/*
  # Doctor Availability Management

  1. New Tables
    - Creates a new table for doctor exceptions (unavailable time slots)
    - Adds functions to manage doctor availability

  2. Changes
    - Ensures appointment slots check for doctor exceptions
    - Updates get_available_slots to consider doctor exceptions
*/

-- Create the doctor_exceptions table if it doesn't exist
CREATE TABLE IF NOT EXISTS aayush.doctor_exceptions (
  id SERIAL PRIMARY KEY,
  doctor_id INTEGER NOT NULL REFERENCES aayush.doctors(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_time_range CHECK (start_time < end_time)
);

-- Add comment to the table
COMMENT ON TABLE aayush.doctor_exceptions IS 'Stores time periods when doctors are unavailable for appointments';

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_doctor_exceptions_doctor_date ON aayush.doctor_exceptions(doctor_id, date);

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
  doctor_name TEXT;
BEGIN
  -- Validate input
  IF p_doctor_id IS NULL OR p_date IS NULL OR p_start_time IS NULL OR p_end_time IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Missing required fields'
    );
  END IF;
  
  -- Validate time range
  IF p_start_time >= p_end_time THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Start time must be before end time'
    );
  END IF;
  
  -- Get doctor name
  SELECT name INTO doctor_name
  FROM aayush.doctors
  WHERE id = p_doctor_id;
  
  IF doctor_name IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Doctor not found'
    );
  END IF;
  
  -- Insert the exception
  INSERT INTO aayush.doctor_exceptions (
    doctor_id,
    date,
    start_time,
    end_time,
    reason
  )
  VALUES (
    p_doctor_id,
    p_date,
    p_start_time,
    p_end_time,
    p_reason
  )
  RETURNING id INTO exception_id;
  
  -- Return success
  RETURN jsonb_build_object(
    'success', true,
    'exception', jsonb_build_object(
      'id', exception_id,
      'doctor_id', p_doctor_id,
      'doctor_name', doctor_name,
      'date', p_date,
      'start_time', p_start_time,
      'end_time', p_end_time,
      'reason', p_reason
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to remove a doctor exception
CREATE OR REPLACE FUNCTION public.remove_doctor_exception(
  p_exception_id INTEGER
)
RETURNS JSONB AS $$
DECLARE
  exception_exists BOOLEAN;
BEGIN
  -- Check if the exception exists
  SELECT EXISTS (
    SELECT 1
    FROM aayush.doctor_exceptions
    WHERE id = p_exception_id
  ) INTO exception_exists;
  
  IF NOT exception_exists THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Exception not found'
    );
  END IF;
  
  -- Delete the exception
  DELETE FROM aayush.doctor_exceptions
  WHERE id = p_exception_id;
  
  -- Return success
  RETURN jsonb_build_object(
    'success', true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get all doctor exceptions
CREATE OR REPLACE FUNCTION public.get_doctor_exceptions()
RETURNS JSONB AS $$
DECLARE
  exceptions JSONB;
BEGIN
  -- Get all exceptions with doctor names
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', e.id,
      'doctor_id', e.doctor_id,
      'doctor_name', d.name,
      'date', e.date,
      'start_time', e.start_time,
      'end_time', e.end_time,
      'reason', e.reason,
      'created_at', e.created_at
    )
  )
  INTO exceptions
  FROM aayush.doctor_exceptions e
  JOIN aayush.doctors d ON e.doctor_id = d.id
  ORDER BY e.date DESC, e.start_time ASC;
  
  -- Return the exceptions
  RETURN jsonb_build_object(
    'success', true,
    'exceptions', COALESCE(exceptions, '[]'::JSONB)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update the get_available_slots function to check for doctor exceptions
CREATE OR REPLACE FUNCTION public.get_available_slots_v2(
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
  exception_record RECORD;
  slot_exists BOOLEAN;
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

-- Grant execute permissions on the functions
GRANT EXECUTE ON FUNCTION public.add_doctor_exception(INTEGER, DATE, TIME, TIME, TEXT) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.remove_doctor_exception(INTEGER) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_doctor_exceptions() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_available_slots_v2(INTEGER, DATE) TO anon, authenticated, service_role;

-- Add comments to explain the functions
COMMENT ON FUNCTION public.add_doctor_exception(INTEGER, DATE, TIME, TIME, TEXT) IS 'Adds a new doctor exception (unavailable time slot)';
COMMENT ON FUNCTION public.remove_doctor_exception(INTEGER) IS 'Removes a doctor exception by ID';
COMMENT ON FUNCTION public.get_doctor_exceptions() IS 'Gets all doctor exceptions with doctor names';
COMMENT ON FUNCTION public.get_available_slots_v2(INTEGER, DATE) IS 'Gets available time slots for a doctor on a specific date, considering exceptions and same-day restrictions';