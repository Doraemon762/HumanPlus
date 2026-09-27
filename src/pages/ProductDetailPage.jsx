import PageHeader from '../components/layout/PageHeader'
import MotionZeroHero from '../components/products/MotionZeroHero'
import MotionZeroFeatures from '../components/products/MotionZeroFeatures'
import useSectionSnap from '../hooks/useSectionSnap'
import { findProduct } from '../data/products'

/* Motion-0's own full-screen snap sequence — Hero → Features.
   Stable reference so the snap effect does not re-run. */
const MOTION_ZERO_IDS = ['m0-hero', 'm0-features']

/* Product detail — the framework every /products/<slug> route uses.
   Motion-0 replaces the default PageHeader with its own hero; every
   other product keeps the shared header. Content below is still
   placeholder: no specs or parameters invented. */
export default function ProductDetailPage({ id }) {
  const product = findProduct(id)

  if (!product) {
    return (
      <PageHeader label="Products" title="Product not found" description="This product page does not exist yet." />
    )
  }

  const isMotionZero = product.id === 'motion-0'

  // Motion-0 drives its own full-screen section snap; other product pages
  // never expose these ids, so the hook is a no-op there.
  useSectionSnap({ duration: 1000, ids: MOTION_ZERO_IDS, topOffset: 64 })

  return (
    <>
      {isMotionZero ? (
        <>
          <MotionZeroHero />
          <MotionZeroFeatures />
        </>
      ) : (
        <PageHeader label="Products" title={product.name} description={product.description} />
      )}
    </>
  )
}
