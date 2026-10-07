import PageHeader from '../components/layout/PageHeader'
import MotionZeroHero from '../components/products/MotionZeroHero'
import MotionZeroFeatures from '../components/products/MotionZeroFeatures'
import GloveZeroHero from '../components/products/GloveZeroHero'
import VisionZeroHero from '../components/products/VisionZeroHero'
import useSectionSnap from '../hooks/useSectionSnap'
import usePanelLeaveFlag from '../hooks/usePanelLeaveFlag'
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

/* Stable empty reference for routes without panels (keeps the effect from
   re-running every render). */
const EMPTY_IDS = []

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

  // Motion-0 drives its own full-screen section snap; other product pages
  // never expose these ids, so the hook is a no-op there.
  // Vision-0 (Hero → Specification) and Glove-0 (Hero → Capabilities) each
  // snap their own two full-viewport panels, reusing the same lightweight
  // hook — no extra scroll system, and no effect on any other route.
  useSectionSnap({ duration: 1000, ids: MOTION_ZERO_IDS, topOffset: 64 })
  useSectionSnap({ duration: 1000, ids: VISION_ZERO_IDS, topOffset: 64 })
  useSectionSnap({ duration: 1000, ids: GLOVE_ZERO_IDS, topOffset: 64 })

  // Visual half of the hand-off (restrained fade/rise on panel content).
  // Scoped to these two routes; a no-op everywhere else.
  const panelIds = isVisionZero ? VISION_ZERO_IDS : isGloveZero ? GLOVE_ZERO_IDS : null
  usePanelLeaveFlag(panelIds || EMPTY_IDS)

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
