-- Create hadiths table
CREATE TABLE IF NOT EXISTS public.hadiths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  address TEXT NOT NULL,
  revelation TEXT,
  category TEXT,
  arabic_text TEXT NOT NULL,
  translation_eng TEXT,
  translation_urdu TEXT,
  tafseer_eng TEXT,
  tafseer_urdu TEXT,
  author_id UUID NOT NULL REFERENCES public.users(id),
  slug TEXT NOT NULL UNIQUE,
  published BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ayats table
CREATE TABLE IF NOT EXISTS public.ayats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  address TEXT NOT NULL,
  revelation TEXT,
  category TEXT,
  arabic_text TEXT NOT NULL,
  translation_eng TEXT,
  translation_urdu TEXT,
  tafseer_eng TEXT,
  tafseer_urdu TEXT,
  author_id UUID NOT NULL REFERENCES public.users(id),
  slug TEXT NOT NULL UNIQUE,
  published BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.hadiths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ayats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for hadiths
CREATE POLICY "Anyone can view published hadiths" ON public.hadiths FOR SELECT USING (published = true OR auth.uid() = author_id);
CREATE POLICY "Authors can manage own hadiths" ON public.hadiths FOR ALL USING (auth.uid() = author_id);
CREATE POLICY "Admins can manage all hadiths" ON public.hadiths FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- RLS Policies for ayats
CREATE POLICY "Anyone can view published ayats" ON public.ayats FOR SELECT USING (published = true OR auth.uid() = author_id);
CREATE POLICY "Authors can manage own ayats" ON public.ayats FOR ALL USING (auth.uid() = author_id);
CREATE POLICY "Admins can manage all ayats" ON public.ayats FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);