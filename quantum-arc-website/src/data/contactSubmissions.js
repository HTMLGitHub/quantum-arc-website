/*
  Quantum Arc Website
  Contact Submissions Data Access

  Writes contact form entries to Supabase. Anyone can submit — no
  login required, that's the point of a public contact form. Only the
  admin can read submissions back, enforced by the RLS policies in
  supabase/contact_submissions.sql, not by anything in this file.
*/

import { supabase } from '../lib/supabaseClient'

export async function submitContactForm({ name, businessName, email, phone, websiteUrl, hasNoWebsite, service, message }) {
  const { error } = await supabase
    .from('contact_submissions')
    .insert({
      name,
      business_name: businessName || null,
      email,
      phone: phone || null,
      website_url: hasNoWebsite ? null : (websiteUrl || null),
      has_no_website: hasNoWebsite,
      service: service || null,
      message,
    })

  if (error) throw error
}
