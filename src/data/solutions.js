/**
 * Solutions / case studies — client names per approved nav wording
 * (「子莹」 intentionally excluded). Each entry is its own ROUTE under
 * /solutions. All descriptions are placeholders; no fabricated content.
 */

export const solutions = [
  {
    id: 'sop',
    name: 'SOP',
    category: 'Solution',
    href: '/solutions/sop',
    description: 'Case study description goes here.',
    image: null,
  },
  {
    id: 'laplace',
    name: 'Laplace',
    category: 'Solution',
    href: '/solutions/laplace',
    description: 'Case study description goes here.',
    image: null,
  },
  {
    id: 'luyan',
    name: 'Xiamen Luyan Pharmaceutical',
    category: 'Solution',
    href: '/solutions/luyan',
    description: 'Case study description goes here.',
    image: null,
  },
  {
    id: 'yamaha',
    name: 'Yamaha',
    category: 'Solution',
    href: '/solutions/yamaha',
    description: 'Case study description goes here.',
    image: null,
  },
]

export function findSolution(id) {
  return solutions.find((s) => s.id === id)
}
