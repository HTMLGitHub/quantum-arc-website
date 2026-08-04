/*
  Quantum Arc Website
  Admin Login Page

  Plain email/password sign-in against Supabase Auth. There is no
  public sign-up form anywhere in this app — the one admin account is
  created directly in the Supabase dashboard (see supabase/SETUP.md).
*/

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { resolvePostAuthRoute } from '../lib/adminAuth'

export default function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()
        setSubmitting(true)
        setError('')

        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

        if (signInError) {
            setSubmitting(false)
            setError('Incorrect email or password.')
            return
        }

        // Password alone only proves aal1 -- send anyone with a
        // verified MFA factor on to the code challenge instead of
        // straight into /admin.
        navigate(await resolvePostAuthRoute())
    }

    return (
        <main className="page-shell page-section">
            <div className="section-header">
                <p className="section-kicker">Admin</p>
                <h1 className="section-title">Sign In</h1>
                <p className="section-description">This page is restricted to Quantum Arc admins.</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form admin-login-form">
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="username"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="current-password"
                        required
                    />
                </div>

                <button className="button button-primary" type="submit" disabled={submitting}>
                    {submitting ? 'Signing in...' : 'Sign In'}
                </button>

                {error && <p className="form-error">{error}</p>}
            </form>

            <p className="blog-post-back-link">
                <Link to="/admin/forgot-password">Forgot password?</Link>
            </p>
        </main>
    )
}
