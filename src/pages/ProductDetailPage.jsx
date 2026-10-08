import PageHeader from '../components/layout/PageHeader'
import MotionZeroHero from '../components/products/MotionZeroHero'
import MotionZeroFeatures from '../components/products/MotionZeroFeatures'
import MotionZeroPerformanceTest from '../components/sections/MotionZeroPerformanceTest'
import MotionZeroSpecs from '../components/sections/MotionZeroSpecs'
import GloveZeroHero from '../components/products/GloveZeroHero'
import VisionZeroHero from '../components/products/VisionZeroHero'
import useSectionSnap from '../hooks/useSectionSnap'
import { findProduct } from '../data/products'

/* Motion-0's full-screen snap sequence — every module is one screen.
   Uses the mature index-driven pager (same as Vision-0 / Glove-0): symmetric
   up/down logic, one instant jump per gesture, CSS does the visual transition.
   Stable reference so the effect does not re-run. topOffset 0 — each section
   already carries its own top padding to clear the 64px fixed nav. */
const MOTION_ZERO_IDS = ['m0-hero', 'm0-features', 'm0-performance', 'm0-specs']

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

  // Site-wide full-page section pager == the EXACT hook Home uses
  // (useSectionSnap): one rAF-eased scroll over 1000ms, wheel swallowed while
  // animating, symmetric up/down. Each call auto-no-ops unless its section ids
  // exist on the current page (the hook filters out missing elements and
  // returns early when <2 match), so calling all three is safe and keeps ONE
  // scroll mechanism for the whole site. duration 1000 + topOffset 0 match
  // Home exactly.
  useSectionSnap({ duration: 1000, ids: MOTION_ZERO_IDS, topOffset: 0 })
  useSectionSnap({ duration: 1000, ids: VISION_ZERO_IDS, topOffset: 0 })
  useSectionSnap({ duration: 1000, ids: GLOVE_ZERO_IDS, topOffset: 0 })

  return (
    <>
      {isMotionZero ? (
        <>
          <MotionZeroHero />
          <MotionZeroFeatures />
          <MotionZeroPerformanceTest />
          <MotionZeroSpecs />
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
