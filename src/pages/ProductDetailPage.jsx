import PageHeader from '../components/layout/PageHeader'
import Reveal from '../components/ui/Reveal'
import MediaPlaceholder from '../components/ui/MediaPlaceholder'
import CtaLink from '../components/ui/CtaLink'
import MotionZeroHero from '../components/products/MotionZeroHero'
import MotionZeroFeatures from '../components/products/MotionZeroFeatures'
import MotionZeroPromo from '../components/products/MotionZeroPromo'
import { findProduct } from '../data/products'

/* Product detail — the framework every /products/<slug> route uses.
   Motion-0 replaces the default PageHeader with its own black launch
   hero; every other product keeps the shared header. Content below is
   still placeholder: no specs or parameters invented. */
export default function ProductDetailPage({ id }) {
  const product = findProduct(id)

  if (!product) {
    return (
      <PageHeader label="Products" title="Product not found" description="This product page does not exist yet." />
    )
  }

  const isMotionZero = product.id === 'motion-0'

  return (
    <>
      {isMotionZero ? (
        <>
          <MotionZeroHero />
          <MotionZeroFeatures />
          <MotionZeroPromo />
        </>
      ) : (
        <PageHeader label="Products" title={product.name} description={product.description} />
      )}

      <section className="py-[85px] md:py-[107px]">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <Reveal>
            <MediaPlaceholder label={`${product.name.toUpperCase()} — IMAGE / VIDEO`} />
          </Reveal>

          <Reveal delay={1} className="mt-12 md:mt-16">
            <p className="max-w-2xl text-base leading-relaxed text-ink/70">Product details go here.</p>
          </Reveal>

          <Reveal delay={2} className="mt-12 flex flex-wrap items-center gap-4 md:mt-16">
            <CtaLink to="/contact" variant="secondary">
              Contact Us
            </CtaLink>
            <CtaLink to="/products" variant="text">
              Back to Products
            </CtaLink>
          </Reveal>
        </div>
      </section>
    </>
  )
}
