# Deploying Quantum Arc

Two things are true right now that are worth separating clearly:

- **The database (Supabase) is already live.** It's a managed cloud service —
  it's been running 24/7 since you created the project, completely
  independent of where the website itself is hosted. That's why the contact
  form, blog, and admin pages already work when testing on `localhost`: the
  browser is talking to a real, already-public Supabase project the whole
  time.
- **The website (the actual HTML/CSS/JS files) is not live.** Right now it
  only exists on your computer, served by `npm run dev`. Nobody else can
  reach it. That's the part this guide covers — publishing those files
  somewhere public and pointing `quantumarc.net` at it.

Hosting the site doesn't change anything about Supabase — the deployed site
just calls the same Supabase project over the internet that `localhost` does
right now, using the same env vars.

This uses **Vercel**: the most common pairing with Vite + React, a generous
free tier, and (relevant below) built-in support for deploying different git
branches to different subdomains — which is exactly what the dev setup
needs. Netlify would work almost identically if you'd rather use that
instead; the steps below just wouldn't match exactly.

Your repo is already on GitHub (`HTMLGitHub/quantum-arc-website`), which is
what Vercel deploys from.

## Production: quantumarc.net

1. Push any pending local changes to GitHub (`git push`).
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the
   `quantum-arc-website` repo.
3. Vercel auto-detects Vite. Confirm: Build Command `npm run build`, Output
   Directory `dist`.
4. Add environment variables (Project Settings > Environment Variables),
   scoped to **Production**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_WEB3FORMS_ACCESS_KEY`

   Same values as your `.env.local`.
5. Add a `vercel.json` at the project root (see below) so that loading a
   route directly — `/blog`, `/admin`, `/blog/some-post` — serves the app
   instead of a 404. This site uses client-side routing
   (`react-router-dom`), so the server needs to hand every URL the same
   `index.html` and let the app's JavaScript figure out what to show:

   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

6. Deploy. You'll first get a temporary `*.vercel.app` URL — that's normal.
7. Connect the domain: Project Settings > Domains > add `quantumarc.net`
   (and `www.quantumarc.net`, redirecting to the apex). Vercel shows you the
   exact DNS records to add. Go to wherever `quantumarc.net` is registered
   and add them there.
8. Wait for DNS to propagate (usually minutes, sometimes a couple hours) —
   Vercel issues an SSL certificate automatically once it verifies the
   domain, no action needed from you.
9. Test the real thing: `/admin` login, the contact form (check it lands in
   both your inbox and Supabase), `/blog`, `/sitemap.xml`, `/robots.txt`,
   `/llms.txt`. Paste `https://quantumarc.net` into
   [opengraph.xyz](https://www.opengraph.xyz) or Facebook's Sharing
   Debugger to confirm the title/description/image look right — that's
   faster than waiting on iMessage's own cache to update.

## Dev: dev.quantumarc.net

Since dev is sharing the same Supabase project and Web3Forms key as
production (your call — see `SETUP.md` if you want to revisit that later),
this gives you a second live URL to sanity-check changes on before they're
public, not full data isolation. Worth knowing going in: test blog posts,
test portfolio projects, and test contact form submissions on
dev.quantumarc.net all land in the exact same Supabase tables as
production — a test post could show up on the real `/blog` immediately, and
a test contact submission will send a real email to
support@quantumarc.net. Nothing breaks, it's just not a sandbox.

1. Create a `dev` branch and push it:
   ```bash
   git checkout -b dev
   git push -u origin dev
   ```
2. In the same Vercel project: Project Settings > Domains > **Add**
   `dev.quantumarc.net`.
3. When adding it, assign it to track the `dev` git branch instead of
   `main` (Vercel lets you pick which branch a domain follows).
4. Add the DNS record Vercel gives you for `dev` at your registrar, same
   place as the production ones.
5. Add the same three env vars again, but scoped to **Preview** (Vercel's
   term for non-production deployments) instead of Production, so branch
   deploys pick them up too.

From then on: push to `dev` → deploys to dev.quantumarc.net. Push (or merge)
to `main` → deploys to quantumarc.net.
