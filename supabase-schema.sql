-- Supabase Database Schema for Kahani Storybooks
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  product_type VARCHAR(20) NOT NULL,
  child_name VARCHAR(100),
  child_age INTEGER,
  dedication TEXT,
  photo_urls TEXT[], -- Array of photo URLs from Supabase Storage
  customer_name VARCHAR(100) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  shipping_address JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'pending',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact submissions table
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Giveaway entries table
CREATE TABLE giveaway_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  week VARCHAR(20) NOT NULL -- e.g., "2024-W01"
);

-- Create indexes for better query performance
CREATE INDEX idx_orders_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_giveaway_week ON giveaway_entries(week);
CREATE INDEX idx_giveaway_email ON giveaway_entries(email);
CREATE INDEX idx_contact_email ON contact_submissions(email);
CREATE INDEX idx_contact_created_at ON contact_submissions(created_at);

-- Enable Row Level Security (RLS) - Optional but recommended
-- ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE giveaway_entries ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (if using RLS)
-- Allow anyone to insert orders
-- CREATE POLICY "Allow public insert on orders" ON orders FOR INSERT TO public WITH CHECK (true);
-- CREATE POLICY "Allow public insert on contact_submissions" ON contact_submissions FOR INSERT TO public WITH CHECK (true);
-- CREATE POLICY "Allow public insert on giveaway_entries" ON giveaway_entries FOR INSERT TO public WITH CHECK (true);

