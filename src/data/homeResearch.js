import { research } from './research'
import publications from './publications.json'

const images = [
  ['FIP:', 'images/research/clothing-20261012/fip.jpeg'],
  ['SuDA:', 'media/research-20261013/suda-2024-updated.webp'],
  ['Self-Adaptive Motion', 'media/research-20261013/self-adaptive-2023.webp'],
  ['DisPad:', 'media/research-20261013/dispad-local-new.webp'],
  ['Computational Design of Wiring', 'media/research-20261013/wiring-right-color-fixed.webp'],
]
const conferenceLogos = [
  ['FIP:', 'chi-2025.png'],
  ['SuDA:', 'icml-2024.png'],
  ['Self-Adaptive Motion', 'neurips-2023.png'],
  ['DisPad:', 'ubicomp-iswc-2023.png'],
  ['Computational Design of Wiring', 'siggraph-asia-2023.png'],
]

// Home shows only the eight illustrated publications; About keeps its full list.
export const homeResearch = [
  ...research,
  ...publications.filter(paper => !research.some(featured => featured.title === paper.title))
    .map((paper, index) => ({
      id: `publication-${index}`,
      title: paper.title,
      venue: paper.venue,
      year: paper.year,
      description: '',
      image: images.find(([prefix]) => paper.title.startsWith(prefix))?.[1],
      logo: (() => { const logo = conferenceLogos.find(([prefix]) => paper.title.startsWith(prefix))?.[1]; return logo ? `images/logo/${logo}` : undefined })(),
      links: [{ label: 'Paper', href: paper.href }],
    })),
].filter(paper => paper.image).slice(0, 8)
