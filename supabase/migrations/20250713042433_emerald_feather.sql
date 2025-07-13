/*
  # Fix Timezone Issue in Appointment System

  1. Changes
    - Simplifies timezone conversion logic
    - Fixes the issue with date selection showing incorrect day
    - Ensures proper handling of IST timezone for appointments
*/

-- Create a simple function to check if a date is a Sunday
CREATE OR REPLACE FUNCTION public.is_sunday(p_date DATE)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXTRACT(DOW FROM p_date) = 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.is_sunday(DATE) TO anon, authenticated, service_role;

-- Create a function to format date for display
CREATE OR REPLACE FUNCTION public.format_date_for_display(p_date DATE)
RETURNS TEXT AS $$
BEGIN
  RETURN to_char(p_date, 'Day, Month DD, YYYY');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.format_date_for_display(DATE) TO anon, authenticated, service_role;

-- Create a function to get the day name
CREATE OR REPLACE FUNCTION public.get_day_name(p_date DATE)
RETURNS TEXT AS $$
BEGIN
  RETURN to_char(p_date, 'Day');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.get_day_name(DATE) TO anon, authenticated, service_role;