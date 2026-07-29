-- Quantum Arc Website — Portfolio projects table + security rules
--
-- Run this once in your Supabase project's SQL Editor, same place you
-- ran blog_posts.sql and contact_submissions.sql. Safe to re-run any
-- time (e.g. after this file gets updated) — every statement here is
-- idempotent.
--
-- Security model: same shape as blog_posts — anyone can read projects
-- (it's a public portfolio), only the admin (matched by email) can
-- create, edit, or delete them.
--
-- Projects are added through /admin/projects on the site (see
-- AdminProjects.jsx) — no need to touch the Table Editor directly.
-- PortfolioSection hides itself entirely until there's at least one
-- row here.

create table if not exists portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  -- Optional small tag shown above the project name (e.g. "Client
  -- Project", "Case Study", an industry name) — leave blank to omit it.
  label text,
  name text not null,
  description text not null,
  -- Both optional. A project can have neither yet (just described in
  -- text), an image only (site not live, but you have a mockup/design
  -- to show), a URL only (live site, no separate image), or both.
  website_url text,
  image_url text,
  created_at timestamptz not null default now()
);

-- Covers upgrading a table created before website_url/image_url
-- existed — a no-op on a fresh table, since create table already
-- included them above.
alter table portfolio_projects add column if not exists website_url text;
alter table portfolio_projects add column if not exists image_url text;

alter table portfolio_projects enable row level security;

-- Table-level grants. Same reasoning as the other tables: with
-- "Automatically expose new tables" off, these aren't granted
-- automatically, and without them Postgres blocks requests before RLS
-- policies are even evaluated.
grant select on portfolio_projects to anon, authenticated;
grant insert, update, delete on portfolio_projects to authenticated;

-- Policies aren't "create if not exists", so each is dropped first —
-- safe to re-run this whole file any time.

drop policy if exists "Public can read portfolio projects" on portfolio_projects;
create policy "Public can read portfolio projects"
  on portfolio_projects
  for select
  using (true);

-- Change 'admin@quantumarc.net' to match whichever email you used in
-- blog_posts.sql and contact_submissions.sql.
drop policy if exists "Admin can insert portfolio projects" on portfolio_projects;
create policy "Admin can insert portfolio projects"
  on portfolio_projects
  for insert
  with check ((auth.jwt() ->> 'email') = 'admin@quantumarc.net');

drop policy if exists "Admin can update portfolio projects" on portfolio_projects;
create policy "Admin can update portfolio projects"
  on portfolio_projects
  for update
  using ((auth.jwt() ->> 'email') = 'admin@quantumarc.net');

drop policy if exists "Admin can delete portfolio projects" on portfolio_projects;
create policy "Admin can delete portfolio projects"
  on portfolio_projects
  for delete
  using ((auth.jwt() ->> 'email') = 'admin@quantumarc.net');


-- ================================
-- Storage: portfolio project images
-- ================================
--
-- A public-read bucket for project cover images/mockups. Unlike the
-- tables above, Supabase Storage already grants anon/authenticated
-- base access to storage.objects out of the box (it's not affected by
-- "Automatically expose new tables", which only applies to the public
-- schema) — these RLS policies are what actually scope things down to
-- "public can view, only admin can upload".

insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can view portfolio images" on storage.objects;
create policy "Public can view portfolio images"
  on storage.objects
  for select
  using (bucket_id = 'portfolio-images');

-- Change 'admin@quantumarc.net' here too, same as above.
drop policy if exists "Admin can upload portfolio images" on storage.objects;
create policy "Admin can upload portfolio images"
  on storage.objects
  for insert
  with check (
    bucket_id = 'portfolio-images'
    and (auth.jwt() ->> 'email') = 'admin@quantumarc.net'
  );

drop policy if exists "Admin can update portfolio images" on storage.objects;
create policy "Admin can update portfolio images"
  on storage.objects
  for update
  using (
    bucket_id = 'portfolio-images'
    and (auth.jwt() ->> 'email') = 'admin@quantumarc.net'
  );

drop policy if exists "Admin can delete portfolio images" on storage.objects;
create policy "Admin can delete portfolio images"
  on storage.objects
  for delete
  using (
    bucket_id = 'portfolio-images'
    and (auth.jwt() ->> 'email') = 'admin@quantumarc.net'
  );
