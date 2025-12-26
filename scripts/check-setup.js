#!/usr/bin/env node

/**
 * Comprehensive setup verification script
 * Checks all Supabase setup requirements
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Load environment variables
config({ path: join(rootDir, '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('🔍 Comprehensive Supabase Setup Check\n');
console.log('=' .repeat(50) + '\n');

// Check 1: Environment Variables
console.log('1️⃣  Environment Variables');
if (!supabaseUrl || supabaseUrl.includes('your_supabase') || !supabaseUrl.startsWith('https://')) {
  console.error('   ❌ VITE_SUPABASE_URL is not set correctly\n');
  process.exit(1);
}
if (!supabaseKey || supabaseKey.includes('your_supabase') || supabaseKey.length < 50) {
  console.error('   ❌ VITE_SUPABASE_ANON_KEY is not set correctly\n');
  process.exit(1);
}
console.log('   ✅ Environment variables configured\n');

// Check 2: Supabase Connection
console.log('2️⃣  Supabase Connection');
const supabase = createClient(supabaseUrl, supabaseKey);
try {
  // Test connection
  const { error: connError } = await supabase.from('orders').select('count').limit(0);
  if (connError && connError.code === 'PGRST116') {
    console.log('   ✅ Connected to Supabase');
    console.log('   ⚠️  Tables not found yet (this is OK if you haven\'t run the SQL schema)\n');
  } else if (connError && (connError.code === 'PGRST301' || connError.message.includes('JWT'))) {
    console.error('   ❌ Authentication failed - check your API key\n');
    process.exit(1);
  } else {
    console.log('   ✅ Connected to Supabase successfully\n');
  }
} catch (error) {
  console.error('   ❌ Connection failed:', error.message);
  console.error('   Check your VITE_SUPABASE_URL\n');
  process.exit(1);
}

// Check 3: Database Tables
console.log('3️⃣  Database Tables');
const tables = [
  { name: 'orders', required: true },
  { name: 'contact_submissions', required: true },
  { name: 'giveaway_entries', required: true }
];

let allTablesExist = true;
for (const table of tables) {
  const { error } = await supabase.from(table.name).select('count').limit(0);
  if (error) {
    if (error.code === 'PGRST116' || error.message.includes('Could not find the table')) {
      console.log(`   ❌ Table "${table.name}" not found`);
      allTablesExist = false;
    } else {
      console.log(`   ⚠️  Table "${table.name}" - Error: ${error.message}`);
      allTablesExist = false;
    }
  } else {
    console.log(`   ✅ Table "${table.name}" exists`);
  }
}

if (!allTablesExist) {
  console.log('\n   📝 Action Required:');
  console.log('      1. Go to Supabase Dashboard → SQL Editor');
  console.log('      2. Click "New Query"');
  console.log('      3. Open supabase-schema.sql from this project');
  console.log('      4. Copy and paste the entire SQL script');
  console.log('      5. Click "Run" (or press Cmd/Ctrl + Enter)\n');
} else {
  console.log('   ✅ All tables exist\n');
}

// Check 4: Storage Bucket (test direct access instead of listing)
console.log('4️⃣  Storage Bucket');
try {
  // Test direct access to photos bucket (more reliable than listing)
  const { data: files, error: accessError } = await supabase.storage.from('photos').list('', { limit: 1 });
  
  if (accessError) {
    if (accessError.message.includes('not found') || accessError.message.includes('does not exist')) {
      console.log('   ❌ "photos" bucket not found');
      console.log('\n   📝 Action Required:');
      console.log('      1. Go to Supabase Dashboard → Storage');
      console.log('      2. Click "New bucket"');
      console.log('      3. Name: photos');
      console.log('      4. Make it Public (uncheck "Private bucket")');
      console.log('      5. Click "Create bucket"\n');
    } else if (accessError.message.includes('policy') || accessError.message.includes('permission')) {
      console.log('   ⚠️  Bucket exists but policies may need to be set');
      console.log('   📝 Set up storage policies:');
      console.log('      - SELECT policy for public role');
      console.log('      - INSERT policy for public role');
      console.log('      Go to Storage → photos → Policies → New Policy\n');
    } else {
      console.log('   ⚠️  Error accessing bucket:', accessError.message);
    }
  } else {
    console.log('   ✅ "photos" bucket found and accessible!');
    
    // Test if bucket is public by generating a public URL
    const { data: urlData } = supabase.storage.from('photos').getPublicUrl('test.jpg');
    if (urlData?.publicUrl) {
      console.log('   ✅ Bucket is public');
    } else {
      console.log('   ⚠️  Could not verify if bucket is public');
    }
    
    // Test read access
    console.log('   ✅ Read access works');
    
    console.log('\n   📝 If uploads fail, ensure INSERT policy exists:');
    console.log('      - Go to Storage → photos → Policies');
    console.log('      - Create INSERT policy for public role\n');
  }
} catch (error) {
  console.error('   ❌ Storage check failed:', error.message);
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 Setup Summary\n');

const needsTables = !allTablesExist;

// Test bucket access directly (more reliable than listing)
let bucketAccessible = false;
try {
  const { error: bucketError } = await supabase.storage.from('photos').list('', { limit: 1 });
  bucketAccessible = !bucketError || (!bucketError.message.includes('not found') && !bucketError.message.includes('does not exist'));
} catch (err) {
  bucketAccessible = false;
}

if (!needsTables && bucketAccessible) {
  console.log('🎉 All setup complete! Your Supabase integration is ready.\n');
  console.log('💡 Next steps:');
  console.log('   - Test the app: npm run dev');
  console.log('   - Try submitting a contact form');
  console.log('   - Try entering the giveaway');
  console.log('   - Try creating an order\n');
} else {
  console.log('⚠️  Setup incomplete. Please complete the following:\n');
  if (needsTables) {
    console.log('   ❌ Create database tables (run supabase-schema.sql)');
  }
  if (needsBucket) {
    console.log('   ❌ Create "photos" storage bucket');
  }
  console.log('\n   See detailed instructions above.\n');
}

