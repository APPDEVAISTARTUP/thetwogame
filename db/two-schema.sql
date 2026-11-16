-- TWO website database (your own Supabase project, separate from Lovable Cloud).
-- Run this once in Supabase Dashboard -> SQL Editor -> New query -> Run.
-- The website talks to these tables only from the server with the service-role key,
-- so RLS is enabled with no public policies: browsers cannot read or write directly.

create extension if not exists pgcrypto;

-- Waitlist -------------------------------------------------------------------
create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) between 1 and 100),
  email text not null check (length(email) between 3 and 255),
  source text not null default 'website',
  created_at timestamptz not null default now()
);

create unique index if not exists waitlist_signups_email_unique
  on public.waitlist_signups (lower(email));

alter table public.waitlist_signups enable row level security;

-- Donations (Razorpay) -------------------------------------------------------
create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  razorpay_order_id text not null unique,
  razorpay_payment_id text unique,
  amount_paise integer not null check (amount_paise >= 100),
  currency text not null default 'INR',
  status text not null default 'created' check (status in ('created', 'paid', 'failed')),
  name text not null check (length(trim(name)) between 1 and 80),
  email text check (email is null or length(email) <= 255),
  message text check (message is null or length(message) <= 280),
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create index if not exists donations_status_paid_at on public.donations (status, paid_at desc);

alter table public.donations enable row level security;

revoke all on public.waitlist_signups from anon, authenticated;
revoke all on public.donations from anon, authenticated;
