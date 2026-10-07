/**
 * Products — framework placeholders only. No specs, no fabricated
 * parameters. Product names follow the approved nav wording; note
 * Motion-0's IMU count is rendered "11-IMU" (per spec, not "11IMU").
 *
 * Hardware product line (formerly "Products"):
 *   motion-0      → 11-IMU full-body suit (featured on home)
 *   motion-strap  → 18-IMU strap (placeholder — no specs/assets invented)
 *   glove-0       → hand capture (trapezoid on home)
 *   vision-0      → egocentric video (trapezoid on home)
 *
 * `layout` drives the home page's "Our Products" module:
 *   featured  → top full-width banner   (Motion-0)
 *   trapezoid → bottom trapezoid pair   (Glove-0 / Vision-0)
 *   (no layout) → products page only    (Motion-Strap)
 * Adding a product with no `layout` defaults to standard, so the home
 * module never breaks.
 */

export const products = [
  {
    id: 'motion-0',
    name: 'Motion-0',
    subtitle: '11-IMU',
    layout: 'featured',
    href: '/hardware/motion-0',
    // Placeholder copy — real descriptions come later.
    description: 'Product description goes here.',
    image: null, // future asset; #252525 plate renders until then
  },
  {
    id: 'glove-0',
    name: 'Glove-0',
    subtitle: null,
    layout: 'trapezoid',
    href: '/hardware/glove-0',
    description:
      'A wearable sensing glove for capturing precise human hand movements and interaction data, empowering dexterous robot learning.',
    image: 'images/products/glove-0-showcase.png',
  },
  {
    id: 'vision-0',
    name: 'Vision-0',
    subtitle: null,
    layout: 'trapezoid',
    href: '/hardware/vision-0',
    description:
      'A wearable stereo vision system with dual cameras for capturing first-person visual data, enabling multimodal data collection for embodied AI.',
    image: 'images/products/vision-0-v3.png',
  },
  {
    id: 'motion-strap',
    name: 'Strap-0',
    subtitle: '18-IMU',
    layout: null, // placeholder product — no specs / images invented yet
    href: '/hardware/motion-strap',
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
