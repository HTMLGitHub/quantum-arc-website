/*
  Quantum Arc Website
  BrightPath — Home

  BrightPath is a concept/showcase portfolio project (see the
  disclaimer in BrightPathHeader) — not a real Quantum Arc client.
*/

import { Link } from 'react-router-dom'
import BrightPathHeader from '../components/BrightPathHeader'
import BrightPathFooter from '../components/BrightPathFooter'
import { bpHero, bpStats, bpPrograms } from '../data/brightpathContent'
import '../styles/brightpath.css'

export default function BrightPathHome() {
  return (
    <div className="brightpath">
      <BrightPathHeader />

      <main>
        <section className="bp-hero bp-container">
          <p className="bp-kicker">{bpHero.kicker}</p>
          <h1 className="bp-title">{bpHero.title}</h1>
          <p className="bp-body" style={{ margin: '0 auto 2rem' }}>{bpHero.description}</p>
          <div className="button-row" style={{ justifyContent: 'center' }}>
            <Link className="bp-button bp-button-primary" to="/portfolio/brightpath/get-involved">
              Get Involved
            </Link>
            <Link className="bp-button bp-button-secondary" to="/portfolio/brightpath/programs">
              See Our Programs
            </Link>
          </div>
        </section>

        <section className="bp-section bp-section-soft">
          <div className="bp-container bp-stats">
            {bpStats.map((stat) => (
              <div key={stat.label}>
                <div className="bp-stat-value">{stat.value}</div>
                <div className="bp-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="bp-section">
          <div className="bp-container">
            <p className="bp-kicker">What We Run</p>
            <h2 className="bp-title">Five programs, one goal.</h2>
            <p className="bp-body">
              Every program is free and built around consistency — showing up every week,
              not just for a single event.
            </p>

            <div className="bp-grid">
              {bpPrograms.slice(0, 3).map((program) => (
                <div key={program.id} className="bp-card">
                  <span className="bp-card-eyebrow">{program.ages}</span>
                  <h3>{program.name}</h3>
                  <p>{program.description}</p>
                </div>
              ))}
            </div>

            <div className="button-row" style={{ marginTop: '2rem' }}>
              <Link className="bp-button bp-button-secondary" to="/portfolio/brightpath/programs">
                View all programs →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <BrightPathFooter />
    </div>
  )
}
