import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables
export interface Order {
  id: string;
  order_number: string;
  product_type: string;
  child_name?: string;
  child_age?: number;
  dedication?: string;
  photo_urls?: string[];
  customer_name: string;
  customer_email: string;
  shipping_address: {
    fullName: string;
    email: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface GiveawayEntry {
  id: string;
  name: string;
  email: string;
  week: string;
  created_at: string;
}

