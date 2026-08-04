/*
  Quantum Arc Website
  Admin — Forgot Password

  Requests a password-reset email from Supabase Auth. No account
  enumeration protection beyond what Supabase itself does — there's
  only ever one admin account, so this isn't trying to hide whether
  the address exists.
*/

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function AdminForgotPassword() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState(null) // null | 'sending' | 'sent' | 'error'
    const [error, setError] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()
        setStatus('sending')
        setError('')

        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/admin/update-password`,
        })

        if (resetError) {
            setStatus('error')
            setError(resetError.message)
            return
        }

        setStatus('sent')
    }

    return (
        <main className="page-shell page-section">
            <div className="section-header">
                <p className="section-kicker">Admin</p>
                <h1 className="section-title">Reset Password</h1>
                <p className="section-description">
                    Enter the admin email and we'll send a link to set a new password.
                </p>
            </div>

            {status === 'sent' ? (
                <p className="form-success">
                    If that address has an account, a reset link is on its way — check the inbox.
                </p>
            ) : (
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

                    <button className="button button-primary" type="submit" disabled={status === 'sending'}>
                        {status === 'sending' ? 'Sending...' : 'Send Reset Link'}
                    </button>

                    {status === 'error' && <p className="form-error">{error}</p>}
                </form>
            )}

            <p className="blog-post-back-link">
                <Link to="/admin/login">Back to sign in</Link>
            </p>
        </main>
    )
}
