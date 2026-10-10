import OptimizedImage from '../ui/OptimizedImage'
/* ── Motion-0 promo banner ────────────────────────────────────────
   Pure full-bleed image strip, placed directly under the feature
   module. No title, no copy, no buttons, no container chrome — the
   photograph IS the module.

   Sizing: natural aspect (2.2:1) at full viewport width on desktop /
   tablet, so nothing is cropped and nothing is letterboxed. On small
   screens that ratio would collapse to a thin sliver, so the image
   gets a viewport-based height with object-cover focused on the
   centre panel (which carries the Motion-0 mark). */
export default function MotionZeroPromo() {
  return (
    <section id="m0-promo" className="bg-white" aria-label="Weave in the real world">
      <OptimizedImage
        src="images/motion-0/promo-full.jpg"
        alt="Weave worn while cooking in a real kitchen"
        loading="lazy"
        className="block h-screen w-full select-none object-cover object-center"
      />
    </section>
  )
}
