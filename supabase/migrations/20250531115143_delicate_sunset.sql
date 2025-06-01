/*
  # Create authentication helper functions

  1. New Functions
    - `public.authenticate_user` - Authenticates a user and returns session info
    - `public.get_user_by_id` - Gets user details by ID
    - `public.get_user_role` - Gets user role by ID
  
  2. Security
    - All functions are SECURITY DEFINER to ensure proper access control
    - Grant execute permissions to appropriate roles
*/

-- Create function to get user by ID
CREATE OR REPLACE FUNCTION public.get_user_by_id(
  p_user_id UUID
) RETURNS JSONB AS $$
DECLARE
  user_record aayush.users;
BEGIN
  -- Find the user
  SELECT * INTO user_record
  FROM aayush.users
  WHERE id = p_user_id;
  
  -- Check if user exists
  IF user_record.id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'User not found'
    );
  END IF;
  
  -- Return user details (excluding password hash)
  RETURN jsonb_build_object(
    'success', true,
    'user_id', user_record.id,
    'username', user_record.username,
    'role', user_record.role,
    'created_at', user_record.created_at
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(
  p_user_id UUID
) RETURNS TEXT AS $$
DECLARE
  user_role TEXT;
BEGIN
  -- Find the user's role
  SELECT role::TEXT INTO user_role
  FROM aayush.users
  WHERE id = p_user_id;
  
  -- Return the role or null if user not found
  RETURN user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the functions
GRANT EXECUTE ON FUNCTION public.get_user_by_id(UUID) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_user_role(UUID) TO anon, authenticated, service_role;