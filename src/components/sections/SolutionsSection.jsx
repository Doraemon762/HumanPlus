import Reveal from '../ui/Reveal'
import MediaPlaceholder from '../ui/MediaPlaceholder'
import { solutions } from '../../data/solutions'

/* ── Solutions — four case-study cards (SOP / Laplace / Xiamen Luyan
   Pharmaceutical / Yamaha). Descriptions are placeholders. */

function SolutionCard({ item, delay }) {
  return (
    <Reveal
      delay={delay}
      className="group flex h-full flex-col rounded-[16px] border border-black/10 bg-white p-6 transition-colors duration-300 hover:border-brandLine"
    >
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-mute">{item.category}</span>
      <h3 className="mt-3 text-lg font-semibold leading-snug text-ink">{item.name}</h3>
      <MediaPlaceholder label="CASE VISUAL" className="mt-5" />
      <p className="mt-5 text-sm leading-relaxed text-ink/55">{item.description}</p>
      <a
        href={item.href}
        className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[11px] font-mono uppercase tracking-[0.25em] text-brand transition-colors duration-300 hover:text-[#0140CC]"
      >
        View Case Study
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-[3px]">→</span>
      </a>
    </Reveal>
  )
}

export default function SolutionsSection() {
  return (
    <section className="relative bg-paper2 py-[85px] md:py-[107px]">
      <div id="solutions" className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <Reveal className="text-xs font-mono uppercase tracking-[0.3em] text-mute">Solutions</Reveal>
        <Reveal
          as="h2"
          delay={1}
          className="mt-4 font-black tracking-tight leading-[1.2] text-[clamp(1.25rem,4vw,3rem)] text-ink"
        >
          Solutions &amp; Case Studies
        </Reveal>
        <Reveal delay={2} className="mt-6">
          <p className="max-w-xl text-base leading-relaxed text-ink/70">
            Solutions overview goes here.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 md:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((item, i) => (
            <SolutionCard key={item.id} item={item} delay={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
