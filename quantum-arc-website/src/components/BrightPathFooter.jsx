/*
  Quantum Arc Website
  BrightPath — Footer

  The "back to Quantum Arc" exit link lives in the top disclaimer bar
  (see BrightPathHeader) as a persistent UI control, not here — this
  footer sticks to BrightPath's own content/navigation so it reads as
  part of the showcase site itself.
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
      </div>
    </footer>
  )
}
