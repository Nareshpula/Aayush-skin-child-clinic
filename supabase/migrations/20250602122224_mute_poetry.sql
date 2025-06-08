/*
  # Restore appointment slots for Dr. G Sridhar (doctor_id = 1)

  1. Changes
    - Generates appointment slots for Dr. G Sridhar (doctor_id = 1)
    - Handles special cases for Sundays (limited hours)
    - Adds verification to check slot counts after generation
*/

-- Generate slots for Dr. G Sridhar for the next 30 days
DO $$
DECLARE
  doctor_record RECORD;
  current_date DATE := CURRENT_DATE;
  end_date DATE := CURRENT_DATE + INTERVAL '30 days';
  current_day TEXT;
  slot_date DATE;
  slot_time TIME;
  p_doctor_id INTEGER := 1; -- Dr. G Sridhar
BEGIN
  -- Get the doctor record
  SELECT * INTO doctor_record FROM aayush.doctors WHERE id = p_doctor_id;
  
  IF doctor_record.id IS NULL THEN
    RAISE NOTICE 'Doctor with ID % not found', p_doctor_id;
    RETURN;
  END IF;
  
  -- Loop through dates for the next 30 days
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
END $$;

-- Verify that both doctors have slots
SELECT * FROM public.verify_doctor_slots();