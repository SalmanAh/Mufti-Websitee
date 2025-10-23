-- Storage policies for Videos bucket
-- Run this in your Supabase SQL Editor to fix the RLS policy violation

-- The 'Videos' bucket should already exist since you created it manually
-- We just need to create the policies

-- Note: RLS is already enabled on storage.objects by default in Supabase
-- We only need to create policies, not enable RLS

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Allow authenticated users to upload to Videos bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to Videos bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow admins to manage Videos bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to delete own uploads in Videos bucket" ON storage.objects;

-- Policy to allow authenticated users to upload files to Videos bucket
CREATE POLICY "Allow authenticated users to upload to Videos bucket" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'Videos' AND 
    auth.role() = 'authenticated'
  );

-- Policy to allow public read access to files in Videos bucket
CREATE POLICY "Allow public read access to Videos bucket" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'Videos'
  );

-- Policy to allow admins to manage all files in Videos bucket
CREATE POLICY "Allow admins to manage Videos bucket" ON storage.objects
  FOR ALL USING (
    bucket_id = 'Videos' AND 
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy to allow users to delete their own uploads (optional)
CREATE POLICY "Allow users to delete own uploads in Videos bucket" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'Videos' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );