# Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in the details:
   - **Project name**: frankfika-portfolio
   - **Database password**: (create a strong password and save it)
   - **Region**: Choose closest to you
5. Wait for the project to be created (2-3 minutes)

## Step 2: Get Your Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Find these two values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

## Step 3: Update .env.local

Open your `.env.local` file and replace the placeholders:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 4: Run Database Migration

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New query**
3. Copy the entire content of `supabase-migration.sql`
4. Paste it into the SQL Editor
5. Click **Run** (or press Cmd/Ctrl + Enter)
6. You should see "Success. No rows returned"

## Step 5: Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Ensure **Email** is enabled (it should be by default)
3. Disable email confirmation for testing:
   - Go to **Authentication** → **Settings**
   - Under "Auth Providers", find "Email"
   - Turn OFF "Confirm email" (for development only)

## Step 6: Create Your Admin User

1. Go to **Authentication** → **Users**
2. Click **Add user**
3. Choose **Create new user**
4. Fill in:
   - **Email**: your email
   - **Password**: create a strong password
   - **Auto Confirm User**: ✅ Check this box
5. Click **Create user**

## Verification

After completing these steps, you should have:
- ✅ Supabase project created
- ✅ Credentials added to `.env.local`
- ✅ Database schema created (11 tables)
- ✅ Admin user created
- ✅ Ready to run the app locally

## Next Steps

1. Restart your dev server: `npm run dev`
2. Navigate to `/admin` in your browser
3. Log in with your admin credentials
4. Start managing your content!
