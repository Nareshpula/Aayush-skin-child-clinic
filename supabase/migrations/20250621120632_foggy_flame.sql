/*
  # Fix Appointment Slots Display

  1. Changes
    - Updates the get_available_slots function to return proper time slots
    - Ensures 15-minute intervals for both morning and evening slots
    - Handles Sunday slots correctly (10:00 AM to 1:00 PM only)
    - Improves error handling and logging
*/

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
BEGIN
  -- Check if the date is a Sunday
  is_sunday := EXTRACT(DOW FROM p_date) = 0;
  
  -- Morning slots (10:00 AM to 3:00 PM, or 1:00 PM for Sundays)
  slot_time := '10:00:00'::TIME;
  
  -- For Sundays, only check until 1:00 PM
  WHILE slot_time < (is_sunday ? '13:00:00'::TIME : '15:00:00'::TIME) LOOP
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
    slot_time := '18:00:00'::TIME;
    WHILE slot_time < '21:00:00'::TIME LOOP
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
  has_appointment BOOLEAN
) AS $$
DECLARE
  slot_time TIME;
  is_sunday BOOLEAN;
  has_exception BOOLEAN;
  has_appointment BOOLEAN;
BEGIN
  -- Check if the date is a Sunday
  is_sunday := EXTRACT(DOW FROM p_date) = 0;
  
  -- Morning slots (10:00 AM to 3:00 PM, or 1:00 PM for Sundays)
  slot_time := '10:00:00'::TIME;
  
  -- For Sundays, only check until 1:00 PM
  WHILE slot_time < (is_sunday ? '13:00:00'::TIME : '15:00:00'::TIME) LOOP
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
    RETURN NEXT;
    
    -- Increment by 15 minutes
    slot_time := slot_time + INTERVAL '15 minutes';
  END LOOP;
  
  -- Evening slots (6:00 PM to 9:00 PM) - only for non-Sundays
  IF NOT is_sunday THEN
    slot_time := '18:00:00'::TIME;
    WHILE slot_time < '21:00:00'::TIME LOOP
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
      RETURN NEXT;
      
      -- Increment by 15 minutes
      slot_time := slot_time + INTERVAL '15 minutes';
    END LOOP;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.debug_available_slots(INTEGER, DATE) TO service_role;