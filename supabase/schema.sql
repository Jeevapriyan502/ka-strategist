-- KA Strategist — run in Supabase SQL Editor (Dashboard → SQL → New query)

CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  author TEXT DEFAULT 'KA Strategist Team',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous insert on leads" ON leads;
CREATE POLICY "Allow anonymous insert on leads"
  ON leads FOR INSERT
  TO anon
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read on blog_posts" ON blog_posts;
CREATE POLICY "Allow public read on blog_posts"
  ON blog_posts FOR SELECT
  TO anon
  USING (true);

-- Admin blog API uses SUPABASE_SERVICE_ROLE_KEY (bypasses RLS).
-- Contact form API also prefers service role for reliable lead inserts.

DROP POLICY IF EXISTS "Allow service role all on leads" ON leads;
CREATE POLICY "Allow service role all on leads"
  ON leads FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
