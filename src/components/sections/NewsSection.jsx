import Reveal from '../ui/Reveal'

/* Featured News — one important story shown as a horizontal glass card.
   Data is inlined so it does not affect the standalone /news route page. */
const FEATURED = {
  title:
    'Embodied AI Frontier Covers the Launch of HUMANPLUS-1000, a 1,000-Hour WBI Dataset',
  date: 'September 14, 2026',
  // import.meta.env.BASE_URL is './' (vite base) — resolves correctly under
  // the GitHub Pages sub-path /HumanPlus/.
  image: `${import.meta.env.BASE_URL}images/news/featured-news.png`,
  href: 'https://mp.weixin.qq.com/s/adWk4kCGTZz9VXBOMuMHLw',
  excerpt:
    'Chinese embodied intelligence media outlet Embodied AI Frontier featured the launch of HUMANPLUS-1000. Released by HumanPlus at Xiamen University in collaboration with CMU, Tsinghua University, and Zhejiang University, HUMANPLUS-1000 is the first human behavior dataset to bring synchronized Ego Vision × Whole-body Motion data to the 1,000-hour scale, spanning 100+ participants, 100+ real-world environments, and 500+ task categories. Built around a more natural and low-intrusion wearable capture system, the dataset is designed to turn continuous human activity in real production and everyday environments into a scalable data source for Whole-body Intelligence.',
}

export default function NewsSection() {
  const n = FEATURED
  return (
    <section
      id="news"
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #FFFFFF 0%, #F5FAFF 45%, #EAF4FF 100%)',
      }}
    >
      {/* faint blue glows + subtle dot grid — decorative only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(60% 50% at 88% 6%, rgba(90,156,252,0.10), transparent 60%), radial-gradient(55% 45% at 4% 96%, rgba(90,156,252,0.08), transparent 60%), radial-gradient(circle, rgba(90,156,252,0.06) 1px, transparent 1.4px)',
          backgroundSize: 'auto, auto, 26px 26px',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <Reveal>
          <article
            className="group grid grid-cols-1 gap-8 rounded-[28px] border border-white/80 p-6 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 md:grid-cols-2 md:gap-12 md:p-10"
            style={{
              background: 'rgba(255,255,255,0.65)',
              boxShadow: '0 24px 64px -24px rgba(90,156,252,0.45)',
            }}
          >
            {/* left — 16:9 image, contain, no crop */}
            <div className="flex items-center justify-center overflow-hidden rounded-2xl bg-white/40">
              <div className="aspect-[16/9] w-full">
                <img
                  src={n.image}
                  alt={n.title}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            {/* right — title · date · excerpt · read more */}
            <div className="flex flex-col">
              <h3 className="text-[clamp(1.4rem,2.6vw,2.1rem)] font-bold leading-[1.25] tracking-tight text-ink">
                {n.title}
              </h3>

              <p className="mt-3 text-sm font-medium uppercase tracking-wide text-mute">
                {n.date}
              </p>

              <p className="mt-4 text-[15px] leading-relaxed text-[#52525b] line-clamp-4">
                {n.excerpt}
              </p>

              <a
                href={n.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/rm mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand"
              >
                Read More
                <span className="transition-transform duration-200 group-hover/rm:translate-x-1" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
