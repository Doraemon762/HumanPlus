import Reveal from '../ui/Reveal'
import MediaPlaceholder from '../ui/MediaPlaceholder'
import CtaLink from '../ui/CtaLink'
import { site } from '../../data/site'

/* ── Hero ─────────────────────────────────────────────────────────
   White / light first screen. Copy left, reserved visual area right
   for future footage (human motion / motion capture / robotics).
   No scrim, no text-shadow — light theme drops both (§15.3).

   ⚠️ The tagline is a placeholder, NOT final brand copy. */

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-16 md:pt-24 lg:px-10 lg:pb-24 lg:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Reveal className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-xs font-mono uppercase tracking-[0.3em] text-mute">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
              Embodied AI · Motion Capture
            </Reveal>

            <Reveal as="h1" delay={1} className="mt-8 font-black leading-[1.2] tracking-tight text-[clamp(2rem,5.2vw,4.25rem)] text-ink">
              {site.nameEn.toUpperCase()}
            </Reveal>

            <Reveal delay={2} className="mt-6">
              <p className="max-w-xl text-base leading-relaxed text-ink/70 md:text-lg">{site.tagline}</p>
            </Reveal>

            <Reveal delay={3} className="mt-10 flex flex-wrap items-center gap-4">
              <CtaLink to="/products">Explore Products</CtaLink>
              <CtaLink to="/contact" variant="secondary">
                Contact Us
              </CtaLink>
            </Reveal>
          </div>

          {/* Reserved visual area — motion capture / robotics footage later */}
          <Reveal delay={2}>
            <MediaPlaceholder label="HERO VISUAL — MOTION / ROBOTICS" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
