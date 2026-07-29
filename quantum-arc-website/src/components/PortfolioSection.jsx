/*
  Quantum Arc Website
  Portfolio Section Component

  Shows real portfolio projects fetched from Supabase (see
  src/data/portfolioProjects.js). Hides itself entirely until there's
  at least one — an empty "portfolio" section undercuts credibility
  more than just not having the section yet.
*/

/*
  PortfolioCard Component

  This is defined before PortfolioSection because PortfolioSection uses it
  while mapping through the projects data.

  A project can have neither image nor URL yet (just described in
  text), an image only (site not live, but there's a mockup/screenshot
  to show), a URL only, or both — every piece here is optional.
*/
function PortfolioCard({ label, name, description, websiteUrl, imageUrl }) {
    return (
        <div className="card portfolio-card">
            {imageUrl && (
                <img className="portfolio-image" src={imageUrl} alt={`Preview of ${name}`} />
            )}

            <div className="card-padded portfolio-card-body">
                {label && <p className="portfolio-label">{label}</p>}
                <h3>{name}</h3>
                <p>{description}</p>

                {websiteUrl && (
                    <a className="portfolio-link" href={websiteUrl} target="_blank" rel="noopener noreferrer">
                        Visit site →
                    </a>
                )}
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
