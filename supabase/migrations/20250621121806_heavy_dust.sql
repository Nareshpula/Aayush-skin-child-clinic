-- Create or replace the get_available_slots function in the public schema
CREATE OR REPLACE FUNCTION public.get_available_slots(
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
  start_morning_time TIME := '10:00:00'::TIME;
  start_evening_time TIME := '18:00:00'::TIME;
  end_evening_time TIME := '21:00:00'::TIME;
BEGIN
  -- Check if the date is a Sunday
  is_sunday := EXTRACT(DOW FROM p_date) = 0;
  
  -- Set the end time for morning slots based on whether it's Sunday
  IF is_sunday THEN
    end_morning_time := '13:00:00'::TIME;
  ELSE
    end_morning_time := '15:00:00'::TIME;
  END IF;
  
  -- Morning slots (10:00 AM to end_morning_time)
  slot_time := start_morning_time;
  
  -- Process morning slots
  WHILE slot_time < end_morning_time LOOP
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
    WHILE slot_time < end_evening_time LOOP
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
  
  -- Log the number of slots returned for debugging
  RAISE NOTICE 'Generated % slots for doctor % on % (Sunday: %)', 
    (CASE WHEN is_sunday THEN 
      (EXTRACT(EPOCH FROM (end_morning_time - start_morning_time))/900)::INTEGER
     ELSE 
      (EXTRACT(EPOCH FROM (end_morning_time - start_morning_time))/900 + 
       EXTRACT(EPOCH FROM (end_evening_time - start_evening_time))/900)::INTEGER
     END),
    p_doctor_id, 
    p_date, 
    is_sunday;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.get_available_slots(INTEGER, DATE) TO anon, authenticated, service_role;

-- Create a function to debug available slots
CREATE OR REPLACE FUNCTION public.debug_available_slots(
  p_doctor_id INTEGER,
  p_date DATE
)
RETURNS TABLE (
  time_slot TIME,
  is_available BOOLEAN,
  is_sunday BOOLEAN,
  has_exception BOOLEAN,
  has_appointment BOOLEAN,
  slot_type TEXT
) AS $$
DECLARE
  slot_time TIME;
  is_sunday BOOLEAN;
  has_exception BOOLEAN;
  has_appointment BOOLEAN;
  end_morning_time TIME;
  start_morning_time TIME := '10:00:00'::TIME;
  start_evening_time TIME := '18:00:00'::TIME;
  end_evening_time TIME := '21:00:00'::TIME;
BEGIN
  -- Check if the date is a Sunday
  is_sunday := EXTRACT(DOW FROM p_date) = 0;
  
  -- Set the end time for morning slots based on whether it's Sunday
  IF is_sunday THEN
    end_morning_time := '13:00:00'::TIME;
  ELSE
    end_morning_time := '15:00:00'::TIME;
  END IF;
  
  -- Morning slots (10:00 AM to end_morning_time)
  slot_time := start_morning_time;
  
  -- Process morning slots
  WHILE slot_time < end_morning_time LOOP
    -- Check if there's any exception for this doctor at this date and time
    SELECT EXISTS (
      SELECT 1
      FROM aayush.doctor_exceptions
      WHERE doctor_id = p_doctor_id
        AND date = p_date
        AND slot_time >= start_time
        AND slot_time < end_time
    ) INTO has_exception;
    
    -- Check if there's already a booked appointment at this time
    SELECT EXISTS (
      SELECT 1
      FROM aayush.appointment_slots
      WHERE doctor_id = p_doctor_id
        AND date = p_date
        AND time = slot_time
        AND is_booked = true
    ) INTO has_appointment;
    
    -- Return the slot
    time_slot := slot_time;
    is_available := NOT (has_exception OR has_appointment);
    slot_type := 'morning';
    RETURN NEXT;
    
    -- Increment by 15 minutes
    slot_time := slot_time + INTERVAL '15 minutes';
  END LOOP;
  
  -- Evening slots (6:00 PM to 9:00 PM) - only for non-Sundays
  IF NOT is_sunday THEN
    slot_time := start_evening_time;
    WHILE slot_time < end_evening_time LOOP
      -- Check if there's any exception for this doctor at this date and time
      SELECT EXISTS (
        SELECT 1
        FROM aayush.doctor_exceptions
        WHERE doctor_id = p_doctor_id
          AND date = p_date
          AND slot_time >= start_time
          AND slot_time < end_time
      ) INTO has_exception;
      
      -- Check if there's already a booked appointment at this time
      SELECT EXISTS (
        SELECT 1
        FROM aayush.appointment_slots
        WHERE doctor_id = p_doctor_id
          AND date = p_date
          AND time = slot_time
          AND is_booked = true
      ) INTO has_appointment;
      
      -- Return the slot
      time_slot := slot_time;
      is_available := NOT (has_exception OR has_appointment);
      slot_type := 'evening';
      RETURN NEXT;
      
      -- Increment by 15 minutes
      slot_time := slot_time + INTERVAL '15 minutes';
    END LOOP;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.debug_available_slots(INTEGER, DATE, TEXT) TO service_role;