/**
 * Site-wide meta + navigation — single source of truth for brand copy
 * and route structure. All descriptive copy is PLACEHOLDER pending
 * Kiki's approval; product / news / case content lives in its own file.
 */

export const site = {
  nameEn: 'HumanPlus',
  nameZh: '人一智能',
  logo: 'images/logo/logo.png', // relative, no leading slash — portable under base './'
  // ⚠️ Placeholder tagline, NOT final brand copy — pending approval.
  tagline: 'Building Intelligence for Human Motion',
}

/* ── Navbar ─────────────────────────────────────────────────────────
   Every top-level item is its own ROUTE, not an anchor on the home
   page. `href` is the route path; Nav/Footer prefix it with '#' via
   toHref(). `人一智能` appears only as the brand wordmark (allowed). */
export const nav = [
  { label: 'Home', href: '/' },
  {
    label: 'Hardware',
    href: '/hardware',
    children: [
      { label: 'Motion-0', href: '/hardware/motion-0' },
      { label: 'Motion-Strap', href: '/hardware/motion-strap' },
      { label: 'Glove-0', href: '/hardware/glove-0' },
      { label: 'Vision-0', href: '/hardware/vision-0' },
      { label: 'Application', href: '/application' },
    ],
  },
  {
    // Data + Dataset both point at the same external HumanPlus1000 site.
    // Application was moved under Hardware (kept its /application route).
    label: 'Data',
    href: 'https://humanplus-ai.github.io/HumanPlus1000.github.io/',
    external: 'https://humanplus-ai.github.io/HumanPlus1000.github.io/',
    children: [
      { label: 'Dataset', href: 'https://humanplus-ai.github.io/HumanPlus1000.github.io/', external: 'https://humanplus-ai.github.io/HumanPlus1000.github.io/' },
    ],
  },
  { label: 'Research', href: '/research' },
  {
    label: 'Solutions',
    href: '/solutions',
  },
  { label: 'Contact', href: '/contact' },
]
