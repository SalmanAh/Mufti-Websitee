-- Fix for infinite recursion in RLS policies
-- Run this in your Supabase SQL Editor to fix the recursion issue

-- Drop the problematic policies first
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.users;
DROP POLICY IF EXISTS "Admins can update any profile" ON public.users;
DROP POLICY IF EXISTS "Admins can manage all messages" ON public.chat_messages;

-- Recreate admin policies using JWT claims to avoid recursion
CREATE POLICY "Admins can view all profiles" ON public.users
  FOR SELECT USING (
    (auth.jwt() ->> 'role') = 'admin'
  );

CREATE POLICY "Admins can update any profile" ON public.users
  FOR UPDATE USING (
    (auth.jwt() ->> 'role') = 'admin'
  );

CREATE POLICY "Admins can manage all messages" ON public.chat_messages
  FOR ALL USING (
    (auth.jwt() ->> 'role') = 'admin'
  );

-- Update the trigger function to include role in JWT claims
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    NEW.email,
    'user'
  );
  
  -- Update the user's raw_user_meta_data to include role for JWT claims
  UPDATE auth.users 
  SET raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || jsonb_build_object('role', 'user')
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- For existing users, update their metadata to include role in JWT claims
UPDATE auth.users 
SET raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || jsonb_build_object('role', 
  COALESCE((SELECT role FROM public.users WHERE id = auth.users.id), 'user')
)
WHERE id IN (SELECT id FROM public.users);