import Reveal from '../ui/Reveal'
import { research } from '../../data/research'

/* ── Home Research — three blue-white gradient glass cards on a light
   full-screen section.
   Part of the snap chain: hero ⇄ about ⇄ products ⇄ robotics ⇄ research,
   so it keeps `id="research"` and stays a 100vh panel. The Robotics →
   Research full-screen transition is unchanged (see useSectionSnap).

   Layout (per latest brief):
   • No section heading — cards sit vertically centered.
   • Each card: a fixed 16:9 paper figure (object-contain, never cropped,
     top corners blend with the card's rounded-2xl via overflow-hidden)
     → a fixed-height tag/award row → a fixed-height title block (full
     title, ≤3 lines, never clamped) → the description → links pinned to
     the bottom (mt-auto) so all three cards stay strictly aligned.
   Content comes from src/data/research.js (first three); the shared
   ArticleRow on /research reads only its basic fields. */

export default function ResearchSection() {
  return (
    <section
      id="research"
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-white py-[72px]"
    >
      {/* very faint top brand wash for a touch of tech atmosphere on the
          light surface — single colour, no second hue introduced. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_55%_at_50%_0%,rgba(90,156,252,0.07),transparent_55%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="mt-0 grid grid-cols-1 gap-6 md:grid-cols-3">
          {research.slice(0, 3).map((item, i) => (
            <Reveal key={item.id} delay={i} className="group flex h-full">
              <article
                className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/70 shadow-[0_8px_30px_rgba(17,24,39,0.07)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-[0_22px_55px_rgba(90,156,252,0.28)]"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.70) 52%, rgba(90,156,252,0.20) 100%)',
                }}
              >
                {/* gentle brand glow that lifts from the bottom on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(90% 55% at 50% 108%, rgba(90,156,252,0.28), transparent 70%)',
                  }}
                />

                {/* paper figure — fixed 16:9 box, full image (contain, no
                    crop). All source figures are exactly 16:9 so contain
                    fills the box with zero letterboxing. */}
                {item.image && (
                  <div className="relative w-full shrink-0 overflow-hidden aspect-[16/9]">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}

                <div className="relative flex flex-1 flex-col p-6">
                  {/* Logo row — sits ABOVE the title. Fixed min-height so the
                      three cards' title rows stay on the same baseline even
                      though the three logos (and one award chip) differ in
                      rendered height. Paper 2 additionally shows a gold
                      "Best Paper" chip to the RIGHT of its logo, on THIS row
                      (never on the title row). The venue `tag` text is still
                      NOT rendered here (kept only for /research ArticleRow). */}
                  <div className="flex min-h-[48px] flex-wrap items-center gap-x-3 gap-y-2">
                    {item.logo && (
                      <img
                        src={item.logo}
                        alt=""
                        loading="lazy"
                        className="w-auto max-w-full object-contain"
                        style={{ height: item.logoH }}
                      />
                    )}
                    {item.highlight && (
                      <span className="inline-flex items-center rounded-full border border-amber-400/40 bg-amber-400/15 px-3 py-1 text-[11px] font-medium text-amber-700">
                        Best Paper
                      </span>
                    )}
                  </div>

                  {/* title — full text, ≤3 lines, never clamped. Starts at
                      the card's content left edge so all three titles align
                      on the same vertical line (Best Paper lives on the logo
                      row, not here, so it can't push the title sideways). */}
                  <h3 className="mt-4 text-[15px] font-semibold leading-[1.35] text-[#111827] md:text-base">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-[13px] leading-relaxed text-[#52525b]">
                    {item.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-5">
                    {item.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[12px] font-medium text-brand transition-colors duration-300 hover:text-[#2563eb]"
                      >
                        {link.label}
                        <span aria-hidden="true" className="ml-0.5">
                          ↗
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
