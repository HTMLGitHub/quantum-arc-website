import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/*
  Blog posts are now read from and written to Supabase directly from the
  browser (see src/data/blogPosts.js), so the dev-only /api/posts
  middleware that used to write flat JSON files is no longer needed.
*/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    open: true,
  },
})