/*
  Quantum Arc Website
  Web3Forms Email Delivery

  Sends the contact form straight to support@quantumarc.net via
  Web3Forms (web3forms.com) — no backend of ours involved. The access
  key is safe to expose in client code: it's tied to one destination
  email and rate-limited on Web3Forms' end, not a secret that grants
  broader access (same category as the Supabase anon key).
*/

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

export async function sendContactEmail(fields) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

  if (!accessKey) {
    throw new Error('Missing VITE_WEB3FORMS_ACCESS_KEY — see .env.example.')
  }

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      subject: 'New message from the Quantum Arc website',
      ...fields,
    }),
  })

  const result = await response.json()

  if (!result.success) {
    throw new Error(result.message || 'Failed to send email')
  }
}
