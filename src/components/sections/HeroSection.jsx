import Reveal from '../ui/Reveal'
import MediaPlaceholder from '../ui/MediaPlaceholder'
import { site } from '../../data/site'

/* ── Hero ───────────────────────────────────────────────────────────
   White / light first screen. Copy sits left; the right column is a
   reserved visual area for future footage (human motion / motion
   capture / robotics). No scrim, no text-shadow — light theme drops
   both (design system §15.3).

   ⚠️ The tagline is a placeholder, NOT final brand copy. */

const PRIMARY_CTA =
  'inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#0140CC] focus-visible:ring-1 focus-visible:ring-brandLine'
const SECONDARY_CTA =
  'inline-flex shrink-0 items-center gap-2 rounded-full border border-black/15 px-6 py-2.5 text-sm font-semibold text-ink transition-colors duration-300 hover:border-brandLine hover:text-brand focus-visible:ring-1 focus-visible:ring-brandLine'

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden pt-16">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-16 md:pt-24 lg:px-10 lg:pb-24 lg:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Copy */}
          <div>
            <Reveal className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-xs font-mono uppercase tracking-[0.3em] text-mute">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
              Embodied AI · Motion Capture
            </Reveal>

            <Reveal
              as="h1"
              delay={1}
              className="mt-8 font-black leading-[1.2] tracking-tight text-[clamp(2rem,5.2vw,4.25rem)] text-ink"
            >
              RENYI
              <br />
              INTELLIGENCE
            </Reveal>

            <Reveal delay={2} className="mt-6">
              <p className="max-w-xl text-base leading-relaxed text-ink/70 md:text-lg">
                {site.tagline}
              </p>
            </Reveal>

            <Reveal delay={3} className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#products" className={PRIMARY_CTA}>
                Explore Products
              </a>
              <a href="#contact" className={SECONDARY_CTA}>
                Contact Us
              </a>
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
