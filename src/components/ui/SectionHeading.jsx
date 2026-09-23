import Reveal from './Reveal'

/**
 * Universal section heading block — the exact rhythm from the design
 * system (§4.3): kicker → mt-4 → H2 → mt-6 → description (max-w-xl).
 * Content below always starts at mt-16 md:mt-20 (set by the section).
 *
 * ⚠️ The `id` lives on the inner content wrapper, NOT the <section> —
 * putting it on the section aligns the anchor to the transparent
 * padding box and content lands mid-viewport (a bug fixed in the
 * original project).
 */
export default function SectionHeading({ id, label, title, description, tone = 'light' }) {
  const dark = tone === 'dark'
  return (
    <div id={id} className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10">
      <Reveal
        className={`text-xs font-mono uppercase tracking-[0.3em] ${dark ? 'text-brandLight' : 'text-mute'}`}
      >
        {label}
      </Reveal>
      <Reveal
        as="h2"
        delay={1}
        className={`mt-4 font-black tracking-tight leading-[1.2] text-[clamp(1.25rem,4vw,3rem)] ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </Reveal>
      {description && (
        <Reveal delay={2} className="mt-6">
          <p className={`max-w-xl text-base leading-relaxed ${dark ? 'text-white/70' : 'text-ink/70'}`}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
