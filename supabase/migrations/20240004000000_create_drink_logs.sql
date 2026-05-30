create type public.drink_category as enum ('beer', 'wine', 'spirit');

create table public.drink_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  category public.drink_category not null,
  producer text,
  venue_id uuid references public.venues on delete set null,
  rating integer check (rating >= 1 and rating <= 5),
  notes text,
  logged_at timestamptz default now() not null,
  created_at timestamptz default now() not null
);

alter table public.drink_logs enable row level security;

create policy "Users can view own drink logs"
  on public.drink_logs for select
  using (auth.uid() = user_id);

create policy "Users can insert own drink logs"
  on public.drink_logs for insert
  with check (auth.uid() = user_id);

create policy "Users can update own drink logs"
  on public.drink_logs for update
  using (auth.uid() = user_id);

create policy "Users can delete own drink logs"
  on public.drink_logs for delete
  using (auth.uid() = user_id);

create index drink_logs_user_id_logged_at_idx on public.drink_logs (user_id, logged_at desc);
