import '@fontsource-variable/inter'
import Reveal from '../ui/Reveal'
import MotionDataField from './MotionDataField'
import { toHref } from '../../hooks/useHashRoute'

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
    <section id="m0-hero" className="m0-hero-surface relative isolate overflow-hidden pt-16 font-sans">
      {/* Particle field — sits behind both columns, never over them. */}
      <MotionDataField />

      <div className="m0-hero-grid relative z-[1] mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-12 px-6 pb-16 pt-10 md:pb-24 lg:grid-cols-[45fr_55fr] lg:gap-8 lg:px-10">
        {/* ── Left: brand → product name → slogan → copy → CTA ── */}
        <div className="relative z-[1] -translate-y-4 lg:-translate-y-6">
          <Reveal
            as="h1"
            delay={1}
            data-text="Weave"
            className="m0-glass-title font-bold leading-[1.05] tracking-tight text-brand text-[clamp(2.5rem,5vw,4.25rem)]"
          >
            Weave
          </Reveal>

          <Reveal
            delay={2}
            className="mt-5 text-[clamp(1.25rem,2vw,1.875rem)] font-medium leading-snug tracking-[0.02em] text-[#333333]"
          >
            Dexterous Sensing, Intelligent Control for the Future
          </Reveal>

          <Reveal delay={3} className="mt-7 max-w-md">
            <p className="text-sm leading-[1.9] text-ink/60 md:text-[0.95rem]">
              Weave is a human motion sensing device designed for embodied AI data collection. Through multi-point inertial sensing, it accurately captures full-body human movements and provides high-quality motion data for robot learning and human-robot interaction.
            </p>
          </Reveal>

          <Reveal delay={4} className="m0-hero-cta-wrap mt-10 md:mt-12">
            <a
              href={toHref('/contact')}
              className="m0-hero-cta group relative inline-flex h-[48px] min-w-[220px] items-center justify-center overflow-hidden rounded-full border border-transparent px-7 backdrop-blur-[12px] transition-all duration-500 hover:-translate-y-0.5"
              style={{
                background:
                  'linear-gradient(135deg, rgba(90,156,252,0.84) 0%, rgba(112,170,252,0.72) 52%, rgba(151,198,255,0.62) 100%)',
              }}
            >
              <span
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  background:
                    'radial-gradient(110% 155% at 14% 118%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.11) 30%, rgba(255,255,255,0.03) 43%, rgba(255,255,255,0) 56%),' +
                    'radial-gradient(110% 155% at 86% -18%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.09) 30%, rgba(255,255,255,0.02) 43%, rgba(255,255,255,0) 56%)',
                }}
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute left-[14%] top-[12%] h-5 w-16 rounded-full bg-white/25 opacity-25 blur-[10px]"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute -inset-y-4 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-all duration-[900ms] ease-out group-hover:left-[130%] group-hover:opacity-100"
                aria-hidden="true"
              />
              <span
                className="relative z-10 inline-flex items-center gap-3 text-[0.95rem] font-semibold tracking-[0.01em] text-white transition-colors duration-500 md:text-[1rem]"
                style={{
                  textShadow: '0 1px 1px rgba(25,72,145,0.28)',
                }}
              >
                Explore Weave
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-[3px]">→</span>
              </span>
            </a>
          </Reveal>
        </div>

        {/* ── Right: the product itself, floating in black space ── */}
        <div className="m0-hero-visual relative z-[1] flex items-center justify-center lg:justify-end">
          {/* Ambient blue field — radius stays under 50% so it fades
              out inside the box instead of showing a hard edge. */}
          <div className="m0-ambient pointer-events-none absolute inset-0" aria-hidden="true" />
          {/* Floor glow — the product sits in space instead of on a plate. */}
          <div className="m0-floor-glow pointer-events-none absolute inset-0" aria-hidden="true" />

          <Reveal delay={2} className="relative w-full max-w-[560px] lg:max-w-[720px]">
            <img
              src={HERO_IMAGE}
              alt="Weave 人体运动感知设备"
              className="m0-product h-auto w-full select-none object-contain"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
