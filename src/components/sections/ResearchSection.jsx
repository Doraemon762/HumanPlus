import Reveal from '../ui/Reveal'
import MediaPlaceholder from '../ui/MediaPlaceholder'
import CtaLink from '../ui/CtaLink'
import { research } from '../../data/research'

/* ── Home Research — overview only: three compact teasers + CTA into
   the dedicated Research page. No fabricated papers. */

export default function ResearchSection() {
  return (
    <section className="relative py-[85px] md:py-[107px]">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <Reveal className="text-xs font-mono uppercase tracking-[0.3em] text-mute">Research</Reveal>
        <Reveal as="h2" delay={1} className="mt-4 font-black tracking-tight leading-[1.2] text-[clamp(1.25rem,4vw,3rem)] text-ink">
          Research
        </Reveal>
        <Reveal delay={2} className="mt-6">
          <p className="max-w-xl text-base leading-relaxed text-ink/70">Research overview goes here.</p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-3">
          {research.slice(0, 3).map((item, i) => (
            <Reveal key={item.id} delay={i} className="group flex h-full flex-col">
              <span className="text-xs font-mono tracking-[0.3em] text-brandLight">{item.ordinal}</span>
              <span className="mt-3 text-[11px] font-mono uppercase tracking-[0.2em] text-mute">{item.venue}</span>
              <h3 className="mt-2 text-lg font-semibold leading-snug text-ink">{item.title}</h3>
            </Reveal>
          ))}
        </div>

        <Reveal delay={3} className="mt-12 md:mt-16">
          <CtaLink to="/research">Explore Research</CtaLink>
        </Reveal>
      </div>
    </section>
  )
}
