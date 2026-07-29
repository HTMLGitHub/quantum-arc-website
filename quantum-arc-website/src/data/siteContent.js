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

  Blog posts now live in Supabase (see src/data/blogPosts.js) instead of
  being loaded synchronously at build time, so this list can no longer
  check "are there posts yet" before deciding whether to show the Blog
  link. It's shown unconditionally instead — /blog and BlogPreviewSection
  both already handle the empty-posts case gracefully.
*/
export const navigationLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About Us', href: '#about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '#contact' },
]

/*
  Hero section content.

  This controls the first major section visitors see when opening the website.
  Kept short and concrete: what we do, who it's for, and a clear next step.
*/
export const heroContent =
{
  kicker: 'Quantum Arc',
  title: 'Websites and automation for small businesses.',
  description:
    'We build fast, credible websites and simple automation for small business owners — so you look professional, save time, and turn visitors into customers.',
  primaryAction: { label: 'Get a Free Website Review', href: '#contact' },
  secondaryAction: { label: 'See Pricing', href: '#services' },
}

/*
  Services section content.

  Real starting prices so visitors don't have to ask just to find out
  if this is in their budget.
*/
/*
  Each feature in a plan's list is either:
  - a plain string, or
  - { text, info: [...] } when it needs a small expandable clarification
    (rendered as an info icon next to the text — see InfoNote in
    ServicesSection.jsx). Used for things that are easy to misread as a
    bigger promise than intended (e.g. "typical turnaround" isn't a
    hard deadline).

  A plan can also carry:
  - notes: { label, includes?, excludes? } — a card-level expandable
    breakdown, used for Website Care's "what counts as a minor update".
  - callout: a short line always shown under the features, used for
    Business Automation's "tell us your repetitive task" prompt.
*/
export const servicesContent = {
  kicker: 'Services',
  title: 'Websites and automation, priced simply.',
  description: 'Straightforward starting prices and clearly defined scope.',
  plans: [
    {
      icon: '🌐',
      name: 'Starter Website',
      price: 'From $650',
      description: 'A clean, professional site to get your business online fast.',
      features: [
        'Up to 5 pages',
        'Mobile-friendly design',
        'Contact form',
        'Basic SEO setup',
        {
          text: 'Typical turnaround: 2–3 weeks',
          info: ['Timeline begins once you provide the required content, images, and branding.'],
        },
      ],
    },
    {
      icon: '🚀',
      name: 'Business Website',
      price: 'From $950',
      description: 'A larger site built to bring in and convert more customers.',
      features: [
        {
          text: 'Up to 10 pages',
          // $75/page is a placeholder — swap in whatever you actually want to charge.
          info: ['Need more than 10? Additional pages are $75/page.'],
        },
        'Mobile-friendly/custom design',
        'Blog/content section',
        {
          text: 'Contact & lead forms',
          info: ['Request a quote', 'Book a consultation', 'Request a callback', 'Contact form', 'Estimate request'],
        },
        'Basic SEO setup',
        'Analytics setup',
      ],
    },
    {
      icon: '🛠️',
      name: 'Website Care',
      // Object instead of a plain string — renders as a Monthly/Annual
      // toggle (see BillingToggle in ServicesSection.jsx). $500/year
      // vs. $50 x 12 = $600 works out to exactly 2 months free.
      price: {
        monthly: '$50/month',
        annual: '$500/year',
        annualNote: '2 months free — a $100/year savings',
      },
      description: 'Ongoing updates and monitoring so your site never goes stale.',
      features: [
        'Uptime monitoring',
        'Website backups',
        'Software & dependency maintenance',
        'Basic security monitoring',
        'Up to 30 minutes of minor content updates per month',
      ],
      notes: {
        label: "What counts as a minor update?",
        includes: ['Changing business hours', 'Replacing a photo', 'Updating a phone number', 'Editing text', 'Changing pricing', 'Fixing small content issues'],
        excludes: ['New pages', 'Major redesigns', 'New features', 'Large content additions — billed separately'],
      },
    },
    {
      icon: '⚙️',
      name: 'Business Automation',
      price: 'From $250',
      description: 'Save time by automating repetitive work and connecting the tools your business already uses.',
      features: ['Lead & email automation', 'Spreadsheet/report automation', 'Notifications & follow-ups', 'API/software integrations'],
      callout: "Have a repetitive task? Tell us how you do it today and we'll see if it can be automated.",
    },
  ],
}

/*
  Portfolio section header text. The actual project list now lives in
  Supabase (src/data/portfolioProjects.js) instead of here — this is
  just the kicker/title/description shown above the project grid.
  PortfolioSection hides the whole section until there's at least one
  real project in the database.
*/
export const portfolioContent = {
  kicker: 'Portfolio',
  title: 'A few examples of what we build.',
  description: 'A look at projects Quantum Arc has built.',
}

/*
  About section content.

  This gives visitors a quick understanding of who Quantum Arc is.
*/
export const aboutContent = {
    kicker: 'Who We Are',
    title: 'Work directly with the person building your website.',
    description: `Quantum Arc is an independent software studio based in Michigan. You won't be passed between salespeople, account managers, and outsourced developers — I work directly with you to design, build, launch, and support your website or automation.`,
    highlights:[
        'Business websites',
        'Custom web applications',
        'AI & workflow automation',
        'Integrations & internal tools',
    ],
}

/*
  Contact section content.

  This gives users a clear, low-commitment next step.
*/
export const contactContent = {
    kicker: 'Contact',
    title: 'Get a free website review.',
    description: 'Send us your current site (or your business info if you don\'t have one yet) and we\'ll tell you what\'s working, what isn\'t, and what it would take to fix it — no obligation.',
}