import PageHeader from '../components/layout/PageHeader'
import Reveal from '../components/ui/Reveal'
import MediaPlaceholder from '../components/ui/MediaPlaceholder'
import CtaLink from '../components/ui/CtaLink'
import { solutions } from '../data/solutions'
import { toHref } from '../hooks/useHashRoute'

export default function SolutionsPage() {
  return (
    <>
      <PageHeader label="Solutions" title="Solutions" description="Solutions overview goes here." />

      <section className="py-[85px] md:py-[107px]">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {solutions.map((item, i) => (
              <Reveal key={item.id} delay={i % 2} className="group flex h-full flex-col">
                <a href={toHref(item.href)}>
                  <MediaPlaceholder label={`${item.name.toUpperCase()} — IMAGE / VIDEO`} className="transition-opacity duration-300 group-hover:opacity-90" />
                  <span className="mt-6 block text-[10px] font-mono uppercase tracking-[0.2em] text-mute">{item.category}</span>
                  <h2 className="mt-2 text-xl font-semibold leading-snug text-ink">{item.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink/55">{item.description}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.25em] text-brand">
                    View Case Study
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-[3px]">
                      →
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={2} className="mt-16 md:mt-20">
            <CtaLink to="/contact">Contact Us</CtaLink>
          </Reveal>
        </div>
      </section>
    </>
  )
}
