import Reveal from '../ui/Reveal'

/**
 * Shared header for every standalone route: kicker → title → intro,
 * with the fixed 64px navbar offset (pt-16) already accounted for.
 * Keeping it in one component means all pages share the same rhythm.
 */
export default function PageHeader({ label, title, description }) {
  return (
    <header className="relative border-b border-black/5 bg-paper2 pt-16">
      <div className="mx-auto w-full max-w-7xl px-6 pb-14 pt-14 md:pb-20 md:pt-20 lg:px-10">
        <Reveal className="text-xs font-mono uppercase tracking-[0.3em] text-mute">{label}</Reveal>
        <Reveal
          as="h1"
          delay={1}
          className="mt-4 font-black tracking-tight leading-[1.2] text-[clamp(1.75rem,4vw,3.25rem)] text-ink"
        >
          {title}
        </Reveal>
        {description && (
          <Reveal delay={2} className="mt-6">
            <p className="max-w-2xl text-base leading-relaxed text-ink/70">{description}</p>
          </Reveal>
        )}
      </div>
    </header>
  )
}
