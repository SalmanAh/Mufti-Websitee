-- Add thumbnail_url column to articles table
ALTER TABLE public.articles 
ADD COLUMN thumbnail_url text DEFAULT '';

-- Add thumbnail_url column to books table
ALTER TABLE public.books 
ADD COLUMN thumbnail_url text DEFAULT '';

-- Add index for articles thumbnail_url for faster queries
CREATE INDEX IF NOT EXISTS idx_articles_thumbnail_url 
ON public.articles USING btree (thumbnail_url) 
TABLESPACE pg_default;

-- Add index for books thumbnail_url for faster queries
CREATE INDEX IF NOT EXISTS idx_books_thumbnail_url 
ON public.books USING btree (thumbnail_url) 
TABLESPACE pg_default;