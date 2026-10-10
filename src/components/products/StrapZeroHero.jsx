import OptimizedImage from '../ui/OptimizedImage'
import Reveal from '../ui/Reveal'

/* Pulse strap product photo — studio shot on its own light backdrop,
   relative path so GitHub Pages sub-path deploys resolve. */
const HERO_IMAGE = 'images/products/pulse-strap.jpg'

/* ── Pulse hero ──────────────────────────────────────────────────────
   First screen of /hardware/motion-strap. Mirrors MotionZeroHero's
   layout logic — 45% product information left, 55% product visual
   right, min-h first screen, both columns vertically centered — on a
   light surface (bg-paper2) so the strap's studio backdrop blends in
   without a card container. No CTA, no extra copy: only the text the
   shared PageHeader used to show (kicker / name / description). */
export default function StrapZeroHero({ product }) {
  return (
    <section
      id="s0-hero"
      className="relative isolate overflow-hidden border-b border-black/5 bg-paper2 pt-16 font-sans"
    >
      <div className="relative z-[1] mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-12 px-6 pb-16 pt-10 md:pb-24 lg:grid-cols-[45fr_55fr] lg:gap-8 lg:px-10">
        {/* ── Left: kicker → product name → intro copy ── */}
        <div className="relative z-[1] -translate-y-4 lg:-translate-y-6">
          <Reveal className="text-xs font-mono uppercase tracking-[0.3em] text-mute">
            Hardware
          </Reveal>

          <Reveal
            as="h1"
            delay={1}
            className="mt-4 font-bold leading-[1.05] tracking-tight text-ink text-[clamp(2.5rem,5vw,4.25rem)]"
          >
            {product.name}
          </Reveal>

          <Reveal delay={2} className="mt-7 space-y-1">
            {product.description.split('\n').map((line, i) => (
              <p
                key={i}
                className="text-sm leading-[1.9] text-ink/60 md:whitespace-nowrap md:text-[0.95rem]"
              >
                {line}
              </p>
            ))}
          </Reveal>
        </div>

        {/* ── Right: the strap itself — large, uncropped, no card ── */}
        <div className="relative z-[1] flex items-center justify-center lg:justify-end">
          <Reveal delay={2} className="relative w-full max-w-[440px] lg:max-w-[540px]">
            <OptimizedImage
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 1023px) 100vw, 55vw"
              src={HERO_IMAGE}
              alt={`${product.name} 穿戴式动捕绑带`}
              className="h-auto w-full select-none object-contain"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
