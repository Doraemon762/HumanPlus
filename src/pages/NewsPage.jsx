import PageHeader from '../components/layout/PageHeader'
import Reveal from '../components/ui/Reveal'
import MediaPlaceholder from '../components/ui/MediaPlaceholder'
import { news } from '../data/news'

export default function NewsPage() {
  return (
    <>
      <PageHeader label="News" title="News" description="News and announcements go here." />

      <section className="py-[85px] md:py-[107px]">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="space-y-16 md:space-y-20">
            {news.map((item, i) => (
              <Reveal key={item.id} delay={i} className="group grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
                <MediaPlaceholder label="NEWS IMAGE" className="transition-opacity duration-300 group-hover:opacity-90" />
                <div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono uppercase tracking-[0.15em] text-mute">{item.date}</span>
                    <span className="rounded-full border border-black/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-mute">
                      {item.category}
                    </span>
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold leading-snug text-ink">{item.title}</h2>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.25em] text-brand">
                    Read More
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-[3px]">
                      →
                    </span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
