/*
  Quantum Arc Website
  BrightPath — Programs
*/

import BrightPathHeader from '../components/BrightPathHeader'
import BrightPathFooter from '../components/BrightPathFooter'
import { bpPrograms } from '../data/brightpathContent'
import '../styles/brightpath.css'

export default function BrightPathPrograms() {
  return (
    <div className="brightpath">
      <BrightPathHeader />

      <main>
        <section className="bp-section bp-container" style={{ paddingBottom: 0 }}>
          <p className="bp-kicker">Programs</p>
          <h1 className="bp-title">Support that shows up every week.</h1>
          <p className="bp-body">
            Every BrightPath program is free. Transportation and meal support are available
            for families who need them — just ask a program coordinator.
          </p>
        </section>

        <section className="bp-section">
          <div className="bp-container bp-grid">
            {bpPrograms.map((program) => (
              <div key={program.id} className="bp-card">
                <span className="bp-card-eyebrow">{program.ages}</span>
                <h3>{program.name}</h3>
                <p>{program.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BrightPathFooter />
    </div>
  )
}
