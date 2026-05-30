-- E3: Add unique constraint to enforce one review per user per venue
-- Required for upsert on conflict (venue_id, user_id)
alter table public.reviews
  add constraint reviews_venue_user_unique unique (venue_id, user_id);
