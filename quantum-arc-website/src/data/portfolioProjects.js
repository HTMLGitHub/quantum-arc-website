/*
  Quantum Arc Website
  Portfolio Projects Data Access

  Reads and writes portfolio projects (and their images) in Supabase.
  Public read, admin-only write — see supabase/portfolio_projects.sql.
  Writing goes through the /admin/projects page (see AdminProjects.jsx),
  gated the same way blog posts are: reaching the page requires a
  Supabase Auth session, and actually saving requires that session to
  match the admin email, enforced by the database's RLS policies.
*/

import { supabase } from '../lib/supabaseClient'

// Aliased to camelCase (same trick as blogPosts.js) so components can
// destructure websiteUrl/imageUrl instead of website_url/image_url.
const PROJECT_COLUMNS = 'id, label, name, description, websiteUrl:website_url, imageUrl:image_url, created_at'
const IMAGE_BUCKET = 'portfolio-images'

export async function fetchPortfolioProjects() {
  const { data, error } = await supabase
    .from('portfolio_projects')
    .select(PROJECT_COLUMNS)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/*
  Uploads a project image to the portfolio-images bucket and returns
  its public URL. Only succeeds when signed in as the admin — enforced
  by the "Admin can upload portfolio images" storage policy.
*/
export async function uploadPortfolioImage(file) {
  const fileExt = file.name.split('.').pop()
  const filePath = `${crypto.randomUUID()}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(filePath, file)

  if (uploadError) throw uploadError

  const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(filePath)
  return data.publicUrl
}

export async function createProject({ name, label, description, websiteUrl, imageUrl }) {
  const { data, error } = await supabase
    .from('portfolio_projects')
    .insert({
      name,
      label: label || null,
      description,
      website_url: websiteUrl || null,
      image_url: imageUrl || null,
    })
    .select(PROJECT_COLUMNS)
    .single()

  if (error) throw error
  return data
}
