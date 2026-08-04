/*
  Quantum Arc Website
  Admin — MFA Challenge

  Reached right after a correct password when the admin account has a
  verified TOTP factor enrolled (see AdminLogin.jsx / adminAuth.js).
  Needs its own light guard rather than RequireAdminAuth, since
  requiring aal2 to reach the page that grants aal2 would be circular
  — a plain signed-in (aal1) session is enough to be here.
*/

import { useEffect, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { needsMfaChallenge } from '../lib/adminAuth'

export default function AdminMfaChallenge() {
    const [guardState, setGuardState] = useState('checking') // 'checking' | 'ready' | 'redirect-login' | 'redirect-admin'
    const [factorId, setFactorId] = useState(null)
    const [code, setCode] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        async function setup() {
            const { data: sessionData } = await supabase.auth.getSession()
            if (!sessionData.session) {
                setGuardState('redirect-login')
                return
            }

            const challengeNeeded = await needsMfaChallenge()
            if (!challengeNeeded) {
                setGuardState('redirect-admin')
                return
            }

            const { data: factorsData, error: factorsError } = await supabase.auth.mfa.listFactors()
            const verifiedTotp = factorsError
                ? null
                : factorsData.totp.find((factor) => factor.status === 'verified')

            if (!verifiedTotp) {
                setGuardState('redirect-admin')
                return
            }

            setFactorId(verifiedTotp.id)
            setGuardState('ready')
        }

        setup()
    }, [])

    async function handleSubmit(event) {
        event.preventDefault()
        setSubmitting(true)
        setError('')

        const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({ factorId })

        if (challengeError) {
            setSubmitting(false)
            setError(challengeError.message)
            return
        }

        const { error: verifyError } = await supabase.auth.mfa.verify({
            factorId,
            challengeId: challengeData.id,
            code,
        })

        setSubmitting(false)

        if (verifyError) {
            setError('Incorrect code. Try again.')
            return
        }

        navigate('/admin')
    }

    if (guardState === 'checking') {
        return (
            <main className="page-shell page-section">
                <p>Checking session...</p>
            </main>
        )
    }

    if (guardState === 'redirect-login') {
        return <Navigate to="/admin/login" replace />
    }

    if (guardState === 'redirect-admin') {
        return <Navigate to="/admin" replace />
    }

    return (
        <main className="page-shell page-section">
            <div className="section-header">
                <p className="section-kicker">Admin</p>
                <h1 className="section-title">Enter Code</h1>
                <p className="section-description">Enter the 6-digit code from your authenticator app.</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form admin-login-form">
                <div>
                    <label htmlFor="code">Authentication Code</label>
                    <input
                        id="code"
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        className="mfa-code-input"
                        value={code}
                        onChange={(event) => setCode(event.target.value)}
                        maxLength={6}
                        required
                        autoFocus
                    />
                </div>

                <button className="button button-primary" type="submit" disabled={submitting || code.length !== 6}>
                    {submitting ? 'Verifying...' : 'Verify'}
                </button>

                {error && <p className="form-error">{error}</p>}
            </form>
        </main>
    )
}
