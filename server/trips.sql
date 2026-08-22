-- ====================================================================
-- GlobeTrotter Trips Database Schema
-- Paste this entire script into your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/xzryhazxwabzkpajabam/sql/new
-- ====================================================================

-- 1. Create public.trips table for Supabase Table Editor & Persistence
CREATE TABLE IF NOT EXISTS public.trips (
    id TEXT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    description TEXT,
    status VARCHAR(50) DEFAULT 'upcoming',
    "startDate" VARCHAR(50),
    "endDate" VARCHAR(50),
    "totalDays" INTEGER DEFAULT 5,
    "coverImage" TEXT,
    "totalBudget" NUMERIC DEFAULT 2500,
    "spentBudget" NUMERIC DEFAULT 0,
    currency VARCHAR(10) DEFAULT 'USD',
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    user_email VARCHAR(255),
    travelers JSONB DEFAULT '[]'::jsonb,
    cities JSONB DEFAULT '[]'::jsonb,
    "budgetBreakdown" JSONB DEFAULT '[]'::jsonb,
    itinerary JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Also add alternative snake_case columns for compatibility
ALTER TABLE public.trips ADD COLUMN IF NOT EXISTS start_date VARCHAR(50);
ALTER TABLE public.trips ADD COLUMN IF NOT EXISTS end_date VARCHAR(50);
ALTER TABLE public.trips ADD COLUMN IF NOT EXISTS total_days INTEGER DEFAULT 5;
ALTER TABLE public.trips ADD COLUMN IF NOT EXISTS cover_image TEXT;
ALTER TABLE public.trips ADD COLUMN IF NOT EXISTS total_budget NUMERIC DEFAULT 2500;
ALTER TABLE public.trips ADD COLUMN IF NOT EXISTS spent_budget NUMERIC DEFAULT 0;

-- 2. Enable Row Level Security (RLS) for Supabase
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;

-- Drop old policies if existing
DROP POLICY IF EXISTS "Allow public select on trips" ON public.trips;
DROP POLICY IF EXISTS "Allow public insert on trips" ON public.trips;
DROP POLICY IF EXISTS "Allow public update on trips" ON public.trips;
DROP POLICY IF EXISTS "Allow public delete on trips" ON public.trips;
DROP POLICY IF EXISTS "Enable all access for all users on trips" ON public.trips;

-- 3. Create Policy Allowing Full Public Read/Write Access to Trips
CREATE POLICY "Enable all access for all users on trips"
ON public.trips
FOR ALL
USING (true)
WITH CHECK (true);

-- Index for fast queries
CREATE INDEX IF NOT EXISTS idx_trips_created_at ON public.trips(created_at DESC);
