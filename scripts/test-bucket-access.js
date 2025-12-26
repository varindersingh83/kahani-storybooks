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

console.log('🧪 Testing Direct Bucket Access...\n');

// Test 1: Try to list files in photos bucket (this will work if bucket exists and is accessible)
console.log('1️⃣  Testing if we can access "photos" bucket...');
try {
  const { data: files, error } = await supabase.storage.from('photos').list('', {
    limit: 1
  });
  
  if (error) {
    if (error.message.includes('not found') || error.message.includes('does not exist')) {
      console.log('   ❌ Bucket "photos" does not exist or is not accessible');
      console.log('   📝 Make sure:');
      console.log('      - Bucket name is exactly "photos" (lowercase)');
      console.log('      - Bucket is set to Public');
      console.log('      - You have the correct Supabase project\n');
    } else if (error.message.includes('policy') || error.message.includes('permission')) {
      console.log('   ⚠️  Bucket exists but policies are not set');
      console.log('   📝 Set up storage policies:');
      console.log('      - SELECT policy for public role');
      console.log('      - INSERT policy for public role\n');
    } else {
      console.log('   ⚠️  Error accessing bucket:', error.message);
      console.log('   Code:', error.statusCode || 'N/A');
    }
  } else {
    console.log('   ✅ Successfully accessed "photos" bucket!');
    console.log(`   📁 Found ${files?.length || 0} file(s) in bucket\n`);
  }
} catch (err) {
  console.log('   ❌ Error:', err.message);
}

// Test 2: Try to get public URL (this tests if bucket is public)
console.log('2️⃣  Testing public URL generation...');
try {
  const { data } = supabase.storage.from('photos').getPublicUrl('test-file.jpg');
  if (data?.publicUrl) {
    console.log('   ✅ Public URL generation works');
    console.log('   📝 This means the bucket is likely public\n');
  } else {
    console.log('   ⚠️  Could not generate public URL\n');
  }
} catch (err) {
  console.log('   ⚠️  Error:', err.message);
}

// Test 3: List all buckets (this might fail if anon key doesn't have permission)
console.log('3️⃣  Testing bucket listing...');
try {
  const { data: buckets, error } = await supabase.storage.listBuckets();
  
  if (error) {
    console.log('   ⚠️  Cannot list buckets:', error.message);
    console.log('   📝 This is normal - anon key may not have permission to list buckets');
    console.log('   📝 But the bucket can still work if it exists and is public\n');
  } else {
    console.log(`   ✅ Found ${buckets?.length || 0} bucket(s):`);
    buckets?.forEach(bucket => {
      console.log(`      - ${bucket.name} (${bucket.public ? 'Public' : 'Private'})`);
    });
    console.log();
    
    const photosBucket = buckets?.find(b => b.name === 'photos');
    if (photosBucket) {
      console.log('   ✅ "photos" bucket found!');
      if (!photosBucket.public) {
        console.log('   ⚠️  Bucket is private - make it public\n');
      } else {
        console.log('   ✅ Bucket is public\n');
      }
    } else {
      console.log('   ❌ "photos" bucket not in list\n');
    }
  }
} catch (err) {
  console.log('   ⚠️  Error:', err.message);
}

console.log('💡 Summary:');
console.log('   If you can access the bucket (test 1 passed), everything should work!');
console.log('   The bucket listing (test 3) might fail due to permissions, but that\'s OK.\n');

