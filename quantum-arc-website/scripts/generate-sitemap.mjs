/*
  Quantum Arc Website
  Sitemap Generator

  Runs before every build (see package.json's "prebuild" script) and
  writes public/sitemap.xml. Static pages are listed by hand below;
  blog posts are pulled live from Supabase so new posts show up in the
  sitemap automatically on the next build, without editing this file.

  If Supabase env vars aren't available (e.g. a fresh checkout with no
  .env.local yet), this logs a warning and still writes the sitemap
  with just the static pages — it never fails the build over this.
*/

import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { writeFileSync } from 'node:fs'

config({ path: '.env.local' })

// Update this if the site ever moves to a different domain.
const SITE_URL = 'https://quantumarc.net'

const staticPages = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
]

async function fetchBlogPosts() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.warn('generate-sitemap: missing Supabase env vars — writing sitemap without blog posts.')
    return []
  }

  const supabase = createClient(supabaseUrl, supabaseKey)
  const { data, error } = await supabase.from('blog_posts').select('slug, created_at')

  if (error) {
    console.warn('generate-sitemap: failed to fetch blog posts —', error.message)
    return []
  }

  return data
}

function urlEntry({ path, changefreq, priority, lastmod }) {
  const lastmodLine = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''
  return `  <url>
    <loc>${SITE_URL}${path}</loc>${lastmodLine}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

async function main() {
  const posts = await fetchBlogPosts()

  const postEntries = posts.map((post) =>
    urlEntry({
      path: `/blog/${post.slug}`,
      changefreq: 'monthly',
      priority: '0.6',
      lastmod: post.created_at?.slice(0, 10),
    })
  )

  const allEntries = [...staticPages.map(urlEntry), ...postEntries].join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries}
</urlset>
`

  writeFileSync('public/sitemap.xml', xml)
  console.log(`generate-sitemap: wrote ${staticPages.length + postEntries.length} URLs to public/sitemap.xml`)
}

main()
