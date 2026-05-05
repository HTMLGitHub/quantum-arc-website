/*
  Quantum Arc Website
  Hero Section Component

  This is the first major section users see.

  It includes:
  - Main headline
  - Short description
  - Two action buttons
  - Visual hero image
*/

import heroImage from '../assets/hero.png';


/*
  HeroActions Component

  This is defined before HeroSection because HeroSection uses it.

  It renders the primary and secondary call-to-action buttons.
*/
function HeroActions({primaryAction, secondaryAction}) {
    return(
        <div className="button-row">
            <a className="button button-primary" href={primaryAction.href}>
                {primaryAction.label}
            </a>
            <a className="button button-secondary" href={secondaryAction.href}>
                {secondaryAction.label}
            </a>
        </div>
    )
}

/*
  HeroVisual Component

  This is defined before HeroSection because HeroSection uses it.

  It renders the image area on the right side of the hero.
*/
function HeroVisual() {
    return(
        <div className="hero-visual card">
            <img
                className="hero-image"
                src={heroImage}
                alt="Abstract Quantum Arc brand artwork"
            />

            <div className="hero-visual-caption">
                <strong>Software. AI. Automation.</strong>
                <span>Built with practical business outcomes in mind.</span>
            </div>
        </div>
    )
}
/*
  HeroSection Component

  Props:
  - content: object from siteContent.js
*/
function HeroSection({content}) {
    return(
        <section id="home" className="hero-section page-section">
            <div className='hero-layout'>
                <div className='hero-copy'>
                    <p className='section-kicker'>{content.kicker}</p>

                    <h1>{content.title}</h1>

                    <p className="section=description hero-description">
                        {content.description}
                    </p>

                    <HeroActions
                        primaryAction={content.primaryAction}
                        secondaryAction={content.secondaryAction}
                    />
                </div>

                <HeroVisual />
            
            </div>
        </section>
    )
}
export default HeroSection