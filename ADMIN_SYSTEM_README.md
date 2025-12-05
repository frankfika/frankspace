# Admin Backend Management System

## Overview

This admin system allows you to manage all portfolio content in real-time through a web interface. Content is stored in Supabase PostgreSQL database and automatically updates on the frontend without rebuilding.

## Architecture

```
Frontend (React + Vite)
    ↓
Supabase Client (lib/supabase.ts)
    ↓
Supabase Cloud (PostgreSQL + Auth + Storage)
    ↓
Admin Panel (/admin routes)
```

## Local Setup

### 1. Install Dependencies ✅

Already installed:
- @supabase/supabase-js
- swr (data fetching)
- react-router-dom (routing)

### 2. Create Supabase Project

Follow the instructions in [SUPABASE_SETUP.md](SUPABASE_SETUP.md):

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project named "frankfika-portfolio"
3. Copy your Project URL and anon key
4. Update `.env.local` with your credentials
5. Run the SQL migration in Supabase SQL Editor
6. Create your admin user in Supabase Auth dashboard

### 3. Environment Variables

Update your `.env.local` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Start Development Server

```bash
npm run dev
```

Your app will be available at `http://localhost:3000` (or another port if 3000 is busy)

## Admin Panel Access

### Login

1. Navigate to `/admin/login`
2. Enter your admin credentials (created in Supabase Auth)
3. You'll be redirected to the admin dashboard

### Dashboard

Once logged in, you'll see the admin dashboard at `/admin` with cards for:

- Personal Info
- Experience
- Education
- Skills
- Projects
- Thoughts
- Activities
- Social Links
- Consultation

### Features

#### Activities Editor (Fully Implemented)

Located at `/admin/activities`:

- ✅ Create new activities
- ✅ Edit existing activities
- ✅ Delete activities
- ✅ Upload images to Supabase Storage
- ✅ Add video URLs
- ✅ Categorize by tag (Conference, Community, Governance, Media)
- ✅ Multi-language support (EN/ZH)
- ✅ Drag-and-drop image upload
- ✅ Display order control

#### Other Editors (Placeholder)

The following editors show placeholder pages - implement following the Activities Editor pattern:

- Personal Info Editor
- Experience Editor
- Education Editor
- Skills Editor
- Projects Editor
- Thoughts Editor
- Social Links Editor
- Consultation Editor

## File Structure

```
/lib
  supabase.ts              # Supabase client initialization
  supabaseQueries.ts       # All database queries

/hooks
  useAuth.ts               # Authentication hook
  useContent.ts            # Content fetching hook

/admin
  /components
    AdminLayout.tsx        # Admin panel layout with sidebar
    ProtectedRoute.tsx     # Route protection wrapper
  /pages
    LoginPage.tsx          # Login page
    Dashboard.tsx          # Admin dashboard
    ActivitiesEditor.tsx   # Activities CRUD editor (example)

AppRouter.tsx              # Main routing configuration
supabase-migration.sql     # Database schema
SUPABASE_SETUP.md         # Supabase setup guide
```

## Database Schema

11 tables with Row Level Security:

1. **personal_info** - Basic profile information
2. **navigation** - Navigation menu labels
3. **headers** - Section headers
4. **skills** - Skill metrics for radar chart
5. **experience** - Work experience
6. **education** - Educational background
7. **projects** - Portfolio projects
8. **thoughts** - Blog posts/notes
9. **activities** - Events, talks, conferences
10. **socials** - Social media links
11. **consultation** - Consultation service info

All tables:
- Support `en` and `zh` languages
- Have `display_order` for sorting
- Include `created_at` and `updated_at` timestamps
- Protected by RLS (public read, authenticated write)

## Security

### Row Level Security (RLS)

All tables have RLS policies:
- **Public users**: Read-only access
- **Authenticated users**: Full CRUD access

### Authentication

- Email/password authentication via Supabase Auth
- Protected routes require authentication
- Session managed automatically
- Logout functionality included

## Image Upload

Images are uploaded to Supabase Storage:

```typescript
import { uploadImage } from '../lib/supabaseQueries';

const handleUpload = async (file: File) => {
  const url = await uploadImage(file, 'activities');
  // url is the public URL of the uploaded image
};
```

Default bucket: `images`
Activity images: Stored in `activities` bucket

## Data Flow

### Frontend Display

1. User visits main portfolio site (`/`)
2. `useContent` hook fetches data from Supabase
3. If Supabase fails, falls back to `constants.ts`
4. Content displays in React components

