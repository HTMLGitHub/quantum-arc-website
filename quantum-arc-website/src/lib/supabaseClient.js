/*
  Quantum Arc Website
  Supabase Client

  Single shared Supabase client, used for both reading blog posts
  (public) and writing/authenticating on the admin page (protected by
  Supabase Auth + Row Level Security — see supabase/blog_posts.sql).

  The anon key is safe to expose in client code by design: it can only
  do what the database's RLS policies allow it to do.
*/

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Fails loudly at startup instead of silently breaking every blog
  // fetch/login attempt later.
  console.error(
    'Missing Supabase env vars. Copy .env.example to .env.local and fill in ' +
    'VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from your Supabase project settings.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
