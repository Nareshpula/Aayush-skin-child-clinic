/*
  # Create users table and authentication system

  1. New Tables
    - `aayush.users` - Stores user credentials and roles
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `password_hash` (text)
      - `role` (enum: 'admin', 'reception')
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on users table
    - Add policies for secure access
    - Create functions for user authentication
*/

-- Create enum type for user roles
CREATE TYPE aayush.user_role AS ENUM ('admin', 'reception');

-- Create users table
CREATE TABLE IF NOT EXISTS aayush.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role aayush.user_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE aayush.users ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own data" 
  ON aayush.users 
  FOR SELECT 
  USING (auth.uid() = id);

-- Create function to register a new user
CREATE OR REPLACE FUNCTION aayush.register_user(
  p_username TEXT,
  p_password TEXT,
  p_role aayush.user_role
) RETURNS UUID AS $$
DECLARE
  new_user_id UUID;
BEGIN
  -- Insert the new user
  INSERT INTO aayush.users (
    username,
    password_hash,
    role
  ) VALUES (
    p_username,
    crypt(p_password, gen_salt('bf')),
    p_role
  )
  RETURNING id INTO new_user_id;
  
  RETURN new_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to authenticate a user
CREATE OR REPLACE FUNCTION public.authenticate_user(
  p_username TEXT,
  p_password TEXT
) RETURNS JSONB AS $$
DECLARE
  user_record aayush.users;
BEGIN
  -- Find the user
  SELECT * INTO user_record
  FROM aayush.users
  WHERE username = p_username;
  
  -- Check if user exists and password is correct
  IF user_record.id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Invalid username or password'
    );
  END IF;
  
  IF user_record.password_hash = crypt(p_password, user_record.password_hash) THEN
    RETURN jsonb_build_object(
      'success', true,
      'user_id', user_record.id,
      'username', user_record.username,
      'role', user_record.role
    );
  ELSE
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Invalid username or password'
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on the functions
GRANT EXECUTE ON FUNCTION aayush.register_user(TEXT, TEXT, aayush.user_role) TO service_role;
GRANT EXECUTE ON FUNCTION public.authenticate_user(TEXT, TEXT) TO anon, authenticated, service_role;

-- Create extension for password hashing if it doesn't exist
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Insert default admin and reception users
DO $$
BEGIN
  -- Only insert if they don't already exist
  IF NOT EXISTS (SELECT 1 FROM aayush.users WHERE username = 'admin') THEN
    PERFORM aayush.register_user('admin', 'admin123', 'admin'::aayush.user_role);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM aayush.users WHERE username = 'reception') THEN
    PERFORM aayush.register_user('reception', 'reception123', 'reception'::aayush.user_role);
  END IF;
END
$$;