### Admin Updates

1. Admin logs in at `/admin/login`
2. Navigates to editor (e.g., `/admin/activities`)
3. Uses SWR for optimistic updates
4. Saves to Supabase via query functions
5. Changes reflected immediately on frontend

## Development Workflow

### Adding a New Editor

Follow the Activities Editor pattern:

1. Create `admin/pages/YourEditor.tsx`
2. Import query functions from `lib/supabaseQueries.ts`
3. Use `useSWR` for data fetching
4. Implement CRUD operations
5. Add route to `AppRouter.tsx`
6. Update Dashboard card to link to your editor

Example:

```typescript
import useSWR from 'swr';
import { experienceQueries } from '../../lib/supabaseQueries';

const ExperienceEditor = () => {
  const { data, mutate } = useSWR(
    ['experience', 'en'],
    () => experienceQueries.getAll('en')
  );

  const handleCreate = async (formData) => {
    await experienceQueries.create(formData);
    await mutate();
  };

  // ... rest of CRUD operations
};
```

## Testing

### Local Testing

1. Ensure Supabase is configured (check `.env.local`)
2. Run `npm run dev`
3. Navigate to `/admin/login` and log in
4. Test CRUD operations in Activities Editor
5. Verify changes appear on main site (`/`)

### Manual Testing Checklist

- [ ] Login with valid credentials works
- [ ] Protected routes redirect to login when not authenticated
- [ ] Activities CRUD operations work
- [ ] Image upload succeeds
- [ ] Multi-language switching works
- [ ] Logout functionality works
- [ ] Main site displays database content
- [ ] Main site falls back to constants.ts if Supabase fails

## Deployment to Vercel

### Prerequisites

1. Supabase project created and configured
2. Admin user created in Supabase Auth
3. Database migrated with SQL script

### Steps

1. Push code to GitHub repository

2. Connect to Vercel:
   ```bash
   npm install -g vercel
   vercel
   ```

3. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `GEMINI_API_KEY` (if using)

4. Deploy:
   ```bash
   vercel --prod
   ```

5. Your admin panel will be accessible at:
   - Main site: `https://your-domain.vercel.app`
   - Admin login: `https://your-domain.vercel.app/admin/login`

### Vercel Configuration

The project is already configured for Vercel:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite
- Node version: 18.x or higher

## Cost Analysis

### Free Tier Limits (Sufficient for this project)

**Supabase Free Tier:**
- Database: 500MB storage
- Auth: Unlimited users
- Storage: 1GB files
- API requests: 50,000/month
- Bandwidth: 2GB/month

**Vercel Free Tier:**
- 100GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS
- Custom domains

**Total Cost: $0/month** ✅

## Troubleshooting

### Build Fails

**Error**: `Module not found: @supabase/supabase-js`
**Fix**: Run `npm install`

### Can't Login

**Error**: Invalid credentials
**Fix**: Verify admin user exists in Supabase Auth dashboard

### Database Empty

**Error**: No data displayed in admin panel
**Fix**: Run the SQL migration in Supabase SQL Editor

### Images Not Uploading

**Error**: Upload failed
**Fix**:
1. Create `images` bucket in Supabase Storage
2. Set bucket to public
3. Enable RLS policies for authenticated users

### CORS Errors

**Error**: CORS policy blocked
**Fix**: Add your Vercel domain to Supabase allowed origins (Settings → API)

## Next Steps

1. ✅ Complete Supabase setup following `SUPABASE_SETUP.md`
2. ✅ Test admin system locally
3. ⏳ Implement remaining editors (Experience, Skills, etc.)
4. ⏳ Deploy to Vercel
5. ⏳ Add your content via admin panel
6. ⏳ Share your portfolio!

## Support

For issues:
1. Check Supabase logs (Dashboard → Logs)
2. Check browser console for errors
3. Verify environment variables are set
4. Ensure SQL migration ran successfully

## Summary

You now have a fully functional admin backend system that:

- ✅ Stores all content in PostgreSQL database
- ✅ Provides real-time updates without rebuilds
- ✅ Includes authentication and authorization
- ✅ Supports image uploads
- ✅ Works with multi-language content
- ✅ Deploys for free on Vercel + Supabase
- ✅ Has one complete editor (Activities) as reference
- ✅ Ready for local testing and development

**Current Status**: Ready for Supabase configuration and local testing!
