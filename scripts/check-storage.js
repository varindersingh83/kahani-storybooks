#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

config({ path: join(rootDir, '.env.local') });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

console.log('📦 Checking Storage Buckets...\n');

try {
  const { data: buckets, error } = await supabase.storage.listBuckets();
  
  if (error) {
    console.error('❌ Error accessing storage:', error.message);
    process.exit(1);
  }
  
  if (!buckets || buckets.length === 0) {
    console.log('⚠️  No buckets found in your Supabase project');
    console.log('\n📝 Create a bucket:');
    console.log('   1. Go to Supabase Dashboard → Storage');
    console.log('   2. Click "New bucket"');
    console.log('   3. Name: photos');
    console.log('   4. Make it Public (uncheck "Private bucket")');
    console.log('   5. Click "Create bucket"\n');
  } else {
    console.log(`✅ Found ${buckets.length} bucket(s):\n`);
    buckets.forEach(bucket => {
      console.log(`   - ${bucket.name}`);
      console.log(`     Public: ${bucket.public ? '✅ Yes' : '❌ No'}`);
      console.log(`     Created: ${bucket.created_at}\n`);
    });
    
    const photosBucket = buckets.find(b => b.name === 'photos');
    if (!photosBucket) {
      console.log('❌ "photos" bucket not found');
      console.log('\n📝 Create the "photos" bucket:');
      console.log('   1. Go to Supabase Dashboard → Storage');
      console.log('   2. Click "New bucket"');
      console.log('   3. Name: photos');
      console.log('   4. Make it Public (uncheck "Private bucket")');
      console.log('   5. Click "Create bucket"\n');
    } else {
      console.log('✅ "photos" bucket found!');
      if (!photosBucket.public) {
        console.log('⚠️  Bucket is private - make it public:');
        console.log('   Go to Storage → photos → Settings → Make Public\n');
      } else {
        console.log('✅ Bucket is public\n');
        
        // Test policies
        console.log('🔐 Testing Storage Policies...');
        try {
          // Test read access
          const { error: listError } = await supabase.storage.from('photos').list('', { limit: 1 });
          if (listError && listError.message.includes('policy')) {
            console.log('⚠️  Read policy may need to be set');
          } else {
            console.log('✅ Read access works');
          }
          
          console.log('\n📝 If uploads fail, ensure these policies exist:');
          console.log('   - SELECT policy for public role');
          console.log('   - INSERT policy for public role');
          console.log('   Go to Storage → photos → Policies\n');
        } catch (err) {
          console.log('⚠️  Could not test policies');
        }
      }
    }
  }
} catch (error) {
  console.error('❌ Storage check failed:', error.message);
  process.exit(1);
}

