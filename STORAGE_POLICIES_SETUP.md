# Storage Policies Setup Guide

Your `photos` bucket exists but shows "0" policies. You need to set up policies to allow photo uploads and access.

## Step-by-Step Instructions

### 1. Navigate to Policies
1. In Supabase Dashboard, go to **Storage**
2. Click on the **"photos"** bucket (or click the "..." menu → "Edit bucket")
3. Click on the **"Policies"** tab (next to "Buckets" and "Settings")

### 2. Create Policy 1: Public Read Access

1. Click **"New Policy"** button
2. Select **"For full customization"** (or use a template)
3. Fill in:
   - **Policy name**: `Public read access`
   - **Allowed operation**: Select `SELECT` (for reading/downloading files)
   - **Target roles**: Select `public`
   - **USING expression**: `true`
   - **WITH CHECK expression**: Leave empty (not needed for SELECT)
4. Click **"Review"** → **"Save policy"**

### 3. Create Policy 2: Public Upload Access

1. Click **"New Policy"** button again
2. Select **"For full customization"**
3. Fill in:
   - **Policy name**: `Public uploads`
   - **Allowed operation**: Select `INSERT` (for uploading files)
   - **Target roles**: Select `public`
   - **USING expression**: Leave empty (not needed for INSERT)
   - **WITH CHECK expression**: `true`
4. Click **"Review"** → **"Save policy"**

### 4. Verify Policies

After creating both policies, you should see:
- **Policy count**: Should show "2" instead of "0"
- Two policies listed:
  - `Public read access` (SELECT)
  - `Public uploads` (INSERT)

## Alternative: Make Bucket Public

If you haven't already, make sure the bucket is public:

1. Go to **Storage** → **photos** bucket
2. Click **"Settings"** tab
3. Find **"Public bucket"** toggle
4. Make sure it's **enabled** (turned on)
5. Save changes

## Quick Policy SQL (Alternative Method)

If you prefer using SQL, you can also run this in the SQL Editor:

```sql
-- Allow public read access
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'photos');

-- Allow public uploads
CREATE POLICY "Public uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'photos');
```

## Test After Setup

Once policies are set up, run:
```bash
node scripts/check-setup.js
```

It should now show:
- ✅ "photos" bucket found
- ✅ Bucket is public
- ✅ All setup complete!

