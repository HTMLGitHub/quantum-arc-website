/*
  Quantum Arc Website
  Blog Posts Data Access

  All reads/writes to the blog_posts table go through here — one place
  to change if the schema ever changes, instead of scattering Supabase
  calls across every page.

  Security note: write access (insert/update/delete) is enforced by the
  database's Row Level Security policies (see supabase/blog_posts.sql),
  not by anything in this file. Someone could technically call
  createPost() from the browser console, but it will fail unless
  they're signed in as the admin.

  The "date:post_date" alias below just lets the rest of the app keep
  using post.date, even though the database column is post_date.
*/

import { supabase } from '../lib/supabaseClient'

const POST_COLUMNS = 'id, slug, title, date:post_date, excerpt, body, created_at'

/*
  Fetches every post, newest first. Used by the full blog index page.
*/
export async function fetchAllPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(POST_COLUMNS)
    .order('post_date', { ascending: false })

  if (error) throw error
  return data
}

/*
  Fetches the most recent N posts. Used by the homepage preview.
*/
export async function fetchLatestPosts(limit = 3) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(POST_COLUMNS)
    .order('post_date', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

/*
  Fetches a single post by slug, or null if it doesn't exist.
*/
export async function fetchPostBySlug(slug) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(POST_COLUMNS)
    .eq('slug', slug)
    .maybeSingle()

  if (error) throw error
  return data
}

/*
  Creates a new post. Only succeeds if the caller is signed in as the
  admin — enforced by the "Admin can insert blog posts" RLS policy, so
  this same function is safe to call from a public build.
*/
export async function createPost({ title, date, excerpt, body, slug }) {
  const finalSlug = slug || slugify(title)

  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      slug: finalSlug,
      title,
      post_date: date,
      excerpt,
      body: body || '',
    })
    .select(POST_COLUMNS)
    .single()

  if (error) throw error
  return data
}

/*
  Turns a title into a URL-safe slug, e.g. "Hello World!" -> "hello-world".
*/
function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
