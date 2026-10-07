import PageHeader from '../components/layout/PageHeader'
import MotionZeroHero from '../components/products/MotionZeroHero'
import MotionZeroFeatures from '../components/products/MotionZeroFeatures'
import GloveZeroHero from '../components/products/GloveZeroHero'
import VisionZeroHero from '../components/products/VisionZeroHero'
import useSectionSnap from '../hooks/useSectionSnap'
import useFullPageSections from '../hooks/useFullPageSections'
import { findProduct } from '../data/products'

/* Motion-0's own full-screen snap sequence — Hero → Features.
   Stable reference so the snap effect does not re-run. */
const MOTION_ZERO_IDS = ['m0-hero', 'm0-features']

/* Vision-0's full-screen sequence — Hero → Specification panel.
   Stable reference so the snap effect does not re-run. */
const VISION_ZERO_IDS = ['v0-hero', 'v0-spec']

/* Glove-0's full-screen sequence — Hero → Capabilities → Hardware specs
   → Accuracy & evaluation. Stable reference so the snap effect does not
   re-run. */
const GLOVE_ZERO_IDS = ['g0-hero', 'g0-features', 'g0-specs', 'g0-accuracy']

/* Product detail — the framework every /products/<slug> route uses.
   Motion-0 replaces the default PageHeader with its own hero; every
   other product keeps the shared header. Content below is still
   placeholder: no specs or parameters invented. */
export default function ProductDetailPage({ id }) {
  const product = findProduct(id)

  if (!product) {
    return (
      <PageHeader label="Hardware" title="Product not found" description="This product page does not exist yet." />
    )
  }

  const isMotionZero = product.id === 'motion-0'
  const isGloveZero = product.id === 'glove-0'
  const isVisionZero = product.id === 'vision-0'

  // Motion-0 keeps the original hook untouched.
  useSectionSnap({ duration: 1000, ids: MOTION_ZERO_IDS, topOffset: 64 })

  // Vision-0 and Glove-0 use the rewritten index-driven pager: identical
  // logic in both directions, one instant jump per gesture, CSS does the
  // visual transition. Enabled per-route, so every other page (Home,
  // Research, Application, …) keeps normal scrolling.
  useFullPageSections(VISION_ZERO_IDS, { topOffset: 64, enabled: isVisionZero })
  useFullPageSections(GLOVE_ZERO_IDS, { topOffset: 64, enabled: isGloveZero })

  return (
    <>
      {isMotionZero ? (
        <>
          <MotionZeroHero />
          <MotionZeroFeatures />
        </>
      ) : isGloveZero ? (
        <GloveZeroHero product={product} />
      ) : isVisionZero ? (
        <VisionZeroHero product={product} />
      ) : (
        <PageHeader label="Hardware" title={product.name} description={product.description} />
      )}
    </>
  )
}
