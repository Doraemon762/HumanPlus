import Reveal from '../ui/Reveal'
import MediaPlaceholder from '../ui/MediaPlaceholder'
import { research } from '../../data/research'

/* ── Research — three items in the HumanPlus-1000 paper layout:
   brand-blue ordinal, mono venue line, teaser, title, description,
   links pinned to a shared bottom edge via mt-auto. */

function ResearchItem({ item, delay }) {
  return (
      /* Hairline columns only at lg (3-col). At md (2-col) a border-l on
         the second row's first column would be a stray floating rule —
         the exact pitfall the design system §8.2 warns about. */
      <Reveal
        delay={delay}
        className="group flex h-full flex-col border-t border-black/10 pt-10 lg:border-t-0 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
      >
      <div className="flex items-start justify-between gap-6">
        <span className="text-[clamp(2.5rem,4vw,3.5rem)] font-black leading-none tracking-tight text-brandLight">
          {item.ordinal}
        </span>
      </div>
      <p className="mt-5 text-xs font-mono uppercase tracking-[0.15em] text-brand">{item.venue}</p>
      <MediaPlaceholder label="TEASER IMAGE" className="mt-6 rounded-[4px]" />
      <h3 className="mt-6 text-lg font-semibold leading-snug text-ink md:text-xl">{item.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink/55">{item.description}</p>
      <div className="mt-auto pt-8">
        <a
          href={item.href}
          className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.25em] text-brand transition-colors duration-300 hover:text-[#0140CC]"
        >
          Learn More
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-[3px]">→</span>
        </a>
      </div>
    </Reveal>
  )
}

export default function ResearchSection() {
  return (
    <section className="relative bg-paper2 py-[85px] md:py-[107px]">
      <div id="research" className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <Reveal className="text-xs font-mono uppercase tracking-[0.3em] text-mute">Research</Reveal>
        <Reveal
          as="h2"
          delay={1}
          className="mt-4 font-black tracking-tight leading-[1.2] text-[clamp(1.25rem,4vw,3rem)] text-ink"
        >
          Research
        </Reveal>
        <Reveal delay={2} className="mt-6">
          <p className="max-w-xl text-base leading-relaxed text-ink/70">
            Research overview goes here.
          </p>
        </Reveal>

        {/* Mobile: stacked with top rules; ≥md: 2 cols; ≥lg: 3 cols split
            by hairlines (border-l + pl-8), matching the original grid. */}
        <div className="mt-16 grid grid-cols-1 gap-y-14 md:mt-20 md:grid-cols-2 md:gap-x-10 md:gap-y-16 lg:grid-cols-3 lg:gap-x-0 lg:gap-y-0">
          {research.map((item, i) => (
            <ResearchItem key={item.id} item={item} delay={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
