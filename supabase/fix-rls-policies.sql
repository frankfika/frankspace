-- Fix RLS Policies: Change auth.role() to auth.uid() IS NOT NULL
-- Run this in Supabase SQL Editor to fix save functionality

-- personal_info
DROP POLICY IF EXISTS "Authenticated can insert personal_info" ON personal_info;
DROP POLICY IF EXISTS "Authenticated can update personal_info" ON personal_info;
DROP POLICY IF EXISTS "Authenticated can delete personal_info" ON personal_info;
CREATE POLICY "Authenticated can insert personal_info" ON personal_info FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can update personal_info" ON personal_info FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can delete personal_info" ON personal_info FOR DELETE USING (auth.uid() IS NOT NULL);

-- navigation
DROP POLICY IF EXISTS "Authenticated can insert navigation" ON navigation;
DROP POLICY IF EXISTS "Authenticated can update navigation" ON navigation;
DROP POLICY IF EXISTS "Authenticated can delete navigation" ON navigation;
CREATE POLICY "Authenticated can insert navigation" ON navigation FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can update navigation" ON navigation FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can delete navigation" ON navigation FOR DELETE USING (auth.uid() IS NOT NULL);

-- headers
DROP POLICY IF EXISTS "Authenticated can insert headers" ON headers;
DROP POLICY IF EXISTS "Authenticated can update headers" ON headers;
DROP POLICY IF EXISTS "Authenticated can delete headers" ON headers;
CREATE POLICY "Authenticated can insert headers" ON headers FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can update headers" ON headers FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can delete headers" ON headers FOR DELETE USING (auth.uid() IS NOT NULL);

-- skills
DROP POLICY IF EXISTS "Authenticated can insert skills" ON skills;
DROP POLICY IF EXISTS "Authenticated can update skills" ON skills;
DROP POLICY IF EXISTS "Authenticated can delete skills" ON skills;
CREATE POLICY "Authenticated can insert skills" ON skills FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can update skills" ON skills FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can delete skills" ON skills FOR DELETE USING (auth.uid() IS NOT NULL);

-- experience
DROP POLICY IF EXISTS "Authenticated can insert experience" ON experience;
DROP POLICY IF EXISTS "Authenticated can update experience" ON experience;
DROP POLICY IF EXISTS "Authenticated can delete experience" ON experience;
CREATE POLICY "Authenticated can insert experience" ON experience FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can update experience" ON experience FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can delete experience" ON experience FOR DELETE USING (auth.uid() IS NOT NULL);

-- education
DROP POLICY IF EXISTS "Authenticated can insert education" ON education;
DROP POLICY IF EXISTS "Authenticated can update education" ON education;
DROP POLICY IF EXISTS "Authenticated can delete education" ON education;
CREATE POLICY "Authenticated can insert education" ON education FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can update education" ON education FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can delete education" ON education FOR DELETE USING (auth.uid() IS NOT NULL);

-- projects
DROP POLICY IF EXISTS "Authenticated can insert projects" ON projects;
DROP POLICY IF EXISTS "Authenticated can update projects" ON projects;
DROP POLICY IF EXISTS "Authenticated can delete projects" ON projects;
CREATE POLICY "Authenticated can insert projects" ON projects FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can update projects" ON projects FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can delete projects" ON projects FOR DELETE USING (auth.uid() IS NOT NULL);

-- thoughts
DROP POLICY IF EXISTS "Authenticated can insert thoughts" ON thoughts;
DROP POLICY IF EXISTS "Authenticated can update thoughts" ON thoughts;
DROP POLICY IF EXISTS "Authenticated can delete thoughts" ON thoughts;
CREATE POLICY "Authenticated can insert thoughts" ON thoughts FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can update thoughts" ON thoughts FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can delete thoughts" ON thoughts FOR DELETE USING (auth.uid() IS NOT NULL);

-- activities
DROP POLICY IF EXISTS "Authenticated can insert activities" ON activities;
DROP POLICY IF EXISTS "Authenticated can update activities" ON activities;
DROP POLICY IF EXISTS "Authenticated can delete activities" ON activities;
CREATE POLICY "Authenticated can insert activities" ON activities FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can update activities" ON activities FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can delete activities" ON activities FOR DELETE USING (auth.uid() IS NOT NULL);

-- socials
DROP POLICY IF EXISTS "Authenticated can insert socials" ON socials;
DROP POLICY IF EXISTS "Authenticated can update socials" ON socials;
DROP POLICY IF EXISTS "Authenticated can delete socials" ON socials;
CREATE POLICY "Authenticated can insert socials" ON socials FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can update socials" ON socials FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can delete socials" ON socials FOR DELETE USING (auth.uid() IS NOT NULL);

-- consultation
DROP POLICY IF EXISTS "Authenticated can insert consultation" ON consultation;
DROP POLICY IF EXISTS "Authenticated can update consultation" ON consultation;
DROP POLICY IF EXISTS "Authenticated can delete consultation" ON consultation;
CREATE POLICY "Authenticated can insert consultation" ON consultation FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can update consultation" ON consultation FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can delete consultation" ON consultation FOR DELETE USING (auth.uid() IS NOT NULL);

-- personal_traits
DROP POLICY IF EXISTS "Authenticated can insert personal_traits" ON personal_traits;
DROP POLICY IF EXISTS "Authenticated can update personal_traits" ON personal_traits;
DROP POLICY IF EXISTS "Authenticated can delete personal_traits" ON personal_traits;
CREATE POLICY "Authenticated can insert personal_traits" ON personal_traits FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can update personal_traits" ON personal_traits FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can delete personal_traits" ON personal_traits FOR DELETE USING (auth.uid() IS NOT NULL);

-- recommendations
DROP POLICY IF EXISTS "Authenticated can insert recommendations" ON recommendations;
DROP POLICY IF EXISTS "Authenticated can update recommendations" ON recommendations;
DROP POLICY IF EXISTS "Authenticated can delete recommendations" ON recommendations;
CREATE POLICY "Authenticated can insert recommendations" ON recommendations FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can update recommendations" ON recommendations FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated can delete recommendations" ON recommendations FOR DELETE USING (auth.uid() IS NOT NULL);

-- Storage: Create projects bucket and policies
INSERT INTO storage.buckets (id, name, public)
VALUES ('projects', 'projects', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can read projects images"
ON storage.objects FOR SELECT
USING (bucket_id = 'projects');

CREATE POLICY "Authenticated can upload projects images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'projects' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated can delete projects images"
ON storage.objects FOR DELETE
USING (bucket_id = 'projects' AND auth.uid() IS NOT NULL);
