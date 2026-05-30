-- E2: Add map coordinates and aggregate stats to venues table
alter table public.venues
  add column if not exists lat float8,
  add column if not exists lng float8,
  add column if not exists rating_avg float4 not null default 0,
  add column if not exists review_count int4 not null default 0;

-- Index for spatial filtering by city bounding box
create index if not exists venues_lat_lng_idx on public.venues (lat, lng)
  where lat is not null and lng is not null;
