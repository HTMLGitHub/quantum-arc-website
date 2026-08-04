/*
  Quantum Arc Website
  BrightPath — Contact

  This form is a simulated submit only — BrightPath is a concept
  project, so it deliberately does NOT go through Quantum Arc's real
  contact pipeline (contact_submissions table / Web3Forms key). Wiring
  a fictional org's form to real infrastructure would risk a visitor's
  message landing in a real inbox meant for actual Quantum Arc leads.
*/

import { useState } from 'react'
import BrightPathHeader from '../components/BrightPathHeader'
import BrightPathFooter from '../components/BrightPathFooter'
import { bpContactInfo } from '../data/brightpathContent'
import '../styles/brightpath.css'

const initialForm = { name: '', email: '', interest: 'volunteer', message: '' }

export default function BrightPathContact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState(null) // null | 'sending' | 'sent'

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setStatus('sending')

    // No backend for this concept showcase — simulate a send, same
    // pattern used by the other portfolio showcase sites.
    setTimeout(() => {
      setStatus('sent')
      setForm(initialForm)
    }, 700)
  }

  return (
    <div className="brightpath">
      <BrightPathHeader />

      <main>
        <section className="bp-section bp-container" style={{ paddingBottom: 0 }}>
          <p className="bp-kicker">{bpContactInfo.kicker}</p>
          <h1 className="bp-title">{bpContactInfo.title}</h1>
        </section>

        <section className="bp-section">
          <div className="bp-container bp-contact-grid">
            <div className="bp-contact-details">
              <p><strong>Email:</strong> {bpContactInfo.email}</p>
              <p><strong>Phone:</strong> {bpContactInfo.phone}</p>
              <p><strong>Address:</strong> {bpContactInfo.address}</p>
              <p><strong>Hours:</strong> {bpContactInfo.hours}</p>
            </div>

            <form className="bp-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="bp-name">Name</label>
                <input id="bp-name" name="name" type="text" value={form.name} onChange={handleChange} required />
              </div>

              <div>
                <label htmlFor="bp-email">Email</label>
                <input id="bp-email" name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>

              <div>
                <label htmlFor="bp-interest">I'm interested in</label>
                <select id="bp-interest" name="interest" value={form.interest} onChange={handleChange}>
                  <option value="volunteer">Volunteering</option>
                  <option value="donate">Donating</option>
                  <option value="partner">Partnering</option>
                  <option value="general">General question</option>
                </select>
              </div>

              <div>
                <label htmlFor="bp-message">Message</label>
                <textarea id="bp-message" name="message" value={form.message} onChange={handleChange} required />
              </div>

              <button className="bp-button bp-button-primary" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>

              {status === 'sent' && (
                <p className="bp-form-status is-success">
                  Thanks for reaching out — this is a demo form, so nothing was actually sent.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <BrightPathFooter />
    </div>
  )
}
