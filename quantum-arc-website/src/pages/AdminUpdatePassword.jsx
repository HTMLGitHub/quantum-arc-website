/*
  Quantum Arc Website
  Admin — Update Password

  Landing page for the link in the password-reset email. Supabase's
  client auto-parses the recovery token out of the URL into a real
  session (see supabaseClient.js — detectSessionInUrl is on by
  default), so by the time this renders we're either already signed
  in via that link, or the link was invalid/expired and there's no
  session to act on.
*/

import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { resolvePostAuthRoute } from '../lib/adminAuth'

export default function AdminUpdatePassword() {
    const [sessionState, setSessionState] = useState('checking') // 'checking' | 'ready' | 'missing'
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [status, setStatus] = useState(null) // null | 'saving' | 'error'
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSessionState(data.session ? 'ready' : 'missing')
        })
    }, [])

    async function handleSubmit(event) {
        event.preventDefault()

        if (password !== confirmPassword) {
            setStatus('error')
            setError('Passwords do not match.')
            return
        }

        setStatus('saving')
        setError('')

        const { error: updateError } = await supabase.auth.updateUser({ password })

        if (updateError) {
            setStatus('error')
            setError(updateError.message)
            return
        }

        navigate(await resolvePostAuthRoute())
    }

    if (sessionState === 'checking') {
        return (
            <main className="page-shell page-section">
                <p>Checking link...</p>
            </main>
        )
    }

    if (sessionState === 'missing') {
        return (
            <main className="page-shell page-section">
                <div className="section-header">
                    <p className="section-kicker">Admin</p>
                    <h1 className="section-title">Link Expired</h1>
                    <p className="section-description">
                        This reset link is invalid or has already been used. Request a new one below.
                    </p>
                </div>
                <p className="blog-post-back-link">
                    <Link to="/admin/forgot-password">Request a new link</Link>
                </p>
            </main>
        )
    }

    return (
        <main className="page-shell page-section">
            <div className="section-header">
                <p className="section-kicker">Admin</p>
                <h1 className="section-title">Set New Password</h1>
                <p className="section-description">Choose a new password for the admin account.</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form admin-login-form">
                <div>
                    <label htmlFor="password">New Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="new-password"
                        minLength={8}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        autoComplete="new-password"
                        minLength={8}
                        required
                    />
                </div>

                <button className="button button-primary" type="submit" disabled={status === 'saving'}>
                    {status === 'saving' ? 'Saving...' : 'Update Password'}
                </button>

                {status === 'error' && <p className="form-error">{error}</p>}
            </form>
        </main>
    )
}
