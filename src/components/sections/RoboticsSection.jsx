import Reveal from '../ui/Reveal'
import MediaPlaceholder from '../ui/MediaPlaceholder'

/* ── Robotics — the one dark, full-bleed band on an otherwise light
   page. Gives the framework its strongest visual moment and reserves
   space for Human-to-Robot / retargeting / manipulation footage later.
   Content intentionally minimal at this stage. */

export default function RoboticsSection() {
  return (
    <section className="relative bg-[#0B0E14] py-[85px] md:py-[107px]">
      <div id="robotics" className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <Reveal className="text-xs font-mono uppercase tracking-[0.3em] text-brandLight">Robotics</Reveal>
        <Reveal
          as="h2"
          delay={1}
          className="mt-4 font-black tracking-tight leading-[1.2] text-[clamp(1.25rem,4vw,3rem)] text-white"
        >
          Robotics
        </Reveal>
        <Reveal delay={2} className="mt-6">
          <p className="max-w-xl text-base leading-relaxed text-white/70">
            Robotics introduction goes here.
          </p>
        </Reveal>

        <Reveal delay={3} className="mt-16 md:mt-20">
          <MediaPlaceholder label="ROBOTICS — LARGE VIDEO / VISUAL" tone="dark" />
        </Reveal>

        <Reveal delay={4} className="mt-10">
          <a
            href="#robotics"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-brandLine hover:text-brandLight"
          >
            Learn More
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
