/*
  # Duplicate appointment slots for all doctors

  1. Changes
    - Duplicates existing appointment slots for doctor_id = 1 to doctor_id = 2
    - Ensures each doctor has their own set of available slots
    - Preserves existing date/time data
    - Avoids duplicate ID conflicts by using new sequence values
  
  2. Security
    - Maintains existing RLS policies
*/

-- First, check if there are any slots for doctor_id = 2
DO $$
DECLARE
  doctor2_slots_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO doctor2_slots_count FROM aayush.appointment_slots WHERE doctor_id = 2;
  
  -- Only duplicate slots if doctor_id = 2 has no slots
  IF doctor2_slots_count = 0 THEN
    -- Insert slots for doctor_id = 2 by duplicating slots from doctor_id = 1
    INSERT INTO aayush.appointment_slots (doctor_id, date, time, is_booked)
    SELECT 
      2 as doctor_id,  -- Set doctor_id to 2 (Dr. Himabindu Sridhar)
      date,
      time,
      false as is_booked  -- Set all new slots as available
    FROM aayush.appointment_slots
    WHERE doctor_id = 1
    ON CONFLICT (doctor_id, date, time) DO NOTHING;
  END IF;
END $$;

-- Create a function to generate appointment slots for a specific doctor
CREATE OR REPLACE FUNCTION aayush.generate_appointment_slots_for_doctor(
  p_doctor_id INTEGER,
  p_days_ahead INTEGER DEFAULT 30
)
RETURNS void AS $$
DECLARE
  doctor_record RECORD;
  current_date DATE := CURRENT_DATE;
  end_date DATE := CURRENT_DATE + p_days_ahead;
  current_day TEXT;
  slot_date DATE;
  slot_time TIME;
BEGIN
  -- Get the doctor record
  SELECT * INTO doctor_record FROM aayush.doctors WHERE id = p_doctor_id;
  
  IF doctor_record.id IS NULL THEN
    RAISE EXCEPTION 'Doctor with ID % not found', p_doctor_id;
  END IF;
  
  -- Loop through dates for the specified number of days ahead
  slot_date := current_date;
  WHILE slot_date <= end_date LOOP
    -- Get day of week
    current_day := to_char(slot_date, 'Day');
    current_day := trim(current_day);
    
    -- Check if doctor is available on this day
    IF current_day = ANY(doctor_record.available_days) THEN
      -- For Sundays, only create morning slots (9:30 AM to 1:00 PM)
      IF to_char(slot_date, 'D') = '1' THEN -- Sunday is 1 in PostgreSQL's to_char with 'D' format
        -- Morning slots (9:30 AM to 1:00 PM)
        slot_time := '09:30:00'::TIME;
        WHILE slot_time <= '13:00:00'::TIME LOOP
          -- Insert slot
          INSERT INTO aayush.appointment_slots (doctor_id, date, time, is_booked)
          VALUES (p_doctor_id, slot_date, slot_time, false)
          ON CONFLICT (doctor_id, date, time) DO NOTHING;
          
          -- Increment by 15 minutes
          slot_time := slot_time + INTERVAL '15 minutes';
        END LOOP;
      ELSE
        -- Regular day - Morning slots (9:30 AM to 4:00 PM)
        slot_time := '09:30:00'::TIME;
        WHILE slot_time <= '16:00:00'::TIME LOOP
          -- Insert slot
          INSERT INTO aayush.appointment_slots (doctor_id, date, time, is_booked)
          VALUES (p_doctor_id, slot_date, slot_time, false)
          ON CONFLICT (doctor_id, date, time) DO NOTHING;
          
          -- Increment by 15 minutes
          slot_time := slot_time + INTERVAL '15 minutes';
        END LOOP;
        
        -- Evening slots (6:00 PM to 9:00 PM)
        slot_time := '18:00:00'::TIME;
        WHILE slot_time <= '21:00:00'::TIME LOOP
          -- Insert slot
          INSERT INTO aayush.appointment_slots (doctor_id, date, time, is_booked)
          VALUES (p_doctor_id, slot_date, slot_time, false)
          ON CONFLICT (doctor_id, date, time) DO NOTHING;
          
          -- Increment by 15 minutes
          slot_time := slot_time + INTERVAL '15 minutes';
        END LOOP;
      END IF;
    END IF;
    
    -- Move to next day
    slot_date := slot_date + INTERVAL '1 day';
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION aayush.generate_appointment_slots_for_doctor(INTEGER, INTEGER) TO service_role;

-- Generate slots for both doctors for the next 30 days
SELECT aayush.generate_appointment_slots_for_doctor(1, 30);
SELECT aayush.generate_appointment_slots_for_doctor(2, 30);

-- Create a function to check if a doctor has slots for a specific date
CREATE OR REPLACE FUNCTION public.check_doctor_slots(
  p_doctor_id INTEGER,
  p_date DATE
)
RETURNS TABLE (
  slot_count INTEGER,
  morning_slots INTEGER,
  evening_slots INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::INTEGER as slot_count,
    COUNT(*) FILTER (WHERE time < '12:00:00'::TIME)::INTEGER as morning_slots,
    COUNT(*) FILTER (WHERE time >= '18:00:00'::TIME)::INTEGER as evening_slots
  FROM aayush.appointment_slots
  WHERE doctor_id = p_doctor_id AND date = p_date;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.check_doctor_slots(INTEGER, DATE) TO anon, authenticated, service_role;