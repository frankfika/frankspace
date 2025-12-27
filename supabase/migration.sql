-- Frank Chen Portfolio - Supabase Database Schema
-- Run this script in your Supabase SQL Editor

-- Enable Row Level Security on all tables
-- Public can read, only authenticated admin can write

-- 1. Personal Info Table
CREATE TABLE IF NOT EXISTS personal_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lang VARCHAR(5) NOT NULL DEFAULT 'en',
  name VARCHAR(100) NOT NULL,
  tagline TEXT NOT NULL,
  email VARCHAR(100),
  github VARCHAR(100),
  mobile VARCHAR(50),
  location VARCHAR(100),
  summary TEXT,
  availability VARCHAR(100),
  contact_btn VARCHAR(50),
  resume_btn VARCHAR(50),
  years_exp VARCHAR(10),
  money_managed VARCHAR(50),
  years_label VARCHAR(50),
  money_label VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(lang)
);

-- 2. Navigation Table
CREATE TABLE IF NOT EXISTS navigation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lang VARCHAR(5) NOT NULL DEFAULT 'en',
  home VARCHAR(50),
  profile VARCHAR(50),
  vibe VARCHAR(50),
  activities VARCHAR(50),
  thoughts VARCHAR(50),
  consultation VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(lang)
);

-- 3. Headers Table
CREATE TABLE IF NOT EXISTS headers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lang VARCHAR(5) NOT NULL DEFAULT 'en',
  experience VARCHAR(50),
  education VARCHAR(50),
  skills VARCHAR(50),
  highlights VARCHAR(50),
  socials VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(lang)
);

-- 4. Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lang VARCHAR(5) NOT NULL DEFAULT 'en',
  subject VARCHAR(100) NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  full_mark INTEGER NOT NULL DEFAULT 100,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Experience Table
CREATE TABLE IF NOT EXISTS experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lang VARCHAR(5) NOT NULL DEFAULT 'en',
  role VARCHAR(200) NOT NULL,
  company VARCHAR(200) NOT NULL,
  period VARCHAR(100),
  description TEXT,
  achievements JSONB DEFAULT '[]'::jsonb,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Education Table
CREATE TABLE IF NOT EXISTS education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lang VARCHAR(5) NOT NULL DEFAULT 'en',
  school VARCHAR(200) NOT NULL,
  degree VARCHAR(200) NOT NULL,
  period VARCHAR(100),
  details JSONB DEFAULT '[]'::jsonb,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lang VARCHAR(5) NOT NULL DEFAULT 'en',
  title VARCHAR(200) NOT NULL,
  tags JSONB DEFAULT '[]'::jsonb,
  description TEXT,
  link TEXT,
  github_link TEXT,
  image TEXT,
  stats VARCHAR(100),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Thoughts (Notes) Table
CREATE TABLE IF NOT EXISTS thoughts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lang VARCHAR(5) NOT NULL DEFAULT 'en',
  title VARCHAR(300) NOT NULL,
  date VARCHAR(50),
  tags JSONB DEFAULT '[]'::jsonb,
  snippet TEXT,
  content TEXT,
  link TEXT,
  read_time VARCHAR(50),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Activities Table
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lang VARCHAR(5) NOT NULL DEFAULT 'en',
  title VARCHAR(300) NOT NULL,
  role VARCHAR(200),
  date VARCHAR(100),
  location VARCHAR(200),
  description TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  video_url TEXT,
  tag VARCHAR(50) CHECK (tag IN ('Conference', 'Community', 'Governance', 'Media')),
  link TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Socials Table
CREATE TABLE IF NOT EXISTS socials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lang VARCHAR(5) NOT NULL DEFAULT 'en',
  platform VARCHAR(100) NOT NULL,
  username VARCHAR(200),
  url TEXT NOT NULL,
  icon VARCHAR(50),
  color VARCHAR(100),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Consultation Table
CREATE TABLE IF NOT EXISTS consultation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lang VARCHAR(5) NOT NULL DEFAULT 'en',
  title VARCHAR(200) NOT NULL,
  price VARCHAR(100),
  description TEXT,
  topics JSONB DEFAULT '[]'::jsonb,
  cta VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(lang)
);

-- 12. Personal Traits Table
CREATE TABLE IF NOT EXISTS personal_traits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lang VARCHAR(5) NOT NULL DEFAULT 'en',
  mbti VARCHAR(20),
  zodiac VARCHAR(50),
  hometown VARCHAR(100),
  hangouts VARCHAR(200),
  worked_in VARCHAR(200),
  personalities TEXT,
  proud_moments JSONB DEFAULT '[]'::jsonb,
  beliefs JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(lang)
);

