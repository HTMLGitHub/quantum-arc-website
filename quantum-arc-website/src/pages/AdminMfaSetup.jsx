/*
  Quantum Arc Website
  Admin — MFA Setup

  Lets the admin enroll or remove a TOTP factor on their own account.
  Reached through AdminNav -> Security, behind RequireAdminAuth like
  every other /admin page.

  Enrollment is a two-step Supabase flow: mfa.enroll() creates an
  unverified factor and returns a QR code, then mfa.challenge() +
  mfa.verify() with a code from the authenticator app confirms it
  actually works before it counts as "enabled". Only a verified
  factor causes AdminLogin/RequireAdminAuth to start requiring the
  challenge step (see adminAuth.js).
*/

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import AdminNav from '../components/AdminNav'

export default function AdminMfaSetup() {
    const [loading, setLoading] = useState(true)
    const [verifiedFactor, setVerifiedFactor] = useState(null)
    const [enrollment, setEnrollment] = useState(null) // { factorId, qrCode }
    const [code, setCode] = useState('')
    const [status, setStatus] = useState(null) // null | 'working' | 'error'
    const [error, setError] = useState('')

    // Shared between the mount effect and the post-enroll/remove
    // refresh below, so the response-handling logic lives in one
    // place even though the effect has to call listFactors() via
    // .then() rather than through the async loadFactors() wrapper --
    // a local async function that sets state can't be invoked
    // directly from an effect body without tripping the
    // set-state-in-effect lint rule (same reason RequireAdminAuth.jsx
    // structures its session check the same way).
    function applyFactorsResult({ data, error: factorsError }) {
        if (!factorsError) {
            setVerifiedFactor(data.totp.find((factor) => factor.status === 'verified') ?? null)
        }
        setLoading(false)
    }

    async function loadFactors() {
        applyFactorsResult(await supabase.auth.mfa.listFactors())
    }

    useEffect(() => {
        supabase.auth.mfa.listFactors().then(applyFactorsResult)
    }, [])

    async function handleStartSetup() {
        setStatus('working')
        setError('')

        const { data, error: enrollError } = await supabase.auth.mfa.enroll({ factorType: 'totp' })

        setStatus(null)

        if (enrollError) {
            setStatus('error')
            setError(enrollError.message)
            return
        }

        setEnrollment({ factorId: data.id, qrCode: data.totp.qr_code })
    }

    async function handleVerify(event) {
        event.preventDefault()
        setStatus('working')
        setError('')

        const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
            factorId: enrollment.factorId,
        })

        if (challengeError) {
            setStatus('error')
            setError(challengeError.message)
            return
        }

        const { error: verifyError } = await supabase.auth.mfa.verify({
            factorId: enrollment.factorId,
            challengeId: challengeData.id,
            code,
        })

        if (verifyError) {
            setStatus('error')
            setError('Incorrect code. Try again.')
            return
        }

        setStatus(null)
        setEnrollment(null)
        setCode('')
        await loadFactors()
    }

    async function handleRemove() {
        if (!window.confirm('Remove two-factor authentication from this account?')) return

        setStatus('working')
        setError('')

        const { error: unenrollError } = await supabase.auth.mfa.unenroll({ factorId: verifiedFactor.id })

        setStatus(null)

        if (unenrollError) {
            setStatus('error')
            setError(unenrollError.message)
            return
        }

        await loadFactors()
    }

    return (
        <main className="page-shell page-section">
            <AdminNav />

            <div className="section-header">
                <p className="section-kicker">Admin</p>
                <h1 className="section-title">Two-Factor Authentication</h1>
                <p className="section-description">
                    Adds a 6-digit code from an authenticator app as a second step at sign-in.
                </p>
            </div>

            {loading && <p>Loading...</p>}

            {!loading && verifiedFactor && !enrollment && (
                <div className="contact-form admin-login-form">
                    <p className="form-success">Two-factor authentication is enabled on this account.</p>
                    <button className="button button-secondary" type="button" onClick={handleRemove} disabled={status === 'working'}>
                        {status === 'working' ? 'Removing...' : 'Remove Two-Factor Authentication'}
                    </button>
                    {status === 'error' && <p className="form-error">{error}</p>}
                </div>
            )}

            {!loading && !verifiedFactor && !enrollment && (
                <div className="contact-form admin-login-form">
                    <p>Two-factor authentication is not set up yet.</p>
                    <button className="button button-primary" type="button" onClick={handleStartSetup} disabled={status === 'working'}>
                        {status === 'working' ? 'Starting...' : 'Set Up Two-Factor Authentication'}
                    </button>
                    {status === 'error' && <p className="form-error">{error}</p>}
                </div>
            )}

            {!loading && enrollment && (
                <form onSubmit={handleVerify} className="contact-form admin-login-form">
                    <p>Scan this code with an authenticator app (like Authy or Google Authenticator):</p>
                    <img className="mfa-qr" src={enrollment.qrCode} alt="Scan this QR code with an authenticator app" />

                    <div>
                        <label htmlFor="code">Enter the code it shows to confirm</label>
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

                    <button className="button button-primary" type="submit" disabled={status === 'working' || code.length !== 6}>
                        {status === 'working' ? 'Verifying...' : 'Verify & Enable'}
                    </button>

                    {status === 'error' && <p className="form-error">{error}</p>}
                </form>
            )}
        </main>
    )
}
