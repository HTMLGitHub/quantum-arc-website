/*
  Quantum Arc Website
  BrightPath — About
*/

import BrightPathHeader from '../components/BrightPathHeader'
import BrightPathFooter from '../components/BrightPathFooter'
import { bpAbout } from '../data/brightpathContent'
import '../styles/brightpath.css'

export default function BrightPathAbout() {
  return (
    <div className="brightpath">
      <BrightPathHeader />

      <main>
        <section className="bp-section bp-container" style={{ paddingBottom: 0 }}>
          <p className="bp-kicker">{bpAbout.storyKicker}</p>
          <h1 className="bp-title">{bpAbout.storyTitle}</h1>
          <p className="bp-body">{bpAbout.storyBody}</p>
        </section>

        <section className="bp-section bp-section-soft">
          <div className="bp-container">
            <p className="bp-kicker">{bpAbout.missionTitle}</p>
            <p className="bp-body" style={{ fontSize: '1.2rem' }}>{bpAbout.missionBody}</p>
          </div>
        </section>

        <section className="bp-section">
          <div className="bp-container">
            <p className="bp-kicker">What We Value</p>
            <div className="bp-grid">
              {bpAbout.values.map((value) => (
                <div key={value.title} className="bp-card">
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <BrightPathFooter />
    </div>
  )
}
