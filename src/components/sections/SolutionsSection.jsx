import Reveal from '../ui/Reveal'
import MediaPlaceholder from '../ui/MediaPlaceholder'
import CtaLink from '../ui/CtaLink'
import { solutions } from '../../data/solutions'
import { toHref } from '../../hooks/useHashRoute'

/* ── Home Solutions — overview only: four case cards + CTA into
   /solutions. No fabricated case content. */

export default function SolutionsSection() {
  return (
    <section className="relative py-[85px] md:py-[107px]">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <Reveal className="text-xs font-mono uppercase tracking-[0.3em] text-mute">Solutions</Reveal>
        <Reveal as="h2" delay={1} className="mt-4 font-black tracking-tight leading-[1.2] text-[clamp(1.25rem,4vw,3rem)] text-ink">
          Solutions
        </Reveal>
        <Reveal delay={2} className="mt-6">
          <p className="max-w-xl text-base leading-relaxed text-ink/70">Solutions overview goes here.</p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-4">
          {solutions.map((item, i) => (
            <Reveal key={item.id} delay={i} className="group flex h-full flex-col">
              <a href={toHref(item.href)}>
                <MediaPlaceholder label={`${item.name.toUpperCase()} — IMAGE / VIDEO`} className="transition-opacity duration-300 group-hover:opacity-90" />
                <span className="mt-5 block text-[10px] font-mono uppercase tracking-[0.2em] text-mute">{item.category}</span>
                <h3 className="mt-2 text-lg font-semibold leading-snug text-ink">{item.name}</h3>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={4} className="mt-12 md:mt-16">
          <CtaLink to="/solutions">Explore Solutions</CtaLink>
        </Reveal>
      </div>
    </section>
  )
}
