/* Quantum Arc Website
  About Section Component

  This section explains who Quantum Arc is and what the company focuses on.
*/

/*
  HighlightItem Component

  This is defined before AboutSection because AboutSection uses it
  to render each highlight.
*/
function HighlightItem({text}) {
    return(
        <li className="about-highlight-item">
            <span className="highlight-dot" aria-hidden="true"/>
            <span>{text}</span>
        </li>
    )
}

/*
  AboutSection Component

  Props:
  - content: object from siteContent.js
*/
function AboutSection({content}) {
    return(
        <section id="about" className="page-section about-section" >
            <div className="about-layout">
                <div>
                    <p className="section-kicker">{content.kicker}</p>
                    <h2 className="section-title">{content.title}</h2>
                    <p className="section-description">{content.description}</p>
                </div>

                <div className="card card-padded about-card">
                    <h3>Core Focus</h3>

                    <ul className="about-highlight-list">
                        {content.highlights.map((highlight) => (
                            <HighlightItem key={highlight} text={highlight} />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default AboutSection