/*
  Quantum Arc Website
  Admin Auth Helpers

  Shared MFA step-up logic used by AdminLogin, AdminUpdatePassword, and
  RequireAdminAuth so the "does this session still need a TOTP code"
  check lives in exactly one place instead of being copy-pasted into
  every page that can land someone in an authenticated-but-not-yet-
  verified state.
*/

import { supabase } from './supabaseClient'

/*
  Compares Supabase's current vs. next Authenticator Assurance Level
  for the active session. nextLevel is 'aal2' whenever a verified MFA
  factor exists on the account — it does not depend on whether this
  particular session has completed the challenge yet, which is what
  currentLevel tracks.
*/
export async function needsMfaChallenge() {
    const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()

    if (error) {
        // Fails open to "no challenge needed" rather than locking
        // someone out over a transient API error — the RLS policies
        // (scoped to the admin email) are still the real backstop.
        return false
    }

    return data.nextLevel === 'aal2' && data.nextLevel !== data.currentLevel
}

/*
  Where to send someone immediately after they prove their password —
  either straight into /admin, or to the MFA challenge first if the
  account has a verified factor enrolled.
*/
export async function resolvePostAuthRoute() {
    return (await needsMfaChallenge()) ? '/admin/mfa-challenge' : '/admin'
}
