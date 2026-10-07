/**
 * Research — real publications. Shared by the home ResearchSection
 * (first three) and the /research route (ArticleRow).
 *
 * Fields:
 *   ordinal, venue  → consumed by ArticleRow (News/Research route page)
 *   tag             → home glass-card kicker (venue phrased as a tag)
 *   title, description, image → both surfaces
 *   href            → kept as an in-app anchor ('#research') so the
 *                     shared ArticleRow's toHref() stays safe; the home
 *                     glass cards render the real external links from
 *                     `links` directly (no toHref rewriting).
 *   links           → [{ label, href }] real external URLs, home only
 *   highlight       → optional award badge (e.g. Best Paper), home only
 */

export const research = [
  {
    id: 'clotho',
    ordinal: '01',
    venue: 'SIGGRAPH Asia 2026',
    tag: 'SIGGRAPH Asia 2026',
    title:
      'CLOTHO: Canonicalizing IMUs from Loose Inertial Garments for Accurate Human Motion Tracking',
    description:
      'We introduce CLOTHO, an IMU canonicalization framework for garment-based inertial motion capture, achieving state-of-the-art accuracy, zero-shot generalization to unseen garments, and robust long-term tracking.',
    image: 'images/research/research-clotho.png',
    href: '#research',
    links: [{ label: 'Project', href: 'https://clotho-mocap.github.io/' }],
    highlight: null,
    logo: 'images/logo/19.PNG',
    logoH: 38,
  },
  {
    id: 'tic',
    ordinal: '02',
    venue: 'SIGGRAPH 2025',
    tag: 'SIGGRAPH 2025',
    title:
      'Transformer IMU Calibrator: Dynamic On-body IMU Calibration for Inertial Motion Capture',
    description:
      'We propose a novel dynamic calibration method for sparse inertial motion capture systems, which is the first to break the restrictive absolute static assumption in IMU calibration, the first to achieve implicit IMU calibration, as well as the first to enable long-term and accurate motion capture using sparse IMUs.',
    image: 'images/research/research-tic.jpg',
    href: '#research',
    links: [
      { label: 'Project', href: 'https://www.humanplus.xyz/siggraph-2025-zcx' },
      { label: 'Paper', href: 'https://arxiv.org/pdf/2506.10580v1' },
      { label: 'GitHub', href: 'https://github.com/ZuoCX1996/TIC' },
    ],
    highlight: 'Best Paper Award at SIGGRAPH 2025',
    logo: 'images/logo/20.PNG',
    logoH: 41,
  },
  {
    id: 'lip',
    ordinal: '03',
    venue: 'CVPR 2024',
    tag: 'CVPR 2024',
    title: 'Loose Inertial Poser: Motion Capture with IMU-attached Loose-Wear Jacket',
    description:
      'We introduce Loose Inertial Poser, a novel motion capture solution with high wearing comfortableness, by integrating four Inertial Measurement Units (IMUs) into a loose-wear jacket.',
    image: 'images/research/research-lip.jpg',
    href: '#research',
    links: [
      { label: 'Project', href: 'https://www.humanplus.xyz/cvpr2024-zcx' },
      { label: 'Paper', href: 'https://ieeexplore.ieee.org/document/10657915' },
      { label: 'GitHub', href: 'https://github.com/ZuoCX1996/Loose-Inertial-Poser' },
    ],
    highlight: null,
    logo: 'images/logo/21.PNG',
    logoH: 44,
  },
]
