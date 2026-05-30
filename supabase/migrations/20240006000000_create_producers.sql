-- Migration: create producers table
-- Epic: E6 — Romanian Producers Directory

create table if not exists public.producers (
  id          uuid        primary key default gen_random_uuid(),
  name        text        not null,
  category    text        not null check (category in ('brewery', 'winery', 'distillery')),
  region      text        not null,
  description text,
  website     text,
  created_at  timestamptz not null default now()
);

-- Enable RLS
alter table public.producers enable row level security;

-- Public read: anyone can view producers
create policy "producers_public_read"
  on public.producers
  for select
  using (true);

-- Authenticated insert: logged-in users can add producers
create policy "producers_authenticated_insert"
  on public.producers
  for insert
  to authenticated
  with check (true);
