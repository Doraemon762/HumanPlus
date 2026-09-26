import Reveal from '../ui/Reveal'
import CtaLink from '../ui/CtaLink'
import MotionDataField from './MotionDataField'
import { site } from '../../data/site'

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
    <section className="relative overflow-hidden bg-black pt-16">
      {/* Particle field — sits behind both columns, never over them. */}
      <MotionDataField />

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-12 px-6 pb-16 pt-10 md:pb-24 lg:grid-cols-[45fr_55fr] lg:gap-8 lg:px-10">
        {/* ── Left: brand → product name → slogan → copy → CTA ── */}
        <div className="relative z-[1]">
          <Reveal className="flex items-center gap-4">
            <img src={site.logo} alt="HumanPlus logo" className="h-11 w-auto" />
            <span className="text-base font-semibold tracking-[0.25em] text-white md:text-lg">
              人一智能
            </span>
          </Reveal>

          <Reveal
            as="h1"
            delay={1}
            className="mt-10 font-bold leading-[1.05] tracking-tight text-brand text-[clamp(2.5rem,5vw,4.25rem)] md:mt-12"
          >
            Motion-0
          </Reveal>

          <Reveal
            delay={2}
            className="mt-5 text-[clamp(1.25rem,2vw,1.875rem)] font-medium leading-snug tracking-[0.02em] text-white"
          >
            灵巧感知，智控未来
          </Reveal>

          <Reveal delay={3} className="mt-7 max-w-md">
            <p className="text-sm leading-[1.9] text-white/45 md:text-[0.95rem]">
              Motion-0 是一款面向具身智能数据采集的人体运动感知设备，通过多点惯性传感精准捕捉人体全身运动，为机器人学习与人机交互提供高质量运动数据。
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
