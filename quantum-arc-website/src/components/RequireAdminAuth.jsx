/*
  Quantum Arc Website
  RequireAdminAuth Component

  Wraps the /admin routes and only renders them once we've confirmed
  the visitor has a session that's fully cleared MFA (if the account
  has a factor enrolled). Anyone without a session goes to
  /admin/login; anyone with a password-only (aal1) session on an
  MFA-enrolled account goes to /admin/mfa-challenge instead of
  straight through.

  This is the client-side half of admin protection — it just keeps the
  page from showing to strangers. The half that actually matters is the
  database's Row Level Security policies (supabase/blog_posts.sql),
  which block writes regardless of what the browser does.
*/

import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { needsMfaChallenge } from '../lib/adminAuth'

function RequireAdminAuth({ children }) {
    const [status, setStatus] = useState('checking') // 'checking' | 'authed' | 'guest' | 'needs-mfa'

    useEffect(() => {
        let cancelled = false

        async function evaluate(session) {
            if (!session) {
                if (!cancelled) setStatus('guest')
                return
            }

            const needsChallenge = await needsMfaChallenge()
            if (!cancelled) setStatus(needsChallenge ? 'needs-mfa' : 'authed')
        }

        supabase.auth.getSession().then(({ data }) => evaluate(data.session))

        // Keeps this in sync if the session expires, completes an MFA
        // challenge, or the user logs out in another tab.
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            evaluate(session)
        })

        return () => {
            cancelled = true
            listener.subscription.unsubscribe()
        }
    }, [])

    if (status === 'checking') {
        return (
            <main className="page-shell page-section">
                <p>Checking session...</p>
            </main>
        )
    }

    if (status === 'guest') {
        return <Navigate to="/admin/login" replace />
    }

    if (status === 'needs-mfa') {
        return <Navigate to="/admin/mfa-challenge" replace />
    }

    return children
}

export default RequireAdminAuth
