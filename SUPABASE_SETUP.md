# Supabase Setup Guide

This guide will help you set up Supabase for the Mufti Munir Shakir Shaheed Website with unified authentication.

## Required Supabase Keys

You need two keys from your Supabase project:

1. **Project URL** (`NEXT_PUBLIC_SUPABASE_URL`)
2. **Anonymous Key** (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## How to Get Supabase Keys

### Step 1: Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Fill in project details:
   - **Name**: `mufti-website` (or any name you prefer)
   - **Database Password**: Create a strong password
   - **Region**: Choose the closest region to your users
6. Click "Create new project"

### Step 2: Get Your Keys
1. Once your project is created, go to **Settings** > **API**
2. You'll find:
   - **Project URL**: Copy this value
   - **Project API keys** > **anon public**: Copy this value

### Step 3: Update Environment Variables
1. Open `.env.local` in your project root
2. Replace the placeholder values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
   ```

### Step 4: Set Up Database Schema

**IMPORTANT: This step is REQUIRED for the authentication system to work properly!**

1. In your Supabase dashboard, go to the **SQL Editor**
2. Copy and paste the **entire contents** of `supabase-schema.sql`
3. Click **Run** to execute the SQL
4. Verify the following were created:
   - `users` table with columns: id, full_name, email, role, bio, avatar_url, created_at, updated_at
   - `chat_messages` table
   - `handle_new_user()` function
   - `on_auth_user_created` trigger
   - Row Level Security (RLS) policies

**If you skip this step, you will get "Failed to load user profile" errors when logging in!**

### Step 5: Create Admin User (Optional)
1. Go to **Authentication** > **Users** in your Supabase dashboard
2. Click "Add user"
3. Enter admin email and password
4. After creating the user, go to **Table Editor** > **users**
5. Find the user's profile and change the `role` from `user` to `admin`

## Authentication Flow

### User Roles
- **user**: Default role for new users, access to dashboard and chat
- **admin**: Full access to admin panel, content management

### Login Process
1. Users sign in with email/password on `/auth/login`
2. System checks user role from `users` table
3. Redirects based on role:
   - `admin` → `/admin` (Admin Dashboard)
- `user` → `/dashboard` (User Dashboard)

### Sign Up Process
1. Users create account on `/auth/sign-up`
2. System automatically creates profile with `user` role
3. Email confirmation may be required (configurable in Supabase)

## Security Features

- **Row Level Security (RLS)**: Enabled on all tables
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Different permissions for different user types
- **Middleware Protection**: Routes protected at the Next.js level

## Troubleshooting

### Common Issues

1. **"Failed to load user profile" Error**
   - **Cause**: The database schema hasn't been applied to your Supabase database
   - **Solution**: 
     1. Go to your Supabase dashboard → SQL Editor
     2. Copy the entire contents of `supabase-schema.sql`
     3. Paste and run the SQL
     4. Verify the `users` table and `handle_new_user()` function were created
   - **Alternative**: If you already have users, manually create profiles for existing users:

```sql
INSERT INTO public.users (id, full_name, email, role)
SELECT id, COALESCE(raw_user_meta_data->>'full_name', 'User'), email, 'user'
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.users);
     ```

2. **Profile Not Created During Sign-up**
   - **Cause**: Database trigger not working or RLS policies blocking insertion
   - **Solution**: The sign-up process now includes fallback profile creation
   - **Manual Fix**: Check if the trigger exists:
     ```sql
     SELECT * FROM information_schema.triggers WHERE trigger_name = 'on_auth_user_created';
     ```

3. **"Invalid URL" Error**
   - Make sure your `NEXT_PUBLIC_SUPABASE_URL` is correct
   - URL should start with `https://` and end with `.supabase.co`

4. **"Invalid API Key" Error**
   - Verify your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Make sure you're using the "anon public" key, not the service role key

5. **Profile Not Found After Login**
   - Check if the trigger for profile creation is working
   - Manually create profile in the `users` table if needed

6. **Access Denied to Admin Routes**
   - Verify user role in the `users` table
   - Make sure RLS policies are set up correctly

### Development vs Production

- The same Supabase project can be used for both development and production
- For production, consider creating a separate Supabase project
- Make sure to update environment variables accordingly

## Next Steps

After setting up Supabase:
1. Test user registration and login
2. Create an admin user and test admin access
3. Test the chat functionality
4. Configure email templates in Supabase (optional)
5. Set up custom domain for Supabase (production)

For more detailed information, refer to the [Supabase Documentation](https://supabase.com/docs).