import Reveal from '../ui/Reveal'
import MediaPlaceholder from '../ui/MediaPlaceholder'
import CtaLink from '../ui/CtaLink'
import { news } from '../../data/news'

/* ── Home News — overview only: three cards + CTA into /news.
   Dates / categories / titles are placeholders. */

export default function NewsSection() {
  return (
    <section className="relative py-[85px] md:py-[107px]">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <Reveal className="text-xs font-mono uppercase tracking-[0.3em] text-mute">News</Reveal>
        <Reveal as="h2" delay={1} className="mt-4 font-black tracking-tight leading-[1.2] text-[clamp(1.25rem,4vw,3rem)] text-ink">
          News
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-3 md:gap-8">
          {news.slice(0, 3).map((item, i) => (
            <Reveal key={item.id} delay={i} className="group flex h-full flex-col">
              <MediaPlaceholder label="NEWS IMAGE" className="transition-opacity duration-300 group-hover:opacity-90" />
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs font-mono uppercase tracking-[0.15em] text-mute">{item.date}</span>
                <span className="rounded-full border border-black/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-mute">
                  {item.category}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-snug text-ink">{item.title}</h3>
            </Reveal>
          ))}
        </div>

        <Reveal delay={3} className="mt-12 md:mt-16">
          <CtaLink to="/news">View All News</CtaLink>
        </Reveal>
      </div>
    </section>
  )
}
