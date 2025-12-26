# Supabase Setup Guide

This guide will help you set up Supabase integration for the Kahani Storybooks application.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. Node.js and npm installed

## Step 1: Install Dependencies

```bash
npm install @supabase/supabase-js
```

## Step 2: Create Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in:
   - **Name**: Kahani Storybooks (or your preferred name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your users
4. Wait for the project to be created (takes ~2 minutes)

## Step 3: Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

## Step 4: Set Up Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **For Vercel deployment:**
   - Go to your Vercel project settings
   - Navigate to **Environment Variables**
   - Add the same variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

## Step 5: Create Database Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the contents of `supabase-schema.sql`
4. Click **Run** (or press Cmd/Ctrl + Enter)
5. Verify tables were created by going to **Table Editor**

You should see three tables:
- `orders`
- `contact_submissions`
- `giveaway_entries`

## Step 6: Set Up Storage Bucket

1. In Supabase dashboard, go to **Storage**
2. Click **New bucket**
3. Name it: `photos`
4. Make it **Public** (uncheck "Private bucket")
5. Click **Create bucket**

### Set Storage Policies

1. Click on the `photos` bucket
2. Go to **Policies** tab
3. Click **New Policy** → **For full customization**
4. Create a policy for public read access:
   - **Policy name**: `Public read access`
   - **Allowed operation**: `SELECT`
   - **Target roles**: `public`
   - **USING expression**: `true`
   - Click **Review** → **Save policy**

5. Create a policy for authenticated uploads:
   - **Policy name**: `Authenticated uploads`
   - **Allowed operation**: `INSERT`
   - **Target roles**: `authenticated`
   - **WITH CHECK expression**: `true`
   - Click **Review** → **Save policy**

   **Note**: Since we're using the anon key, you may need to use the service role key for uploads, or create a policy that allows public uploads (less secure but simpler for now).

   For public uploads (simpler but less secure):
   - **Policy name**: `Public uploads`
   - **Allowed operation**: `INSERT`
   - **Target roles**: `public`
   - **WITH CHECK expression**: `true`

## Step 7: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Test the forms:
   - Try submitting the contact form
   - Try entering the giveaway
   - Try creating an order (full flow)

3. Check Supabase:
   - Go to **Table Editor** to see saved data
   - Go to **Storage** → `photos` bucket to see uploaded images

## Troubleshooting

### "Missing Supabase environment variables" error
- Make sure `.env.local` exists and has the correct variables
- Restart your dev server after adding environment variables
- For Vercel, make sure environment variables are set in project settings

### "Failed to upload photo" error
- Check that the `photos` bucket exists and is public
- Verify storage policies allow INSERT operations
- Check browser console for detailed error messages

### "Failed to save order" error
- Verify database tables were created correctly
- Check that RLS (Row Level Security) is disabled or policies are set correctly
- Check Supabase logs in the dashboard

### Photos not displaying
- Verify the bucket is set to **Public**
- Check that the `SELECT` policy exists for the `photos` bucket
- Check the photo URLs in the database - they should be public URLs

## Security Notes

- The `anon` key is safe to use in client-side code
- Never commit `.env.local` to git (it's already in `.gitignore`)
- For production, consider enabling RLS and creating proper policies
- For sensitive operations, consider using Supabase Edge Functions with service role key

## Next Steps

- Set up email notifications for new orders
- Add order status tracking
- Implement payment processing (Stripe integration)
- Add admin dashboard to view orders

