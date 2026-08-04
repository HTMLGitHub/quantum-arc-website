/*
  Quantum Arc Website
  BrightPath — Footer

  Repeats the concept-project disclaimer at the bottom of every
  BrightPath page (in addition to the top bar in BrightPathHeader and
  the badge on the portfolio card) — this project should never be
  mistaken for a real Quantum Arc client at any point in the page.
*/

import { Link } from 'react-router-dom'
import { bpNavLinks } from '../data/brightpathContent'

export default function BrightPathFooter() {
  return (
    <footer className="bp-footer">
      <div className="bp-container bp-footer-inner">
        <div>
          <p className="bp-brand-name">BrightPath Youth Collective</p>
          <p className="bp-footer-note">
            A concept website designed and built by{' '}
            <Link to="/">Quantum Arc</Link> — shown here as a portfolio
            showcase, not a live nonprofit.
          </p>
        </div>

        <nav className="bp-footer-links" aria-label="BrightPath footer navigation">
          {bpNavLinks.map((link) => (
            <Link key={link.href} to={link.href}>{link.label}</Link>
          ))}
        </nav>

        <Link to="/#portfolio" className="bp-footer-back">
          ← Back to Quantum Arc portfolio
        </Link>
      </div>
    </footer>
  )
}
