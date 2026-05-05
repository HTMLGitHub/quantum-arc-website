/*
  Quantum Arc Website
  Site Content Data

  This file stores the reusable text/content for the homepage.

  Why this exists:
  - Keeps App.jsx and section components cleaner.
  - Makes it easier to update wording later.
  - Lets us reuse content across multiple components without repeating ourselves.

  Future use:
  - This can later be replaced by a CMS, database, markdown files, or API response.
*/

/*
  Navigation links shown in the header.

  Each item has:
  - label: what the user sees
  - href: where the link jumps on the page
*/
export const navigationLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

/*
  Hero section content.

  This controls the first major section visitors see when opening the website.
*/
export const heroContent = {
  kicker: 'Quantum Arc',
  title: 'Building useful software for modern businesses.',
  description:
    'Quantum Arc is a technology company focused on practical software, AI tools, automation, and digital systems that help people work smarter.',
  primaryAction: { label: 'Contact Us', href: '#contact' },
  secondaryAction: { label: 'View Services', href: '#services' },
}   

/*
  About section content.

  This gives visitors a quick understanding of who Quantum Arc is.
*/
export const aboutContent = {
    headline: 'Who We Are',
    title: 'A software company focused on useful, understandable technology.',
    description: `Quantum Arc is built around a simple idea: technology should feel helpful, not overwhelming. 
    We focus on software that solves real problems for real people, especially businesses that want better tools without unnecessary complexity.`,
    highlights:[
        'Practical software solutions',
        'AI assisted systems and automation',
        'Business-focused digitial tools',
    ],
}

/*
  Blog preview cards.

  These are placeholder articles for now.

  Later:
  - These can become real blog posts.
  - Each item can link to its own page.
  - We can store blog content in markdown or a database.
*/
export const blogPosts = [
    {
        title: 'The Future of AI in Small Business',
        excerpt: 'How AI tools can help small businesses save time, make smarter decisions, and compete with larger companies.',
        date: 'June 1, 2024',
        link: '#',
    },
    {
        title: '5 Signs Your Business Needs a New Website',
        excerpt: 'Is your website outdated, slow, or not generating leads? Here are some signs it’s time for an upgrade.',
        date: 'May 15, 2024',
        link: '#',
    },
    {
        title: 'Automating Your Workflow: A Beginner’s Guide',
        excerpt: 'Learn how to identify repetitive tasks and use automation tools to free up your time for more important work.',
        date: 'April 30, 2024',
        link: '#',
    },
]       

/*
  Contact section content.

  This gives users a clear next step.
*/
export const contactContent = {
    kicker: 'Contact',
    title: 'Have a project idea or business problem to solve?',
    description: 'Reach out to Quantum Arc and let us know what you are trying to build, improve, automate or explore.',
    email: 'admin@quantumarc.com',
}