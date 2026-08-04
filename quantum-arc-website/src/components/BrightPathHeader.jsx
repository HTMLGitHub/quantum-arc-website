/*
  Quantum Arc Website
  BrightPath — Header

  BrightPath is a concept showcase project, not a real Quantum Arc
  client — see the disclaimer bar below and the "Concept" badge on the
  portfolio card (PortfolioSection.jsx). This header is intentionally
  visually distinct from Quantum Arc's own site.styles/brightpath.css
  scopes all of this under the .brightpath class so it never leaks
  into or clashes with the main site's global.css.

  All navigation uses react-router's <Link> with relative paths, so it
  stays on whichever domain it's loaded from (quantumarc.net or
  dev.quantumarc.net) — nothing here hardcodes a host.
*/

import { Link, NavLink } from 'react-router-dom'
import { bpNavLinks } from '../data/brightpathContent'

export default function BrightPathHeader() {
  return (
    <>
      <div className="bp-disclaimer">
        Concept / Showcase Project — built by{' '}
        <Link to="/">Quantum Arc</Link> to demonstrate design and
        development work. BrightPath Youth Collective is not a real
        organization.
      </div>

      <header className="bp-header">
        <div className="bp-container bp-header-inner">
          <Link to="/portfolio/brightpath" className="bp-brand">
            <span className="bp-brand-mark">BP</span>
            <span className="bp-brand-name">BrightPath Youth Collective</span>
          </Link>

          <nav className="bp-nav" aria-label="BrightPath navigation">
            {bpNavLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === '/portfolio/brightpath'}
                className={({ isActive }) => 'bp-nav-link' + (isActive ? ' is-active' : '')}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
    </>
  )
}
