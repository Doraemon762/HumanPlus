import Reveal from '../ui/Reveal'
import CtaLink from '../ui/CtaLink'
import FeaturedProductCard from '../products/FeaturedProductCard'
import ProductTrapezoidGrid from '../products/ProductTrapezoidGrid'
import { featuredProducts, trapezoidProducts } from '../../data/products'

/* ── Home "Our Products" ──────────────────────────────────────────
   Original module layout kept: one full-width featured banner
   (Motion-0) plus the trapezoid pair (Glove-0 / Vision-0), then a
   CTA into the dedicated Products page.

   The heading block ("Products" / "Our Products" / "Product line
   overview goes here.") stays dropped. Each plate now carries a real
   product image — Glove-0 / Vision-0 are keyed-out (transparent PNG)
   and sit on the right, with the product name enlarged on the left
   in brand blue.

   Compact vertical rhythm so the whole module fits one viewport:
   reduced section padding, tighter plate gap and a flatter banner
   aspect. Full-screen section preserved for the About ⇄ Products
   snap hand-off (useSectionSnap). */

const SHOWCASE = {
  'motion-0': {
    images: [
      'images/products/motion-0-1.jpg',
      'images/products/motion-0-2.jpg',
      'images/products/motion-0-3.jpg',
    ],
    tag: 'Full-Body Motion Capture',
  },
  'glove-0': { image: 'images/products/glove-0-showcase.png', tag: 'Hand Motion Capture' },
  'vision-0': { image: 'images/products/vision-0-showcase.png', tag: 'Egocentric Video Capture' },
}
const withImage = (p) => ({ ...p, ...(SHOWCASE[p.id] || {}) })

export default function ProductsSection() {
  return (
    <section
      id="products"
      className="relative min-h-screen bg-white py-[48px] md:flex md:items-center md:py-[56px]"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="space-y-5 md:space-y-6">
          {featuredProducts.map((product) => (
            <Reveal key={product.id}>
              <FeaturedProductCard product={withImage(product)} />
            </Reveal>
          ))}

          <Reveal delay={1}>
            <ProductTrapezoidGrid products={trapezoidProducts.map(withImage)} />
          </Reveal>
        </div>

        <Reveal delay={2} className="mt-8 flex justify-center md:mt-10">
          <CtaLink to="/products">Explore Products</CtaLink>
        </Reveal>
      </div>
    </section>
  )
}
