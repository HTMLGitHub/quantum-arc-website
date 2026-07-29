-- Quantum Arc Website — Blog posts table + security rules
--
-- Run this once in your Supabase project's SQL Editor
-- (Project > SQL Editor > New query > paste > Run).
--
-- Security model:
--   - Anyone (including logged-out visitors) can READ posts. That's the
--     whole point of a public blog.
--   - Only a signed-in user whose email matches ADMIN_EMAIL below can
--     INSERT, UPDATE, or DELETE posts. Nobody else can, even if they
--     somehow create a Supabase Auth account (see setup doc for the
--     extra step that closes that door too).

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  post_date date not null,
  excerpt text not null,
  body text not null default '',
  created_at timestamptz not null default now()
);

-- Row Level Security is off by default — turn it on so the policies
-- below actually get enforced.
alter table blog_posts enable row level security;

-- Table-level grants. If your project has "Automatically expose new
-- tables" turned off (the recommended setting), Supabase won't grant
-- these on its own — and without them, Postgres blocks every request
-- before RLS policies even get evaluated ("permission denied for
-- table"). RLS narrows things down further from here: anon only ever
-- matches the read policy, and authenticated only succeeds on writes
-- if its email matches the admin policies below.
grant select on blog_posts to anon, authenticated;
grant insert, update, delete on blog_posts to authenticated;

-- Policies aren't "create if not exists" the way the table above is, so
-- each one is dropped first. Safe to re-run this whole file any time
-- (e.g. after changing the admin email) without touching the table or
-- its data.

-- Anyone can read posts (this is a public blog).
drop policy if exists "Public can read blog posts" on blog_posts;
create policy "Public can read blog posts"
  on blog_posts
  for select
  using (true);

-- Only the admin (matched by email) can create posts.
-- Change 'admin@quantumarc.com' to whichever email you use to sign in.
drop policy if exists "Admin can insert blog posts" on blog_posts;
create policy "Admin can insert blog posts"
  on blog_posts
  for insert
  with check ((auth.jwt() ->> 'email') = 'admin@quantumarc.com');

-- Only the admin can edit posts.
drop policy if exists "Admin can update blog posts" on blog_posts;
create policy "Admin can update blog posts"
  on blog_posts
  for update
  using ((auth.jwt() ->> 'email') = 'admin@quantumarc.com');

-- Only the admin can delete posts.
drop policy if exists "Admin can delete blog posts" on blog_posts;
create policy "Admin can delete blog posts"
  on blog_posts
  for delete
  using ((auth.jwt() ->> 'email') = 'admin@quantumarc.com');