-- 13. Recommendations Table (Books/Movies/TV Shows)
CREATE TABLE IF NOT EXISTS recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lang VARCHAR(5) NOT NULL DEFAULT 'en',
  type VARCHAR(20) NOT NULL CHECK (type IN ('book', 'movie', 'tv_show')),
  category VARCHAR(100) NOT NULL,
  items JSONB DEFAULT '[]'::jsonb,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_skills_lang ON skills(lang);
CREATE INDEX IF NOT EXISTS idx_experience_lang ON experience(lang);
CREATE INDEX IF NOT EXISTS idx_education_lang ON education(lang);
CREATE INDEX IF NOT EXISTS idx_projects_lang ON projects(lang);
CREATE INDEX IF NOT EXISTS idx_thoughts_lang ON thoughts(lang);
CREATE INDEX IF NOT EXISTS idx_activities_lang ON activities(lang);
CREATE INDEX IF NOT EXISTS idx_socials_lang ON socials(lang);
CREATE INDEX IF NOT EXISTS idx_personal_traits_lang ON personal_traits(lang);
CREATE INDEX IF NOT EXISTS idx_recommendations_lang ON recommendations(lang);

-- Enable Row Level Security
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE headers ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE thoughts ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE socials ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_traits ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Public read, Authenticated write

-- Personal Info Policies
CREATE POLICY "Public can read personal_info" ON personal_info FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert personal_info" ON personal_info FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update personal_info" ON personal_info FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete personal_info" ON personal_info FOR DELETE USING (auth.role() = 'authenticated');

-- Navigation Policies
CREATE POLICY "Public can read navigation" ON navigation FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert navigation" ON navigation FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update navigation" ON navigation FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete navigation" ON navigation FOR DELETE USING (auth.role() = 'authenticated');

-- Headers Policies
CREATE POLICY "Public can read headers" ON headers FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert headers" ON headers FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update headers" ON headers FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete headers" ON headers FOR DELETE USING (auth.role() = 'authenticated');

-- Skills Policies
CREATE POLICY "Public can read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert skills" ON skills FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update skills" ON skills FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete skills" ON skills FOR DELETE USING (auth.role() = 'authenticated');

-- Experience Policies
CREATE POLICY "Public can read experience" ON experience FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert experience" ON experience FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update experience" ON experience FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete experience" ON experience FOR DELETE USING (auth.role() = 'authenticated');

-- Education Policies
CREATE POLICY "Public can read education" ON education FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert education" ON education FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update education" ON education FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete education" ON education FOR DELETE USING (auth.role() = 'authenticated');

-- Projects Policies
CREATE POLICY "Public can read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert projects" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update projects" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete projects" ON projects FOR DELETE USING (auth.role() = 'authenticated');

-- Thoughts Policies
CREATE POLICY "Public can read thoughts" ON thoughts FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert thoughts" ON thoughts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update thoughts" ON thoughts FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete thoughts" ON thoughts FOR DELETE USING (auth.role() = 'authenticated');

-- Activities Policies
CREATE POLICY "Public can read activities" ON activities FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert activities" ON activities FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update activities" ON activities FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete activities" ON activities FOR DELETE USING (auth.role() = 'authenticated');

-- Socials Policies
CREATE POLICY "Public can read socials" ON socials FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert socials" ON socials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update socials" ON socials FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete socials" ON socials FOR DELETE USING (auth.role() = 'authenticated');

-- Consultation Policies
CREATE POLICY "Public can read consultation" ON consultation FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert consultation" ON consultation FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update consultation" ON consultation FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete consultation" ON consultation FOR DELETE USING (auth.role() = 'authenticated');

-- Personal Traits Policies
CREATE POLICY "Public can read personal_traits" ON personal_traits FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert personal_traits" ON personal_traits FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update personal_traits" ON personal_traits FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete personal_traits" ON personal_traits FOR DELETE USING (auth.role() = 'authenticated');

-- Recommendations Policies
CREATE POLICY "Public can read recommendations" ON recommendations FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert recommendations" ON recommendations FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update recommendations" ON recommendations FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete recommendations" ON recommendations FOR DELETE USING (auth.role() = 'authenticated');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables
CREATE TRIGGER update_personal_info_updated_at BEFORE UPDATE ON personal_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_navigation_updated_at BEFORE UPDATE ON navigation FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_headers_updated_at BEFORE UPDATE ON headers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_experience_updated_at BEFORE UPDATE ON experience FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON education FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_thoughts_updated_at BEFORE UPDATE ON thoughts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_socials_updated_at BEFORE UPDATE ON socials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_consultation_updated_at BEFORE UPDATE ON consultation FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_personal_traits_updated_at BEFORE UPDATE ON personal_traits FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_recommendations_updated_at BEFORE UPDATE ON recommendations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
