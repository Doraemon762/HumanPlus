/**
 * Products — framework placeholders only. No specs, no fabricated
 * parameters. Product names follow the approved nav wording; note
 * Motion-0's IMU count is rendered "11-IMU" (per spec, not "11IMU").
 *
 * `layout` drives the home page's "Our Products" module:
 *   featured  → top full-width banner   (Motion-0)
 *   trapezoid → bottom trapezoid pair   (Glove-0 / Vision-0)
 *   standard  → products page only      (Dataset / Applications)
 * Adding a product with no `layout` defaults to standard, so the home
 * module never breaks.
 */

export const products = [
  {
    id: 'motion-0',
    name: 'Motion-0',
    subtitle: '11-IMU',
    layout: 'featured',
    href: '/products/motion-0',
    // Placeholder copy — real descriptions come later.
    description: 'Product description goes here.',
    image: null, // future asset; #252525 plate renders until then
  },
  {
    id: 'glove-0',
    name: 'Glove-0',
    subtitle: null,
    layout: 'trapezoid',
    href: '/products/glove-0',
    description: 'Product description goes here.',
    image: null,
  },
  {
    id: 'vision-0',
    name: 'Vision-0',
    subtitle: null,
    layout: 'trapezoid',
    href: '/products/vision-0',
    description: 'Product description goes here.',
    image: null,
  },
  {
    id: 'dataset',
    name: 'Dataset',
    subtitle: null,
    layout: 'standard',
    href: '/products/dataset',
    description: 'Product description goes here.',
    image: null,
  },
  {
    id: 'applications',
    name: 'Applications',
    subtitle: null,
    layout: 'standard',
    href: '/products/applications',
    description: 'Product description goes here.',
    image: null,
  },
]

/* Products shown in the home "Our Products" module, in layout order:
   1 featured banner first, then the trapezoid pair. */
export const featuredProducts = products.filter((p) => p.layout === 'featured')
export const trapezoidProducts = products.filter((p) => p.layout === 'trapezoid')

export function findProduct(id) {
  return products.find((p) => p.id === id)
}
