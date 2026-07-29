/*
  Quantum Arc Website
  RequireAdminAuth Component

  Wraps the /admin route and only renders it once we've confirmed the
  visitor has an active Supabase Auth session. Anyone without one is
  redirected to /admin/login.

  This is the client-side half of admin protection — it just keeps the
  page from showing to strangers. The half that actually matters is the
  database's Row Level Security policies (supabase/blog_posts.sql),
  which block writes regardless of what the browser does.
*/

import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

function RequireAdminAuth({ children }) {
    const [status, setStatus] = useState('checking') // 'checking' | 'authed' | 'guest'

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setStatus(data.session ? 'authed' : 'guest')
        })

        // Keeps this in sync if the session expires or the user logs
        // out in another tab.
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setStatus(session ? 'authed' : 'guest')
        })

        return () => listener.subscription.unsubscribe()
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

    return children
}

export default RequireAdminAuth
