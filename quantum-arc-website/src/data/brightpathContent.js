/*
  Quantum Arc Website
  BrightPath Youth Collective — Static Content

  BrightPath is a CONCEPT / SHOWCASE project built by Quantum Arc to
  demonstrate design and development work — it is not a real client or
  a real organization. All copy below is fictional.

  Unlike blog posts and portfolio cards, this page content isn't
  Supabase-backed: there's no admin need to edit a fictional nonprofit's
  program list from a CMS, so it lives here as plain data, imported by
  the BrightPath page components. Keeping it in one file makes the five
  pages easy to keep consistent and easy to replace later if this ever
  needs to become a real, editable site.
*/

export const bpNavLinks = [
  { label: 'Home', href: '/portfolio/brightpath' },
  { label: 'Programs', href: '/portfolio/brightpath/programs' },
  { label: 'About', href: '/portfolio/brightpath/about' },
  { label: 'Get Involved', href: '/portfolio/brightpath/get-involved' },
  { label: 'Contact', href: '/portfolio/brightpath/contact' },
]

export const bpHero = {
  kicker: 'BrightPath Youth Collective',
  title: 'Every young person deserves a clear path forward.',
  description:
    "BrightPath connects youth ages 8–18 with free tutoring, mentorship, and enrichment " +
    "programs — built by neighbors who believe opportunity shouldn't depend on zip code.",
}

export const bpStats = [
  { value: '340+', label: 'Youth served last year' },
  { value: '85', label: 'Active volunteer mentors' },
  { value: '12', label: 'Years in the community' },
  { value: '6', label: 'Weekly program sites' },
]

export const bpPrograms = [
  {
    id: 'tutoring',
    name: 'After-School Tutoring',
    ages: 'Grades 3–8',
    description:
      'Free, drop-in homework help and one-on-one academic support twice a week, ' +
      'staffed by trained volunteer tutors and a licensed program coordinator.',
  },
  {
    id: 'mentorship',
    name: 'Youth Mentorship',
    ages: 'Ages 12–18',
    description:
      'Teens are matched with an adult mentor for consistent, year-long check-ins — ' +
      'built around trust, not a fixed curriculum.',
  },
  {
    id: 'summer-camp',
    name: 'Summer Enrichment Camp',
    ages: 'Ages 8–14',
    description:
      'A six-week summer program mixing arts, hands-on STEM projects, and outdoor time, ' +
      'with need-based scholarships so cost is never the barrier.',
  },
  {
    id: 'life-skills',
    name: 'Life Skills Workshops',
    ages: 'Ages 15–18',
    description:
      'Evening workshops on budgeting, resumes, and applying for college or a first job — ' +
      'taught by community volunteers working in those fields.',
  },
  {
    id: 'leadership-council',
    name: 'Youth Leadership Council',
    ages: 'Ages 14–18',
    description:
      'A youth-led group that plans and runs its own community service projects each ' +
      'quarter, with a small budget and full say in how it gets used.',
  },
]

export const bpAbout = {
  storyKicker: 'Our Story',
  storyTitle: "Started at a kitchen table, not a boardroom.",
  storyBody:
    'BrightPath began as informal after-school tutoring, run by a handful of neighbors ' +
    "out of a community center basement. As demand grew, so did the programs — but the " +
    'goal never changed: make sure a young person\'s options aren\'t limited by what ' +
    "their family can afford or who they happen to know.",
  missionTitle: 'Our Mission',
  missionBody:
    'To give every young person in our community free, consistent access to mentorship, ' +
    'academic support, and enrichment — delivered with respect, not charity.',
  values: [
    {
      title: 'Accessibility',
      description: 'Every program is free. Transportation and meal support are available for families who need it.',
    },
    {
      title: 'Belonging',
      description: 'Programs are designed by and with the community they serve, not handed down to it.',
    },
    {
      title: 'Consistency',
      description: 'Showing up matters more than any single event — our programs run year-round, every week.',
    },
  ],
}

export const bpGetInvolved = {
  kicker: 'Get Involved',
  title: 'There are a few ways to show up for BrightPath.',
  ways: [
    {
      title: 'Volunteer',
      description:
        'Become a tutor, a mentor, or help run a single event — most roles need just a ' +
        'few hours a month and a background check.',
      cta: 'See volunteer roles',
    },
    {
      title: 'Donate',
      description:
        'General donations fund tutoring supplies, camp scholarships, and transportation. ' +
        'A wishlist of specific in-kind needs is updated monthly.',
      cta: 'Support a program',
    },
    {
      title: 'Partner',
      description:
        'Schools, local businesses, and other nonprofits partner with us on space, ' +
        'referrals, and shared programming.',
      cta: 'Start a partnership',
    },
  ],
}

export const bpContactInfo = {
  kicker: 'Contact',
  title: "We're happy to answer questions before you commit to anything.",
  email: 'hello@brightpathyouth.org',
  phone: '(517) 555-0119',
  address: '214 Elm Street, Lansing, MI',
  hours: 'Mon–Fri, 9am–6pm',
}
