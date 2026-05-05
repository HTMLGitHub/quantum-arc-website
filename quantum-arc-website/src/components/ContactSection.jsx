/*
  Quantum Arc Website
  Contact Section Component

  This section gives visitors a clear way to contact the company.

  For now:
  - The form is visual only.
  - The email link works.
  - Later, the form can be connected to an API, email service, or backend.
*/

/*
  ContactForm Component

  This is defined before ContactSection because ContactSection uses it.

  Current status:
  - Static frontend form
  - Does not submit anywhere yet
*/
function ContactForm()
{
    return (
        <form className="contact-form">
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" placeholder="Your name"/>
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="you@example.com"/>
            </div>

            <div>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="Tell us what you are trying to build..."/>
            </div>

            <button className="button button-primary" type="button">Send Message</button>
        </form>
    )
}

/*
  ContactDetails Component

  This is defined before ContactSection because ContactSection uses it.
*/
function ContactDetails({ email })
{
    return(
        <div className="card card-padded contact-details">
            <h3>Contact Info</h3>

            <p>
                Email Quantum Arc directly at:
            </p>

            <a className="contact-email" href={`mailto:${email}`}>
                {email}
            </a>

            <p className="contact-note">
                This is the best contact method for now. A working form connection can be added in a later sprint.
            </p>
        </div>
    )
}
        
/*
  ContactSection Component

  Props:
  - content: object from siteContent.js
*/
function ContactSection({ content }) {
  return (
    <section id="contact" className="page-section contact-section">
        <div className="section-header">
            <p className="section-kicker">{content.kicker}</p>
            <h2 className="section-title">{content.title}</h2>
            <p className="section-description">{content.description}</p>
        </div>

        <div className="contact-layout">
            <ContactForm />

            <ContactDetails email={content.email} />
        </div>
    </section>
  )
}

export default ContactSection