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
    label: 'Products',
    href: '/products',
    children: [
      { label: 'Motion-0 (11-IMU)', href: '/products/motion-0' },
      { label: 'Glove-0', href: '/products/glove-0' },
      { label: 'Vision-0', href: '/products/vision-0' },
      { label: 'Dataset', href: '/products/dataset' },
      { label: 'Applications', href: '/products/applications' },
    ],
  },
  { label: 'Robot', href: '/robot' },
  { label: 'Research', href: '/research' },
  { label: 'News', href: '/news' },
  {
    label: 'Solutions',
    href: '/solutions',
    children: [
      { label: 'SOP', href: '/solutions/sop' },
      { label: 'Laplace', href: '/solutions/laplace' },
      { label: 'Xiamen Luyan Pharmaceutical', href: '/solutions/luyan' },
      { label: 'Yamaha', href: '/solutions/yamaha' },
    ],
  },
  { label: 'Contact', href: '/contact' },
]
