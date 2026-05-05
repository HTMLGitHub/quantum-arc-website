/*
  Quantum Arc Website
  Main App Component

  This file assembles the homepage.

  Structure:
  1. Import reusable data first.
  2. Import components.
  3. Render components in page order.

  This keeps App.jsx simple and makes each section easier to edit later.
*/

/*
  Site content imports.

  These are defined before the components are rendered.
*/

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

import {
  aboutContent,
  blogPosts,
  contactContent,
  heroContent,
  navigationLinks,
} from './data/siteContent.js'

/*
  Component imports.

  Each component controls one major part of the homepage.
*/
import AboutSection from './components/AboutSection'
import BlogPreviewSection from './components/BlogPreviewSection'
import ContactSection from './components/ContactSection'
import HeroSection from './components/HeroSection'
import Footer from './components/Footer'
import Header from './components/Header'

/*
  App Component

  This is the root React component for the site.
*/
function App() {
  return (
    <>
      <Header links={navigationLinks} />

      <main className="page-shell">
        <HeroSection content={heroContent} />
        <AboutSection content={aboutContent} />
        <BlogPreviewSection posts={blogPosts} />
        <ContactSection content={contactContent} />
      </main>

      <Footer />
    </>
  )
}

export default App
