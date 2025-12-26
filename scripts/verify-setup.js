#!/usr/bin/env node

/**
 * Verification script to check if Supabase is properly configured
 * Run: node scripts/verify-setup.js
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🔍 Verifying Supabase Setup...\n');

// Check 1: Environment variables
console.log('1️⃣  Checking environment variables...');
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || supabaseUrl.includes('your_supabase')) {
  console.error('   ❌ VITE_SUPABASE_URL is not set or is placeholder');
  console.error('   📝 Create .env.local and add your Supabase URL\n');
  process.exit(1);
}

if (!supabaseKey || supabaseKey.includes('your_supabase')) {
  console.error('   ❌ VITE_SUPABASE_ANON_KEY is not set or is placeholder');
  console.error('   📝 Add your Supabase anon key to .env.local\n');
  process.exit(1);
}

console.log('   ✅ Environment variables found\n');

// Check 2: Supabase connection
console.log('2️⃣  Testing Supabase connection...');
try {
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Test connection by checking if we can query (will fail if tables don't exist)
  const { error } = await supabase.from('orders').select('count').limit(0);
  
  if (error && error.code === 'PGRST116') {
    console.error('   ❌ Tables not found. Run supabase-schema.sql in Supabase SQL Editor');
    process.exit(1);
  }
  
  console.log('   ✅ Connected to Supabase successfully\n');
} catch (error) {
  console.error('   ❌ Failed to connect to Supabase');
  console.error('   Error:', error.message);
  console.error('   📝 Check your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY\n');
  process.exit(1);
}

// Check 3: Storage bucket
console.log('3️⃣  Checking storage bucket...');
try {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: buckets, error } = await supabase.storage.listBuckets();
  
  if (error) {
    console.error('   ❌ Failed to list buckets:', error.message);
    process.exit(1);
  }
  
  const photosBucket = buckets?.find(b => b.name === 'photos');
  
  if (!photosBucket) {
    console.error('   ❌ "photos" bucket not found');
    console.error('   📝 Create a public bucket named "photos" in Supabase Storage\n');
    process.exit(1);
  }
  
  if (photosBucket.public === false) {
    console.warn('   ⚠️  "photos" bucket is private. Make it public for photo uploads to work.');
  } else {
    console.log('   ✅ "photos" bucket found and is public\n');
  }
} catch (error) {
  console.error('   ❌ Failed to check storage:', error.message);
  process.exit(1);
}

// Check 4: Database tables
console.log('4️⃣  Checking database tables...');
try {
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  const tables = ['orders', 'contact_submissions', 'giveaway_entries'];
  const missingTables = [];
  
  for (const table of tables) {
    const { error } = await supabase.from(table).select('count').limit(0);
    if (error) {
      missingTables.push(table);
    }
  }
  
  if (missingTables.length > 0) {
    console.error(`   ❌ Missing tables: ${missingTables.join(', ')}`);
    console.error('   📝 Run supabase-schema.sql in Supabase SQL Editor\n');
    process.exit(1);
  }
  
  console.log('   ✅ All required tables exist\n');
} catch (error) {
  console.error('   ❌ Failed to check tables:', error.message);
  process.exit(1);
}

console.log('🎉 All checks passed! Your Supabase setup is complete.\n');
console.log('💡 You can now test the app by running: npm run dev\n');

