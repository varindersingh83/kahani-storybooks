# Supabase Setup Checklist

## ✅ Completed
- [x] Install Supabase package (`@supabase/supabase-js`)
- [x] Create Supabase client utility (`src/lib/supabase.ts`)
- [x] Create API service functions (`src/lib/api.ts`)
- [x] Update all components to use Supabase
- [x] Code compiles successfully

## 📋 Remaining Steps (Manual - Requires Your Supabase Account)

### Step 1: Create Supabase Project
1. Go to https://supabase.com and sign in (or create account)
2. Click **"New Project"**
3. Fill in:
   - **Name**: `Kahani Storybooks` (or your preferred name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your users
4. Wait ~2 minutes for project creation

### Step 2: Get API Credentials
1. In Supabase dashboard, go to **Settings** → **API**
2. Copy:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string under "Project API keys")

### Step 3: Create Environment Variables
1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **For Vercel** (if deploying):
   - Go to Vercel project → **Settings** → **Environment Variables**
   - Add:
     - `VITE_SUPABASE_URL` = your Supabase URL
     - `VITE_SUPABASE_ANON_KEY` = your anon key

### Step 4: Create Database Tables
1. In Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Open `supabase-schema.sql` from this project
4. Copy and paste the entire SQL script
5. Click **"Run"** (or press Cmd/Ctrl + Enter)
6. Verify: Go to **Table Editor** - you should see:
   - `orders`
   - `contact_submissions`
   - `giveaway_entries`

### Step 5: Set Up Storage Bucket
1. In Supabase dashboard, go to **Storage**
2. Click **"New bucket"**
3. Name: `photos`
4. Make it **Public** (uncheck "Private bucket")
5. Click **"Create bucket"**

### Step 6: Set Storage Policies
1. Click on the `photos` bucket
2. Go to **Policies** tab
3. Click **"New Policy"** → **"For full customization"**

   **Policy 1 - Public Read:**
   - Policy name: `Public read access`
   - Allowed operation: `SELECT`
   - Target roles: `public`
   - USING expression: `true`
   - Click **Review** → **Save policy**

   **Policy 2 - Public Upload:**
   - Policy name: `Public uploads`
   - Allowed operation: `INSERT`
   - Target roles: `public`
   - WITH CHECK expression: `true`
   - Click **Review** → **Save policy**

### Step 7: Test the Integration
1. Start dev server:
   ```bash
   npm run dev
   ```

2. Test each feature:
   - ✅ Contact form submission
   - ✅ Giveaway entry
   - ✅ Full order flow (product → upload → shipping)

3. Verify in Supabase:
   - **Table Editor**: Check for saved data
   - **Storage** → `photos`: Check for uploaded images

## 🎉 You're Done!

Once all steps are complete, your app will:
- ✅ Save all orders to Supabase
- ✅ Upload photos to Supabase Storage
- ✅ Save contact form submissions
- ✅ Save giveaway entries

## 🐛 Troubleshooting

**"Missing Supabase environment variables" error:**
- Make sure `.env.local` exists and has correct values
- Restart dev server after creating `.env.local`

**"Failed to upload photo" error:**
- Check that `photos` bucket exists and is public
- Verify storage policies allow INSERT operations

**"Failed to save order" error:**
- Verify database tables were created
- Check Supabase logs in dashboard

