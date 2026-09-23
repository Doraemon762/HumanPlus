import Reveal from '../ui/Reveal'
import MediaPlaceholder from '../ui/MediaPlaceholder'
import { site } from '../../data/site'

/* ── About / company introduction — framework only.
   No founding year, funding or history: all placeholder copy. */

export default function AboutSection() {
  return (
    <section className="relative bg-paper2 py-[85px] md:py-[107px]">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <Reveal className="text-xs font-mono uppercase tracking-[0.3em] text-mute">About {site.nameEn}</Reveal>
        <Reveal as="h2" delay={1} className="mt-4 font-black tracking-tight leading-[1.2] text-[clamp(1.25rem,4vw,3rem)] text-ink">
          Company Introduction
        </Reveal>

        <div className="mt-16 grid items-center gap-12 md:mt-20 md:grid-cols-2 lg:gap-16">
          <Reveal delay={2}>
            <p className="max-w-xl text-base leading-relaxed text-ink/70">Company introduction goes here.</p>
          </Reveal>
          <Reveal delay={3}>
            <MediaPlaceholder label="COMPANY PHOTO / VIDEO" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
