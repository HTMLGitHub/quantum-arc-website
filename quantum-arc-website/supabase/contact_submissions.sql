-- Quantum Arc Website — Contact form submissions table + security rules
--
-- Run this in your Supabase project's SQL Editor, same place you ran
-- blog_posts.sql. Safe to re-run any time — every statement here is
-- idempotent.
--
-- Security model:
--   - Anyone can SUBMIT the contact form (INSERT) — no login required,
--     that's the whole point of a public contact form.
--   - Only the admin (matched by email) can READ, UPDATE, or DELETE
--     submissions. This is private lead info, not public content —
--     the opposite access pattern from blog_posts.

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  business_name text,
  email text not null,
  phone text,
  website_url text,
  has_no_website boolean not null default false,
  -- Which service they picked from the contact form's dropdown
  -- (one of the plan names in servicesContent.plans, or "Not sure").
  service text,
  message text not null,
  created_at timestamptz not null default now()
);

-- Covers upgrading a table created before the service column existed
-- — a no-op on a fresh table, since create table already included it.
alter table contact_submissions add column if not exists service text;

alter table contact_submissions enable row level security;

-- Table-level grants. Same reasoning as blog_posts.sql: with
-- "Automatically expose new tables" off, these aren't granted
-- automatically, and without them Postgres blocks requests before RLS
-- policies are even evaluated.
grant insert on contact_submissions to anon, authenticated;
grant select, update, delete on contact_submissions to authenticated;

-- Policies aren't "create if not exists", so each is dropped first —
-- safe to re-run this whole file any time.

drop policy if exists "Anyone can submit the contact form" on contact_submissions;
create policy "Anyone can submit the contact form"
  on contact_submissions
  for insert
  with check (true);

-- Change 'admin@quantumarc.com' to match whichever email you used in
-- blog_posts.sql.
drop policy if exists "Admin can read submissions" on contact_submissions;
create policy "Admin can read submissions"
  on contact_submissions
  for select
  using ((auth.jwt() ->> 'email') = 'admin@quantumarc.com');

drop policy if exists "Admin can update submissions" on contact_submissions;
create policy "Admin can update submissions"
  on contact_submissions
  for update
  using ((auth.jwt() ->> 'email') = 'admin@quantumarc.com');

drop policy if exists "Admin can delete submissions" on contact_submissions;
create policy "Admin can delete submissions"
  on contact_submissions
  for delete
  using ((auth.jwt() ->> 'email') = 'admin@quantumarc.com');
