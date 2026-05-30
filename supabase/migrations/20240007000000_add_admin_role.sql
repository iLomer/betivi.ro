-- E7: Add role column to profiles for admin access control
alter table public.profiles
  add column if not exists role text not null default 'user'
  check (role in ('user', 'admin'));
