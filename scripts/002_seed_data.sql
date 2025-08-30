-- Insert default categories
INSERT INTO public.categories (name, slug, description, icon) VALUES
('Quran Studies', 'quran-studies', 'Quranic interpretation and analysis', '📖'),
('Hadith', 'hadith', 'Prophetic traditions and sayings', '📜'),
('Islamic History', 'islamic-history', 'Historical events and personalities', '🏛️'),
('Fiqh', 'fiqh', 'Islamic jurisprudence and law', '⚖️'),
('Spirituality', 'spirituality', 'Islamic spirituality and sufism', '🌙'),
('Contemporary Issues', 'contemporary-issues', 'Modern Islamic perspectives', '🌍')
ON CONFLICT (slug) DO NOTHING;

-- Create default chat room
INSERT INTO public.chat_rooms (name, description, is_public, created_by) VALUES
('General Discussion', 'Open discussion about Islamic topics', true, 
 (SELECT id FROM auth.users LIMIT 1))
ON CONFLICT DO NOTHING;
