import Reveal from '../ui/Reveal'
import CtaLink from '../ui/CtaLink'
import MotionDataField from './MotionDataField'

/* Motion-0 hero image — keyed transparent PNG (studio backdrop removed),
   relative path so GitHub Pages sub-path deploys resolve. */
const HERO_IMAGE = 'images/products/motion-0.png'

/* ── Motion-0 hero ────────────────────────────────────────────────
   Full-bleed black launch banner: 45% product information left, 55%
   product visual right. No white cards, no bordered containers — the
   garment floats in the black space on a low-alpha blue ambient
   field, with the motion-data particle field behind everything. */
export default function MotionZeroHero() {
  return (
    <section id="m0-hero" className="relative overflow-hidden bg-white pt-16">
      {/* Particle field — sits behind both columns, never over them. */}
      <MotionDataField />

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-12 px-6 pb-16 pt-10 md:pb-24 lg:grid-cols-[45fr_55fr] lg:gap-8 lg:px-10">
        {/* ── Left: brand → product name → slogan → copy → CTA ── */}
        <div className="relative z-[1] -translate-y-4 lg:-translate-y-6">
          <Reveal
            as="h1"
            delay={1}
            className="font-bold leading-[1.05] tracking-tight text-brand text-[clamp(2.5rem,5vw,4.25rem)]"
          >
            Motion-0
          </Reveal>

          <Reveal
            delay={2}
            className="mt-5 text-[clamp(1.25rem,2vw,1.875rem)] font-medium leading-snug tracking-[0.02em] text-ink"
          >
            Dexterous Sensing, Intelligent Control for the Future
          </Reveal>

          <Reveal delay={3} className="mt-7 max-w-md">
            <p className="text-sm leading-[1.9] text-ink/60 md:text-[0.95rem]">
              Motion-0 is a human motion sensing device designed for embodied AI data collection. Through multi-point inertial sensing, it accurately captures full-body human movements and provides high-quality motion data for robot learning and human-robot interaction.
            </p>
          </Reveal>

          <Reveal delay={4} className="mt-10 md:mt-12">
            <CtaLink
              to="/contact"
              className="m0-cta shadow-[0_0_28px_-10px_theme(colors.brand)] transition-all duration-300 hover:shadow-[0_0_38px_-8px_theme(colors.brand)]"
            >
              Explore Motion-0
            </CtaLink>
          </Reveal>
        </div>

        {/* ── Right: the product itself, floating in black space ── */}
        <div className="relative z-[1] flex items-center justify-center lg:justify-end">
          {/* Ambient blue field — radius stays under 50% so it fades
              out inside the box instead of showing a hard edge. */}
          <div className="m0-ambient pointer-events-none absolute inset-0" aria-hidden="true" />
          {/* Floor glow — the product sits in space instead of on a plate. */}
          <div className="m0-floor-glow pointer-events-none absolute inset-0" aria-hidden="true" />

          <Reveal delay={2} className="relative w-full max-w-[560px] lg:max-w-[720px]">
            <img
              src={HERO_IMAGE}
              alt="Motion-0 人体运动感知设备"
              className="m0-product h-auto w-full select-none object-contain"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
