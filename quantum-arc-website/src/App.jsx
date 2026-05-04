import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

function App() {
  return (
    <main className="page-shell">
      <section className="page-section">
        <p className="section-kicker">Quantum Arc</p>

        <h1>Building useful software for modern businesses.</h1>

        <p className="section-description">
          Quantum Arc is a technology company focused on practical software,
          AI tools, automation, and digital systems that help people work smarter.
        </p>

        <div className="button-row">
          <a className="button button-primary" href="#contact">
            Contact Us
          </a>

          <a className="button button-secondary" href="#learn-more">
            Learn More
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
