-- ====================================================================
-- GlobeTrotter Inquiry Form Database Schema
-- Compatible with Supabase (PostgreSQL), MySQL, and SQLite
-- ====================================================================

-- 1. PostgreSQL / Supabase DDL
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    destination_interest VARCHAR(255),
    travel_dates VARCHAR(100),
    number_of_guests INTEGER DEFAULT 1,
    budget_range VARCHAR(50),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'contacted', 'resolved', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) for Supabase
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Drop old policies to prevent policy conflicts
DROP POLICY IF EXISTS "Allow public insert on inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow admin read access on inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow public select on inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Enable all access for all users" ON public.inquiries;

-- Create policy allowing full read & write access for inquiries table
CREATE POLICY "Enable all access for all users" 
ON public.inquiries 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Index for fast query filtering by status & email
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON public.inquiries(email);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);


-- 2. MySQL Equivalent DDL (For MySQL / MariaDB Server)
/*
CREATE TABLE IF NOT EXISTS inquiries (
    id VARCHAR(36) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    destination_interest VARCHAR(255),
    travel_dates VARCHAR(100),
    number_of_guests INT DEFAULT 1,
    budget_range VARCHAR(50),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
*/


-- 3. SQLite Equivalent DDL (For SQLite local dev)
/*
CREATE TABLE IF NOT EXISTS inquiries (
    id TEXT PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    destination_interest TEXT,
    travel_dates TEXT,
    number_of_guests INTEGER DEFAULT 1,
    budget_range TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
*/
