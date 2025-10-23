-- Storage policies for E-Books bucket
-- Run this in your Supabase SQL Editor to fix the RLS policy violation

-- Create storage bucket policies for E-Books bucket
-- Allow authenticated users to upload files
INSERT INTO storage.buckets (id, name, public)
VALUES ('E-Books', 'E-Books', true)
ON CONFLICT (id) DO NOTHING;

-- Note: RLS is already enabled on storage.objects by default in Supabase
-- We only need to create policies, not enable RLS

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Allow authenticated users to upload to E-Books bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to E-Books bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow admins to manage E-Books bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to delete own uploads in E-Books bucket" ON storage.objects;

-- Policy to allow authenticated users to upload files to E-Books bucket
CREATE POLICY "Allow authenticated users to upload to E-Books bucket" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'E-Books' AND 
    auth.role() = 'authenticated'
  );

-- Policy to allow public read access to files in E-Books bucket
CREATE POLICY "Allow public read access to E-Books bucket" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'E-Books'
  );

-- Policy to allow admins to manage all files in E-Books bucket
CREATE POLICY "Allow admins to manage E-Books bucket" ON storage.objects
  FOR ALL USING (
    bucket_id = 'E-Books' AND 
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy to allow users to delete their own uploads (optional)
CREATE POLICY "Allow users to delete own uploads in E-Books bucket" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'E-Books' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- ========================================
-- Storage policies for Video Thumbnails bucket
-- ========================================

-- Create storage bucket for Video Thumbnails
-- Allow public access to the bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('Video Thumbnails', 'Video Thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Allow authenticated users to upload to Video Thumbnails bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to Video Thumbnails bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow admins to manage Video Thumbnails bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to delete own uploads in Video Thumbnails bucket" ON storage.objects;

-- Policy to allow authenticated users to upload files to Video Thumbnails bucket
CREATE POLICY "Allow authenticated users to upload to Video Thumbnails bucket" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'Video Thumbnails' AND 
    auth.role() = 'authenticated'
  );

-- Policy to allow public read access to files in Video Thumbnails bucket
CREATE POLICY "Allow public read access to Video Thumbnails bucket" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'Video Thumbnails'
  );

-- Policy to allow admins to manage all files in Video Thumbnails bucket
CREATE POLICY "Allow admins to manage Video Thumbnails bucket" ON storage.objects
  FOR ALL USING (
    bucket_id = 'Video Thumbnails' AND 
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy to allow users to delete their own uploads (optional)
CREATE POLICY "Allow users to delete own uploads in Video Thumbnails bucket" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'Video Thumbnails' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );