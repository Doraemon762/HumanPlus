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
      { label: 'Motion-0', href: '/hardware/motion-0' },
      { label: 'Strap-0', href: '/hardware/motion-strap' },
      { label: 'Application', href: '/application' },
    ],
  },
  {
    // Dataset (top) + HumanPlus1000 (child) both point at the same
    // external HumanPlus1000 site. Application moved under Hardware.
    label: 'Dataset',
    href: 'https://humanplus-ai.github.io/HumanPlus1000.github.io/',
    external: 'https://humanplus-ai.github.io/HumanPlus1000.github.io/',
    children: [
      { label: 'HumanPlus1000', href: 'https://humanplus-ai.github.io/HumanPlus1000.github.io/', external: 'https://humanplus-ai.github.io/HumanPlus1000.github.io/' },
    ],
  },
  { label: 'Research', href: '/research' },
  {
    /* Contact stays top-level and is a REAL LINK (click → /contact);
       hover opens a flyout with a single child page "Join Us"
       (→ /contact/joinus). No self-link child is needed because the
       trigger itself already navigates to the Contact page. */
    label: 'Contact',
    href: '/contact',
    children: [
      { label: 'Join Us', href: '/contact/joinus' },
    ],
  },
]
