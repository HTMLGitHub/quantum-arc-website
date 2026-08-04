# Supabase setup (blog admin, contact form, portfolio)

One-time setup to get the database-backed blog editor, the contact form, and
the portfolio section working. Takes about 10 minutes.

## 1. Create a Supabase project

If you don't have a Supabase account yet, go to [supabase.com](https://supabase.com)
and create one.

If you already use Supabase for other apps (e.g. Dazbog), don't reuse that
project — create a **new** project under the same organization instead:
dashboard → org/project switcher (top-left) → **New project** → name it
something like `quantum-arc-website`. Each project is a fully separate
database, so this keeps the blog's data and credentials isolated from your
other apps.

Once it's created, go to that project's **Project Settings > API**. You'll
need two values from there in step 4 — make sure you're copying them from
the Quantum Arc project, not another one.

## 2. Create the table and security rules

1. In the Supabase dashboard, open **SQL Editor > New query**.
2. Paste in the contents of `supabase/blog_posts.sql` (in this repo) and click
   **Run**.
3. Before running it, change the email in the three `'admin@quantumarc.net'`
   lines to whatever email you'll actually sign in with — it must match
   exactly.

This creates the `blog_posts` table and locks it down: anyone can read posts,
but only a signed-in user with that exact email can create, edit, or delete
them.

Then do the same thing with `supabase/contact_submissions.sql` — same SQL
Editor, new query, paste, update the email, run. This one's access pattern is
flipped: anyone can *submit* the contact form (no login needed to send one),
but only your admin email can read the submissions back. There's no admin UI
for viewing them yet — check them in the Supabase dashboard under **Table
Editor > contact_submissions**.

Then run `supabase/portfolio_projects.sql` the same way. This one's access
pattern matches blog_posts: anyone can read, only your admin email can
add/edit/delete. It also creates a public `portfolio-images` Storage bucket
for project cover images/mockups, with the same "anyone can view, only admin
can upload" split. Projects are added through `/admin/projects` on the site —
no need to touch the Table Editor directly. The Portfolio section on the site
stays hidden entirely until there's at least one project.

If you already ran an older version of this file (before `website_url` /
`image_url` / the storage bucket existed), just re-run the whole thing — every
statement in it is safe to repeat and will only add what's missing.

## 3. Turn off public sign-ups

By default Supabase lets anyone create an account through the Auth API —
that's the door we need to close so nobody but you can ever get a login.

1. Go to **Authentication > Sign In / Providers** (or **Authentication >
   Settings**, depending on your Supabase version).
2. Find **"Allow new users to sign up"** and turn it **off**.

With this off, the only way a login exists is if you create it yourself in
the dashboard — there's no sign-up form anywhere in the site for anyone to
find.

## 4. Create your own admin account

1. Go to **Authentication > Users > Add user**.
2. Enter the same email you put in the SQL in step 2, and set a password.
3. That's your login for `/admin`.

## 5. Get a Web3Forms access key

The contact form emails submissions via [Web3Forms](https://web3forms.com) —
no account needed, just enter **support@quantumarc.net** on their homepage
and they'll email you a free access key. That key is what actually delivers
the message to that inbox.

## 6. Connect the site to your project

1. Copy `.env.example` to `.env.local` in the project root.
2. Fill in the three values:
   - `VITE_SUPABASE_URL` — **Project Settings > Data API**, the Project URL.
   - `VITE_SUPABASE_ANON_KEY` — **Project Settings > API Keys**, the
     **Publishable key** (starts with `sb_publishable_...`). Never use the
     Secret key here — that one bypasses RLS entirely and should never end up
     in client code.
   - `VITE_WEB3FORMS_ACCESS_KEY` — the key from step 5.
3. Restart `npm run dev` if it's running.

## 7. Try it

1. Go to `/admin` — you should be redirected to `/admin/login`.
2. Sign in with the account from step 4.
3. Write and save a post. It should show up on `/blog` and the homepage
   preview.
4. Fill out and submit the contact form on the homepage. You should get an
   email at support@quantumarc.net within a few seconds, and the submission
   should also show up under **Table Editor > contact_submissions** in
   Supabase (the backup copy).
5. Go to `/admin/projects` and save a project — try adding a cover image and
   a website URL to test both. Refresh the homepage and the Portfolio section
   should appear with that project. With zero projects, the section doesn't
   render at all.

## Deploying

Whatever host you end up using (Vercel, Netlify, etc.), set the same three
env vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`,
`VITE_WEB3FORMS_ACCESS_KEY`) in that host's project settings. All three are
safe to expose publicly — real access control happens in the database
policies and on Web3Forms' end, not by keeping any of these secret.

## SEO, AI visibility, and link previews

A few things were added for search engines, AI answer engines (ChatGPT,
Perplexity, etc.), and rich link previews (iMessage, Slack, social media):

- **`index.html`** now has a real title/description, Open Graph + Twitter
  Card tags, and structured data (JSON-LD) describing Quantum Arc, its
  pricing, and location. This is what makes a shared link show a title,
  description, and image instead of just a bare URL.
- **`public/og-image.png`** — the 1200×630 branded image used for that
  preview. Swap it for a real screenshot or a nicer design any time; just
  keep the same filename or update the two `og:image`/`twitter:image` lines
  in `index.html` to match.
- **`public/robots.txt`** — explicitly allows both search crawlers and AI
  crawlers (ChatGPT, Claude, Perplexity, Google, Bing, Common Crawl). Since
  the goal here is to get found, nothing is blocked.
- **`public/llms.txt`** — an emerging convention (not yet universally
  adopted) that gives AI systems a short, structured summary of who Quantum
  Arc is and what it costs, instead of making them piece it together from
  the full site.
- **`public/sitemap.xml`** — regenerated automatically before every
  `npm run build` (see `scripts/generate-sitemap.mjs`), including a URL for
  every blog post pulled live from Supabase. Run `npm run sitemap` any time
  to regenerate it manually.

**One real limitation, worth knowing about:** this site has no
server-side rendering, so the meta tags in `index.html` are the same on
every route. Sharing the homepage (`quantumarc.net`) gets the full title +
description + image treatment. Sharing a specific blog post
(`quantumarc.net/blog/some-post`) will show that *same* homepage
preview, not that post's own title/image, because link-preview bots
(iMessage, Slack, etc.) read the raw HTML and don't run the site's
JavaScript. Search engines like Google are more forgiving since Googlebot
does run JavaScript, but rich social previews specifically need real HTML
per page to be fully accurate. Fixing that properly would mean adding
server-side rendering or a prerendering step — a bigger change, not
something done here. Worth revisiting if blog posts start getting shared
individually a lot.

If the live domain ends up being something other than `quantumarc.net`,
update it in `index.html` (the `og:url`/`og:image`/canonical tags and the
JSON-LD block), `public/robots.txt` (the `Sitemap:` line), `public/llms.txt`
(the page links), and `SITE_URL` in `scripts/generate-sitemap.mjs`.
