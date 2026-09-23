/**
 * Site-wide meta + navigation — the single source of truth for nav
 * structure. All copy below is PLACEHOLDER for the framework first
 * pass; real company copy replaces it only after Kiki approves.
 */

export const site = {
  nameEn: 'Renyi Intelligence',
  nameZh: '人一智能',
  logo: 'images/logo/logo.png', // relative, no leading slash — portable under base './'
  // ⚠️ Placeholder tagline, NOT final brand copy — pending approval.
  tagline: 'Building Intelligence for Human Motion',
}

/* ── Navbar ─────────────────────────────────────────────────────────
   English-only nav. `人一智能` appears only as the brand wordmark next
   to the logo (allowed: brand name). Children render as dropdowns. */

export const nav = [
  { label: 'Home', href: '#home' },
  {
    label: 'Products',
    href: '#products',
    children: [
      { label: 'Motion-0 (11-IMU)', href: '#products' },
      { label: 'Glove-0', href: '#products' },
      { label: 'Vision-0', href: '#products' },
      { label: 'Dataset', href: '#products' },
      { label: 'Applications', href: '#products' },
    ],
  },
  { label: 'Research', href: '#research' },
  { label: 'News', href: '#news' },
  {
    label: 'Solutions',
    href: '#solutions',
    children: [
      { label: 'SOP', href: '#solutions' },
      { label: 'Laplace', href: '#solutions' },
      { label: 'Xiamen Luyan Pharmaceutical', href: '#solutions' },
      { label: 'Yamaha', href: '#solutions' },
    ],
  },
  { label: 'Contact', href: '#contact' },
]

/* Footer keeps a plain list of the same anchors (no dropdowns). */
export const footerNav = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'Research', href: '#research' },
  { label: 'News', href: '#news' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Contact', href: '#contact' },
]
