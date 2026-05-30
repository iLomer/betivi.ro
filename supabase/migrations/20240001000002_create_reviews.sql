create table public.reviews (
  id uuid default gen_random_uuid() primary key,
  venue_id uuid references public.venues on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  rating smallint check (rating between 1 and 5) not null,
  body text,
  created_at timestamptz default now()
);

alter table public.reviews enable row level security;

create policy "Reviews are viewable by everyone"
  on public.reviews for select
  using (true);

create policy "Users can insert own reviews"
  on public.reviews for insert
  with check (auth.uid() = user_id);

create policy "Users can update own reviews"
  on public.reviews for update
  using (auth.uid() = user_id);

create policy "Users can delete own reviews"
  on public.reviews for delete
  using (auth.uid() = user_id);
