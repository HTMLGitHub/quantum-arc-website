/*
  Quantum Arc Website
  Header Component

  This component renders:
  - Site/brand name
  - Main navigation links
  - A contact call-to-action button

  The navigation links are passed in as props from App.jsx.
*/

/*
  BrandLogo Component

  This small component is defined before Header because Header uses it.

  Keeping this separate makes it easier to update the logo later.
*/
function BrandLogo() {
    return(
        <a className="brand-logo" href="#home" aria-label="Quantum Arc Home">
            <span className="brand-mark">QA</span>
            <span className="brand-name">Quantum Arc</span>
        </a>
    )
}

/*
  NavigationLink Component

  This renders one navigation link.

  It is defined before Header because Header maps through the navigation data
  and calls this component for each link.
*/
function NavigationLink({ label, href }) {
    return (
        <a className="nav-link" href={href}>
            {label}
        </a>
    )
}

/*
  Header Component

  Props: 
  - links: array of navigation link objects from siteContent.js

*/
function Header({ links }) {
    return(
        <header className="site-header">
            <div className="site-header-inner page-shell">
                <BrandLogo />

                <nav className="site-nav" aria-label="Main navigation">
                    {links.map((link) => (
                        <NavigationLink key={link.href} label={link.label} href={link.href}/>
                    ))}
                </nav>

                <a className="button button-primary" href="#contact">
                    Get Started
                </a>
            </div>
        </header>
    )
}

export default Header