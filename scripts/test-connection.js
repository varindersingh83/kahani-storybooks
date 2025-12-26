#!/usr/bin/env node

/**
 * Quick test script to verify Supabase connection
 * Run: node scripts/test-connection.js
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config } from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Load environment variables
config({ path: join(rootDir, '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('🔍 Testing Supabase Connection...\n');

if (!supabaseUrl || supabaseUrl.includes('your_supabase') || !supabaseUrl.startsWith('https://')) {
  console.error('❌ VITE_SUPABASE_URL is not set correctly');
  console.error('   Make sure .env.local has a valid Supabase URL\n');
  process.exit(1);
}

if (!supabaseKey || supabaseKey.includes('your_supabase') || supabaseKey.length < 50) {
  console.error('❌ VITE_SUPABASE_ANON_KEY is not set correctly');
  console.error('   Make sure .env.local has a valid Supabase anon key\n');
  process.exit(1);
}

console.log('✅ Environment variables found');
console.log(`   URL: ${supabaseUrl.substring(0, 30)}...`);
console.log(`   Key: ${supabaseKey.substring(0, 20)}...\n`);

// Test connection
console.log('🔌 Testing Supabase connection...');
try {
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Test by trying to list tables (this will fail if tables don't exist, but connection will work)
  const { data, error } = await supabase.from('orders').select('count').limit(0);
  
  if (error) {
    if (error.code === 'PGRST116') {
      console.log('⚠️  Connected successfully, but tables not found yet');
      console.log('   📝 Next step: Run supabase-schema.sql in Supabase SQL Editor\n');
    } else if (error.code === 'PGRST301' || error.message.includes('JWT')) {
      console.error('❌ Authentication failed');
      console.error('   Check your VITE_SUPABASE_ANON_KEY is correct\n');
      process.exit(1);
    } else {
      console.log('⚠️  Connected, but got error:', error.message);
      console.log('   This might be normal if tables don\'t exist yet\n');
    }
  } else {
    console.log('✅ Connected successfully!');
    console.log('   Database tables exist\n');
  }
  
  // Test storage
  console.log('📦 Testing Storage connection...');
  const { data: buckets, error: storageError } = await supabase.storage.listBuckets();
  
  if (storageError) {
    console.error('❌ Storage error:', storageError.message);
    console.error('   Check your Supabase project settings\n');
    process.exit(1);
  }
  
  const photosBucket = buckets?.find(b => b.name === 'photos');
  if (!photosBucket) {
    console.log('⚠️  "photos" bucket not found');
    console.log('   📝 Next step: Create a public bucket named "photos" in Supabase Storage\n');
  } else {
    console.log('✅ "photos" bucket found');
    if (!photosBucket.public) {
      console.log('⚠️  Bucket is private - make it public for photo uploads to work\n');
    } else {
      console.log('✅ Bucket is public\n');
    }
  }
  
  console.log('🎉 Connection test complete!\n');
  console.log('📋 Remaining steps:');
  console.log('   1. Run supabase-schema.sql in Supabase SQL Editor');
  console.log('   2. Create "photos" storage bucket (if not done)');
  console.log('   3. Set storage policies for public read/upload');
  console.log('   4. Test the app: npm run dev\n');
  
} catch (error) {
  console.error('❌ Connection failed:', error.message);
  console.error('   Check your VITE_SUPABASE_URL is correct\n');
  process.exit(1);
}

