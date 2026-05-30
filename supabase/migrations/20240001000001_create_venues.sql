create table public.venues (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  city text not null,
  address text,
  description text,
  category text check (category in ('bar','berarie','crama','terasa','club','restaurant')),
  created_by uuid references auth.users,
  created_at timestamptz default now()
);

alter table public.venues enable row level security;

create policy "Venues are viewable by everyone"
  on public.venues for select
  using (true);

create policy "Authenticated users can insert venues"
  on public.venues for insert
  with check (auth.role() = 'authenticated');
