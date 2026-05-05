/*
  Quantum Arc Website
  Footer Component

  This appears at the bottom of the website.

  It includes:
  - Company name
  - Simple copyright text
  - Small brand message
*/

/*
  getCurrentYear Helper Function

  This is defined before Footer because Footer uses it.

  Purpose:
  - Keeps the footer year updated automatically.
*/
function getCurrentYear() {
    return new Date().getFullYear();
}

/*
  Footer Component
*/
function Footer()
{
    const currentYear = getCurrentYear();

    return(
        <footer className="site-footer">
            <div className="page-shell footer-content">
                <div>
                    <strong>Quantum Arc</strong>

                    <p>Software, AI tools, automation, and practical digital systems.</p>
                </div>

                <p className="footer-copy">
                    &copy; {currentYear} Quantum Arc. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer