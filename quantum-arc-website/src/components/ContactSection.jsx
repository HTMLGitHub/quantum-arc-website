/*
  Quantum Arc Website
  Contact Section Component

  This section gives visitors a clear way to contact the company. On
  submit, the message goes to two places at once:
  - Web3Forms emails it straight to support@quantumarc.net.
  - Supabase saves a backup copy in contact_submissions, in case an
    email ever gets lost or spam-filtered.
  Either succeeding counts as success — a transient failure in one
  shouldn't make someone resubmit and double up the other.
*/

import { useState } from "react";
import { submitContactForm } from "../data/contactSubmissions";
import { sendContactEmail } from "../lib/web3forms";

// Shown as the default dropdown option, and used whenever nothing more
// specific has been picked (typed here once so it can't drift out of
// sync between the default value and the option list).
const NOT_SURE = 'Not sure';

const initialFormState =
{
    name: '',
    businessName: '',
    email: '',
    phone: '',
    websiteUrl: '',
    hasNoWebsite: false,
    service: NOT_SURE,
    message: '',
    botcheck: '', // honeypot — real visitors never fill this in, bots often do
};

/*
  ContactForm Component

  This is defined before ContactSection because ContactSection uses it.

  Props:
  - servicePlans: array from servicesContent.plans (passed down from
    HomePage), used to build the dropdown options.
  - selectedService: set when a "Get Started" link on a pricing card
    was clicked (see ServicesSection.jsx). Synced into the dropdown
    below so the field updates even though this form was already
    mounted before the click happened.
*/
function ContactForm({ servicePlans, selectedService })
{
    const [form, setForm] = useState(initialFormState);
    const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
    const serviceOptions = [NOT_SURE, ...servicePlans.map((plan) => plan.name)];

    // Adjusting state during render (React's documented pattern for
    // "sync state when a prop changes") instead of an effect — avoids
    // the extra render pass an effect-based setState would trigger.
    // lastSyncedService tracks what's already been applied so this
    // only fires again when a *different* card is clicked, not on
    // every re-render.
    const [lastSyncedService, setLastSyncedService] = useState(selectedService);
    if (selectedService && selectedService !== lastSyncedService)
    {
        setLastSyncedService(selectedService);
        setForm((prev) => ({ ...prev, service: selectedService }));
    }

    function handleChange(event)
    {
        const { name, value, type, checked } = event.target;
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }

    async function handleSubmit(event)
    {
        event.preventDefault();

        // Honeypot tripped — silently drop it instead of telling a bot
        // it worked or didn't.
        if (form.botcheck)
        {
            return;
        }

        setStatus('sending');

        const emailFields = {
            name: form.name,
            business_name: form.businessName || 'Not provided',
            email: form.email,
            phone: form.phone || 'Not provided',
            website_url: form.hasNoWebsite ? "Doesn't have a website yet" : (form.websiteUrl || 'Not provided'),
            service: form.service,
            message: form.message,
        };

        const results = await Promise.allSettled([
            submitContactForm(form),
            sendContactEmail(emailFields),
        ]);

        const succeeded = results.some((result) => result.status === 'fulfilled');

        if (succeeded)
        {
            setStatus('success');
            setForm(initialFormState);
        }
        else
        {
            setStatus('error');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your name" required/>
            </div>

            <div>
                <label htmlFor="businessName">Business name</label>
                <input id="businessName" name="businessName" type="text" value={form.businessName} onChange={handleChange} placeholder="Your business name"/>
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required/>
            </div>

            <div>
                <label htmlFor="phone">Phone (optional)</label>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(555) 555-5555"/>
            </div>

            {!form.hasNoWebsite && (
                <div>
                    <label htmlFor="websiteUrl">Website URL</label>
                    <input id="websiteUrl" name="websiteUrl" type="text" value={form.websiteUrl} onChange={handleChange} placeholder="yourbusiness.com"/>
                </div>
            )}

            <label className="checkbox-field">
                <input type="checkbox" name="hasNoWebsite" checked={form.hasNoWebsite} onChange={handleChange}/>
                <span>I don&apos;t currently have a website</span>
            </label>

            <div>
                <label htmlFor="service">What are you interested in?</label>
                <select id="service" name="service" value={form.service} onChange={handleChange}>
                    {serviceOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="What would you like us to take a look at?" required/>
            </div>

            {/* Honeypot field — hidden from real visitors via CSS, left empty by them but often filled in by bots. */}
            <input
                type="text"
                name="botcheck"
                value={form.botcheck}
                onChange={handleChange}
                className="honeypot-field"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
            />

            <button className="button button-primary" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && <p className="form-success">Thanks — we&apos;ll get back to you soon.</p>}
            {status === 'error' && <p className="form-error">Something went wrong. Try again, or email us directly at support@quantumarc.net.</p>}
        </form>
    )
}

/*
  ContactSection Component

  Props:
  - content: object from siteContent.js
  - servicePlans / selectedService: passed through to ContactForm —
    see its prop doc above
*/
function ContactSection({ content, servicePlans, selectedService }) {
  return (
    <section id="contact" className="page-section contact-section">
        <div className="section-header">
            <p className="section-kicker">{content.kicker}</p>
            <h2 className="section-title">{content.title}</h2>
            <p className="section-description">{content.description}</p>
        </div>

        <ContactForm servicePlans={servicePlans} selectedService={selectedService} />
    </section>
  )
}

export default ContactSection
