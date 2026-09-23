import Reveal from '../ui/Reveal'
import MediaPlaceholder from '../ui/MediaPlaceholder'
import { news } from '../../data/news'

/* ── News — three placeholder cards. Dates/categories are placeholders;
   no fabricated announcements. */

function NewsCard({ item, delay }) {
  return (
    <Reveal delay={delay} className="group flex h-full flex-col">
      <MediaPlaceholder label="NEWS IMAGE" className="transition-opacity duration-300 group-hover:opacity-90" />
      <div className="mt-5 flex items-center gap-4">
        <span className="text-xs font-mono uppercase tracking-[0.15em] text-mute">{item.date}</span>
        <span className="rounded-full border border-black/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-mute">
          {item.category}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-snug text-ink">{item.title}</h3>
      <a
        href={item.href}
        className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[11px] font-mono uppercase tracking-[0.25em] text-brand transition-colors duration-300 hover:text-[#0140CC]"
      >
        Read More
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-[3px]">→</span>
      </a>
    </Reveal>
  )
}

export default function NewsSection() {
  return (
    <section className="relative py-[85px] md:py-[107px]">
      <div id="news" className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <Reveal className="text-xs font-mono uppercase tracking-[0.3em] text-mute">News</Reveal>
        <Reveal
          as="h2"
          delay={1}
          className="mt-4 font-black tracking-tight leading-[1.2] text-[clamp(1.25rem,4vw,3rem)] text-ink"
        >
          News
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-3 md:gap-8">
          {news.map((item, i) => (
            <NewsCard key={item.id} item={item} delay={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
