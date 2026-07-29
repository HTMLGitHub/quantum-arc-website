/*
  Quantum Arc Website
  Services Section Component

  Shows real starting prices for each service so visitors know if this
  fits their budget without having to ask first.
*/

import { useState } from 'react'

/*
  BillingToggle Component

  Renders a Monthly/Annual switch for plans priced both ways (right
  now, just Website Care). `price` is { monthly, annual, annualNote }
  instead of a plain string for these — ServiceCard below picks
  between this and a plain <p> based on which shape it gets.
*/
function BillingToggle({ price }) {
    const [billing, setBilling] = useState('monthly') // 'monthly' | 'annual'
    const isAnnual = billing === 'annual'

    return (
        <div className="billing-toggle-wrap">
            <div className="billing-toggle" role="radiogroup" aria-label="Billing period">
                <button
                    type="button"
                    role="radio"
                    aria-checked={!isAnnual}
                    className={`billing-option${!isAnnual ? ' active' : ''}`}
                    onClick={() => setBilling('monthly')}
                >
                    Monthly
                </button>
                <button
                    type="button"
                    role="radio"
                    aria-checked={isAnnual}
                    className={`billing-option${isAnnual ? ' active' : ''}`}
                    onClick={() => setBilling('annual')}
                >
                    Annual
                </button>
            </div>

            <p className="service-price">{isAnnual ? price.annual : price.monthly}</p>
            {isAnnual && price.annualNote && <p className="billing-note">{price.annualNote}</p>}
        </div>
    )
}

/*
  InfoTooltip Component

  Wraps a trigger element with a floating panel that appears on hover
  and on keyboard focus (:focus-within also covers a tap on touch
  devices, since tapping focuses the trigger). The panel is positioned
  absolutely, so showing it never pushes the trigger or surrounding
  content around — it just floats on top.
*/
function InfoTooltip({ trigger, children }) {
    return (
        <span className="info-tooltip-wrap">
            {trigger}
            <span className="info-tooltip" role="tooltip">
                {children}
            </span>
        </span>
    )
}

/*
  ServiceFeature Component

  Renders one line in a plan's feature list. Most features are plain
  strings; a few carry an { text, info } shape that adds a small "i"
  tooltip trigger next to the text.
*/
function ServiceFeature({ feature }) {
    const hasInfo = typeof feature === 'object'
    const text = hasInfo ? feature.text : feature

    return (
        <li>
            <span>{text}</span>
            {hasInfo && feature.info && (
                <InfoTooltip
                    trigger={
                        <button type="button" className="info-icon" aria-label="More info">i</button>
                    }
                >
                    <ul className="info-tooltip-list">
                        {feature.info.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                </InfoTooltip>
            )}
        </li>
    )
}

/*
  ServiceCardNotes Component

  A card-level tooltip, e.g. Website Care's "what counts as a minor
  update" — too much detail to show by default, but available on
  hover for anyone who wants it.
*/
function ServiceCardNotes({ notes }) {
    return (
        <div className="service-notes">
            <InfoTooltip
                trigger={
                    <button type="button" className="service-notes-trigger">{notes.label}</button>
                }
            >
                {notes.includes && (
                    <>
                        <p className="info-tooltip-heading">Included</p>
                        <ul className="info-tooltip-list">
                            {notes.includes.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                    </>
                )}

                {notes.excludes && (
                    <>
                        <p className="info-tooltip-heading">Not included</p>
                        <ul className="info-tooltip-list">
                            {notes.excludes.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                    </>
                )}
            </InfoTooltip>
        </div>
    )
}

/*
  ServiceCard Component

  Props come straight from one entry in servicesContent.plans, plus
  onGetStarted (passed down from ServicesSection).

  The "Get Started" link both navigates to #contact (plain anchor
  behavior) and calls onGetStarted(name) so the contact form's service
  dropdown auto-selects this plan — the two can coexist on one <a>
  without conflicting.
*/
function ServiceCard({ icon, name, price, description, features, notes, callout, onGetStarted }) {
    return (
        <div className="card card-padded service-card">
            <span className="service-icon" aria-hidden="true">{icon}</span>

            <h3>{name}</h3>

            {typeof price === 'string'
                ? <p className="service-price">{price}</p>
                : <BillingToggle price={price} />
            }

            <p>{description}</p>

            <ul className="service-feature-list">
                {features.map((feature) => (
                    <ServiceFeature key={typeof feature === 'object' ? feature.text : feature} feature={feature} />
                ))}
            </ul>

            {notes && <ServiceCardNotes notes={notes} />}
            {callout && <p className="service-callout">{callout}</p>}

            <a
                className="button button-secondary header-button service-cta"
                href="#contact"
                onClick={() => onGetStarted(name)}
            >
                Get Started
            </a>
        </div>
    )
}

/*
  ServicesSection Component

  Props:
  - content: object from siteContent.js
  - onGetStarted: called with a plan's name when its "Get Started" link
    is clicked — passed straight through to each ServiceCard
*/
function ServicesSection({ content, onGetStarted }) {
    return (
        <section id="services" className="page-section">
            <div className="section-header">
                <p className="section-kicker">{content.kicker}</p>
                <h2 className="section-title">{content.title}</h2>
                <p className="section-description">{content.description}</p>
            </div>

            <div className="grid grid-2">
                {content.plans.map((plan) => (
                    <ServiceCard key={plan.name} {...plan} onGetStarted={onGetStarted} />
                ))}
            </div>
        </section>
    )
}

export default ServicesSection
