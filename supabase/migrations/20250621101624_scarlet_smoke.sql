/*
  # Create function to get doctors from aayush schema

  1. New Functions
    - `get_doctors_from_aayush` - Function to fetch doctors from the aayush schema
  
  2. Security
    - Grant execute permissions to anon, authenticated, and service_role
*/

-- Create a function to get doctors from the aayush schema
CREATE OR REPLACE FUNCTION public.get_doctors_from_aayush()
RETURNS SETOF aayush.doctors AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM aayush.doctors;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.get_doctors_from_aayush() TO anon, authenticated, service_role;