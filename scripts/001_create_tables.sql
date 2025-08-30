-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'scholar')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create content tables
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  author_id UUID NOT NULL REFERENCES public.profiles(id),
  category_id UUID REFERENCES public.categories(id),
  published BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration INTEGER, -- in seconds
  author_id UUID NOT NULL REFERENCES public.profiles(id),
  category_id UUID REFERENCES public.categories(id),
  published BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  cover_image TEXT,
  pdf_url TEXT,
  author_id UUID NOT NULL REFERENCES public.profiles(id),
  category_id UUID REFERENCES public.categories(id),
  published BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  downloads INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.lectures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  audio_url TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  duration INTEGER, -- in seconds
  author_id UUID NOT NULL REFERENCES public.profiles(id),
  category_id UUID REFERENCES public.categories(id),
  published BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat system tables
CREATE TABLE IF NOT EXISTS public.chat_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  created_by UUID NOT NULL REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lectures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for categories (public read, admin write)
CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Only admins can manage categories" ON public.categories FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- RLS Policies for content (public read published, author/admin write)
CREATE POLICY "Anyone can view published articles" ON public.articles FOR SELECT USING (published = true OR auth.uid() = author_id);
CREATE POLICY "Authors can manage own articles" ON public.articles FOR ALL USING (auth.uid() = author_id);
CREATE POLICY "Admins can manage all articles" ON public.articles FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'scholar'))
);

-- Similar policies for videos, books, lectures
CREATE POLICY "Anyone can view published videos" ON public.videos FOR SELECT USING (published = true OR auth.uid() = author_id);
CREATE POLICY "Authors can manage own videos" ON public.videos FOR ALL USING (auth.uid() = author_id);
CREATE POLICY "Admins can manage all videos" ON public.videos FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'scholar'))
);

CREATE POLICY "Anyone can view published books" ON public.books FOR SELECT USING (published = true OR auth.uid() = author_id);
CREATE POLICY "Authors can manage own books" ON public.books FOR ALL USING (auth.uid() = author_id);
CREATE POLICY "Admins can manage all books" ON public.books FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'scholar'))
);

CREATE POLICY "Anyone can view published lectures" ON public.lectures FOR SELECT USING (published = true OR auth.uid() = author_id);
CREATE POLICY "Authors can manage own lectures" ON public.lectures FOR ALL USING (auth.uid() = author_id);
CREATE POLICY "Admins can manage all lectures" ON public.lectures FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'scholar'))
);

-- Chat policies
CREATE POLICY "Users can view public chat rooms" ON public.chat_rooms FOR SELECT USING (is_public = true);
CREATE POLICY "Users can create chat rooms" ON public.chat_rooms FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can view messages in accessible rooms" ON public.chat_messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.chat_rooms WHERE id = room_id AND is_public = true)
);
CREATE POLICY "Users can send messages" ON public.chat_messages FOR INSERT WITH CHECK (auth.uid() = user_id);
