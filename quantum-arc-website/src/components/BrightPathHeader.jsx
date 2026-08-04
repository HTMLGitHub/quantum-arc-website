/*
  Quantum Arc Website
  BrightPath — Header

  BrightPath is a concept showcase project, not a real Quantum Arc
  client. The bar above the site header is a persistent UI control
  (not page content) that says so and always offers a way back to the
  real Quantum Arc site — kept visually separate from BrightPath's own
  branding so it reads as "you're inside a showcase" chrome, not as
  something BrightPath itself wrote about its own site.

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
        <p className="bp-disclaimer-text">
          Concept / Showcase Project — built by Quantum Arc to demonstrate
          design and development work. BrightPath Youth Collective is not a
          real organization.
        </p>
        <Link to="/#portfolio" className="bp-disclaimer-back">
          ← Back to Quantum Arc
        </Link>
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
