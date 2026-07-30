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

import {
  aboutContent,
  contactContent,
  heroContent,
  navigationLinks,
  portfolioContent,
  servicesContent,
} from '../data/siteContent.js'
import { fetchLatestPosts } from '../data/blogPosts.js'
import { fetchPortfolioProjects } from '../data/portfolioProjects.js'

/*
  Component imports.

  Each component controls one major part of the homepage.
*/
import { useEffect, useState } from 'react'
import AboutSection from '../components/AboutSection'
import BlogPreviewSection from '../components/BlogPreviewSection'
import ContactSection from '../components/ContactSection'
import HeroSection from '../components/HeroSection'
import PortfolioSection from '../components/PortfolioSection'
import ServicesSection from '../components/ServicesSection'
import Footer from '../components/Footer'
import Header from '../components/Header'

/*
  App Component

  This is the root React component for the site.
*/
function HomePage() {
  // Blog posts now live in Supabase instead of a static import, so they
  // have to be fetched after the page mounts. BlogPreviewSection already
  // renders nothing when given an empty array, so there's no extra
  // loading state needed here.
  const [latestPosts, setLatestPosts] = useState([])
  // Same story as blog posts — portfolio projects now live in Supabase,
  // so they're fetched after mount. PortfolioSection returns null until
  // this has at least one project, so no separate loading state needed.
  const [portfolioProjects, setPortfolioProjects] = useState([])
  // Set when a "Get Started" link on a pricing card is clicked, and
  // read by ContactSection to auto-select that service in the contact
  // form's dropdown. Lives here since Services and Contact are
  // siblings — neither can hand this to the other directly.
  const [selectedService, setSelectedService] = useState('')

  useEffect(() => {
    let cancelled = false

    // Fetch one extra so BlogPreviewSection's "View All Posts" link can
    // tell there are more than the 3 it displays.
    fetchLatestPosts(4)
      .then((data) => {
        if (!cancelled) setLatestPosts(data)
      })
      .catch(() => {
        // Homepage preview is non-critical — fail quietly and just
        // show no blog section rather than breaking the whole page.
      })

    fetchPortfolioProjects()
      .then((data) => {
        if (!cancelled) setPortfolioProjects(data)
      })
      .catch(() => {
        // Same reasoning — fail quietly, section just stays hidden.
      })

    return () => { cancelled = true }
  }, [])

  // PortfolioSection/BlogPreviewSection already hide themselves when
  // there's nothing to show — mirror that here so the nav never links
  // to a section that isn't on the page.
  const visibleNavLinks = navigationLinks.filter((link) => {
    if (link.href === '#portfolio') return portfolioProjects.length > 0
    if (link.href === '#blog') return latestPosts.length > 0
    return true
  })

  return (
    <>
      <Header links={visibleNavLinks} />

      <main className="page-shell">
        <HeroSection content={heroContent} />
        <ServicesSection content={servicesContent} onGetStarted={setSelectedService} />
        <PortfolioSection content={portfolioContent} projects={portfolioProjects} />
        <AboutSection content={aboutContent} />
        <BlogPreviewSection posts={latestPosts} />
        <ContactSection
          content={contactContent}
          servicePlans={servicesContent.plans}
          selectedService={selectedService}
        />
      </main>

      <Footer />
    </>
  )
}

export default HomePage
