/**
 * Site-wide meta + navigation — single source of truth for brand copy
 * and route structure. All descriptive copy is PLACEHOLDER pending
 * Kiki's approval; product / news / case content lives in its own file.
 */

export const site = {
  nameEn: 'HumanPlus',
  nameZh: 'HumanPlus',
  logo: 'images/logo/logo-large.png', // relative, no leading slash — portable under base './'
  // ⚠️ Placeholder tagline, NOT final brand copy — pending approval.
  tagline: 'Building Intelligence for Human Motion',
}

/* ── Navbar ─────────────────────────────────────────────────────────
   Every top-level item is its own ROUTE, not an anchor on the home
   page. `href` is the route path; Nav/Footer prefix it with '#' via
   toHref(). The brand is the HumanPlus wordmark logo (site.logo). */
export const nav = [
  { label: 'Home', href: '/' },
  {
    label: 'Hardware',
    href: '/hardware',
    children: [
      { label: 'Weave', href: '/hardware/motion-0' },
      { label: 'Pulse', href: '/hardware/motion-strap' },
      { label: 'Application', href: '/application' },
    ],
  },
  {
    label: 'Dataset',
    href: '/dataset',
    children: [
      { label: 'HumanPlus1000', href: '/dataset' },
    ],
  },
  { label: 'About', href: '/research' },
  { label: 'Contact', href: '/contact' },
  { label: 'Careers', href: '/contact/joinus' },
]
