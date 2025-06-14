-- Update time slot intervals in get_available_slots function
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
BEGIN
  -- Check if the date is a Sunday
  is_sunday := EXTRACT(DOW FROM p_date) = 0;
  
  -- Morning slots
  slot_time := '10:00:00'::TIME;  -- Start at 10:00 AM
  
  -- For Sundays, only check until 3 PM
  IF is_sunday THEN
    WHILE slot_time < '15:00:00'::TIME LOOP
      time_slot := slot_time;
      is_available := aayush.is_doctor_available(p_doctor_id, p_date, slot_time);
      RETURN NEXT;
      
      -- Increment by 15 minutes
      slot_time := slot_time + INTERVAL '15 minutes';
    END LOOP;
  ELSE
    -- Regular day - Morning slots (10 AM to 3 PM)
    WHILE slot_time < '15:00:00'::TIME LOOP
      time_slot := slot_time;
      is_available := aayush.is_doctor_available(p_doctor_id, p_date, slot_time);
      RETURN NEXT;
      
      -- Increment by 15 minutes
      slot_time := slot_time + INTERVAL '15 minutes';
    END LOOP;
    
    -- Evening slots (6 PM to 9 PM)
    slot_time := '18:00:00'::TIME;
    WHILE slot_time < '21:00:00'::TIME LOOP
      time_slot := slot_time;
      is_available := aayush.is_doctor_available(p_doctor_id, p_date, slot_time);
      RETURN NEXT;
      
      -- Increment by 15 minutes
      slot_time := slot_time + INTERVAL '15 minutes';
    END LOOP;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.get_available_slots(INTEGER, DATE) TO anon, authenticated, service_role;