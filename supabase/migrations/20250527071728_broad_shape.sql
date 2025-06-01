/*
  # Create appointment slots for doctors

  1. New Data
    - Creates appointment slots for the next 30 days for each doctor
    - Morning slots: 9:30 AM to 4:00 PM (15-minute intervals)
    - Evening slots: 6:00 PM to 9:00 PM (15-minute intervals)
    - Excludes Sundays
*/

-- Function to generate appointment slots for doctors
CREATE OR REPLACE FUNCTION aayush.generate_appointment_slots()
RETURNS void AS $$
DECLARE
    doctor_record RECORD;
    current_date DATE := CURRENT_DATE;
    end_date DATE := CURRENT_DATE + INTERVAL '30 days';
    current_day TEXT;
    slot_date DATE;
    slot_time TIME;
BEGIN
    -- Loop through each doctor
    FOR doctor_record IN SELECT id, available_days FROM aayush.doctors
    LOOP
        -- Loop through dates for the next 30 days
        slot_date := current_date;
        WHILE slot_date <= end_date LOOP
            -- Get day of week
            current_day := to_char(slot_date, 'Day');
            current_day := trim(current_day);
            
            -- Check if doctor is available on this day
            IF current_day = ANY(doctor_record.available_days) THEN
                -- Morning slots (9:30 AM to 4:00 PM)
                slot_time := '09:30:00'::TIME;
                WHILE slot_time <= '16:00:00'::TIME LOOP
                    -- Insert slot
                    INSERT INTO aayush.appointment_slots (doctor_id, date, time, is_booked)
                    VALUES (doctor_record.id, slot_date, slot_time, false)
                    ON CONFLICT (doctor_id, date, time) DO NOTHING;
                    
                    -- Increment by 15 minutes
                    slot_time := slot_time + INTERVAL '15 minutes';
                END LOOP;
                
                -- Evening slots (6:00 PM to 9:00 PM)
                slot_time := '18:00:00'::TIME;
                WHILE slot_time <= '21:00:00'::TIME LOOP
                    -- Insert slot
                    INSERT INTO aayush.appointment_slots (doctor_id, date, time, is_booked)
                    VALUES (doctor_record.id, slot_date, slot_time, false)
                    ON CONFLICT (doctor_id, date, time) DO NOTHING;
                    
                    -- Increment by 15 minutes
                    slot_time := slot_time + INTERVAL '15 minutes';
                END LOOP;
            END IF;
            
            -- Move to next day
            slot_date := slot_date + INTERVAL '1 day';
        END LOOP;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Generate appointment slots
SELECT aayush.generate_appointment_slots();