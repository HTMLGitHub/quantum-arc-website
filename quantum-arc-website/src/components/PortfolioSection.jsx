/*
  Quantum Arc Website
  Portfolio Section Component

  Shows real portfolio projects fetched from Supabase (see
  src/data/portfolioProjects.js). Hides itself entirely until there's
  at least one — an empty "portfolio" section undercuts credibility
  more than just not having the section yet.
*/

import { Link } from 'react-router-dom'

/*
  PortfolioCard Component

  This is defined before PortfolioSection because PortfolioSection uses it
  while mapping through the projects data.

  A project can have neither image nor URL yet (just described in
  text), an image only (site not live, but there's a mockup/screenshot
  to show), a URL only, or both — every piece here is optional.

  websiteUrl can point two different places:
  - An absolute URL (e.g. "https://magazine.showcase.quantumarc.net")
    for a project hosted as its own separate site — opens in a new
    tab, same as before.
  - A relative, in-app path (e.g. "/portfolio/brightpath") for a
    project built as pages inside this app — navigates with
    react-router's <Link> instead, so it doesn't reload the page or
    leave the current domain/environment.

  Note: the thumbnail image itself no longer carries a "Concept /
  Showcase Project" caption — that would duplicate the badge rendered
  here in the card body, right below the image. One designation, one
  place.
*/
function isInternalPath(url) {
    return typeof url === 'string' && url.startsWith('/')
}

function PortfolioCard({ name, description, websiteUrl, imageUrl, category, technologies, status }) {
    const isConcept = status === 'concept'

    return (
        <div className="card portfolio-card">
            {imageUrl && (
                <img className="portfolio-image" src={imageUrl} alt={`Preview of ${name}`} />
            )}

            <div className="card-padded portfolio-card-body">
                {isConcept && (
                    <p className="portfolio-concept-badge">Concept / Showcase Project</p>
                )}

                {/*
                  Single small tag above the title — category (e.g.
                  "Nonprofit / Youth Organization", "UX/UI Design").
                  There's deliberately no second tag below the title
                  anymore; showing project "type" and "category" as two
                  separate lines was redundant once every current
                  project already has the concept badge above.
                */}
                {category && <p className="portfolio-label">{category}</p>}

                <h3>{name}</h3>
                <p>{description}</p>

                {/*
                  Tech line + CTA link are grouped in one footer block
                  with margin-top: auto (see .portfolio-card-footer), so
                  the whole group anchors to the bottom of the card as a
                  unit — the tech line sits at the same distance from the
                  bottom on every card, not just the link, regardless of
                  how long each project's description runs.
                */}
                <div className="portfolio-card-footer">
                    {technologies?.length > 0 && (
                        <p className="portfolio-tech">{technologies.join(' · ')}</p>
                    )}

                    {websiteUrl && (
                        isInternalPath(websiteUrl) ? (
                            <Link className="portfolio-link" to={websiteUrl}>
                                View Project →
                            </Link>
                        ) : (
                            <a className="portfolio-link" href={websiteUrl} target="_blank" rel="noopener noreferrer">
                                Visit site →
                            </a>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

/*
  PortfolioSection Component

  Props:
  - content: section header text (kicker/title/description) from siteContent.js
  - projects: array fetched from Supabase, passed down from HomePage
*/
function PortfolioSection({ content, projects }) {
    if (!projects || projects.length === 0) { return null; }

    return (
        <section id="portfolio" className="page-section">
            <div className="section-header">
                <p className="section-kicker">{content.kicker}</p>
                <h2 className="section-title">{content.title}</h2>
                <p className="section-description">{content.description}</p>
            </div>

            <div className="grid grid-3">
                {projects.map((project) => (
                    <PortfolioCard key={project.id} {...project} />
                ))}
            </div>
        </section>
    )
}

export default PortfolioSection
