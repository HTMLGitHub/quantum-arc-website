/*
  Quantum Arc Website
  BrightPath — Get Involved
*/

import { Link } from 'react-router-dom'
import BrightPathHeader from '../components/BrightPathHeader'
import BrightPathFooter from '../components/BrightPathFooter'
import { bpGetInvolved } from '../data/brightpathContent'
import '../styles/brightpath.css'

export default function BrightPathGetInvolved() {
  return (
    <div className="brightpath">
      <BrightPathHeader />

      <main>
        <section className="bp-section bp-container" style={{ paddingBottom: 0 }}>
          <p className="bp-kicker">{bpGetInvolved.kicker}</p>
          <h1 className="bp-title">{bpGetInvolved.title}</h1>
        </section>

        <section className="bp-section">
          <div className="bp-container bp-grid">
            {bpGetInvolved.ways.map((way) => (
              <div key={way.title} className="bp-card">
                <h3>{way.title}</h3>
                <p>{way.description}</p>
                <div className="button-row" style={{ marginTop: '1rem' }}>
                  <Link className="bp-button bp-button-secondary" to="/portfolio/brightpath/contact">
                    {way.cta} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BrightPathFooter />
    </div>
  )
}
