/*
  # Insert appointment slots for Dr. Himabindu Sridhar

  1. Changes
    - Inserts appointment slots for doctor_id = 2 (Dr. Himabindu Sridhar)
    - Ensures slots are created for the next 30 days
    - Handles Sunday slots correctly (9:30 AM to 1:00 PM only)
    - Avoids conflicts with existing slots
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

-- Generate slots for Dr. Himabindu Sridhar for the next 30 days
DO $$
DECLARE
  doctor_record RECORD;
  current_date DATE := CURRENT_DATE;
  end_date DATE := CURRENT_DATE + INTERVAL '30 days';
  current_day TEXT;
  slot_date DATE;
  slot_time TIME;
  doctor_id INTEGER := 2; -- Dr. Himabindu Sridhar
BEGIN
  -- Get the doctor record
  SELECT * INTO doctor_record FROM aayush.doctors WHERE id = doctor_id;
  
  IF doctor_record.id IS NULL THEN
    RAISE NOTICE 'Doctor with ID % not found', doctor_id;
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
          VALUES (doctor_id, slot_date, slot_time, false)
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
          VALUES (doctor_id, slot_date, slot_time, false)
          ON CONFLICT (doctor_id, date, time) DO NOTHING;
          
          -- Increment by 15 minutes
          slot_time := slot_time + INTERVAL '15 minutes';
        END LOOP;
        
        -- Evening slots (6:00 PM to 9:00 PM)
        slot_time := '18:00:00'::TIME;
        WHILE slot_time <= '21:00:00'::TIME LOOP
          -- Insert slot
          INSERT INTO aayush.appointment_slots (doctor_id, date, time, is_booked)
          VALUES (doctor_id, slot_date, slot_time, false)
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

-- Create a function to verify slot creation
CREATE OR REPLACE FUNCTION public.verify_doctor_slots(
  p_doctor_id INTEGER DEFAULT NULL
)
RETURNS TABLE (
  doctor_id INTEGER,
  doctor_name TEXT,
  total_slots BIGINT,
  available_slots BIGINT,
  booked_slots BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    d.id as doctor_id,
    d.name as doctor_name,
    COUNT(s.id) as total_slots,
    COUNT(s.id) FILTER (WHERE NOT s.is_booked) as available_slots,
    COUNT(s.id) FILTER (WHERE s.is_booked) as booked_slots
  FROM aayush.doctors d
  LEFT JOIN aayush.appointment_slots s ON d.id = s.doctor_id
  WHERE p_doctor_id IS NULL OR d.id = p_doctor_id
  GROUP BY d.id, d.name
  ORDER BY d.id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.verify_doctor_slots(INTEGER) TO anon, authenticated, service_role;