import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import CtaLink from '../ui/CtaLink'
import FeaturedProductCard from '../products/FeaturedProductCard'
import ProductTrapezoidGrid from '../products/ProductTrapezoidGrid'
import { featuredProducts, trapezoidProducts } from '../../data/products'

/* ── Home "Our Products" ──────────────────────────────────────────
   Overview module only: one full-width featured banner (Motion-0) plus
   the trapezoid pair (Glove-0 / Vision-0), then one CTA into the
   dedicated Products page. Names only for now — no specs (§18).
   Layout: featured banner on top, trapezoid pair below, stacked on
   mobile as banner → Glove-0 → Vision-0 (§20). */

export default function ProductsSection() {
  return (
    <section className="relative py-[85px] md:py-[107px]">
      <SectionHeading label="Products" title="Our Products" description="Product line overview goes here." />

      <div className="relative z-10 mx-auto mt-16 w-full max-w-7xl px-6 md:mt-20 lg:px-10">
        <div className="space-y-6 md:space-y-8">
          {featuredProducts.map((product) => (
            <Reveal key={product.id}>
              <FeaturedProductCard product={product} />
            </Reveal>
          ))}

          <Reveal delay={1}>
            <ProductTrapezoidGrid products={trapezoidProducts} />
          </Reveal>
        </div>

        <Reveal delay={2} className="mt-12 md:mt-16">
          <CtaLink to="/products">Explore Products</CtaLink>
        </Reveal>
      </div>
    </section>
  )
}
