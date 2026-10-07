import Reveal from '../ui/Reveal'

/* Glove-0 capability showcase — a NEW section below the existing
   GloveZeroHero (last module on the page, above the global Footer).
   Nothing above it is modified.

   Design language (aligned with the site's existing product cards — glass
   plate + hairline stroke + restrained hover):
   • Section field: soft grey (#F5F5F5) so the cards read as one system.
   • The three cards step through a black → deep-grey → light-grey value
     ladder. This is the "layered greyscale" look: a single family, three
     tones, no colour clash, and the dark cards carry white type while the
     light card keeps ink type.
   • Oversized ghost numerals (01/02/03) sit behind each card's top-left,
     clipped by the card's overflow-hidden radius.
   • Line icons are inline SVG: one visual language (1.25px stroke, round
     caps, geometric). No emoji, no illustration, no colour.
   • Hover is restrained: a hairline border tint + a barely-there scale.
     No glow, no neon, no particles.
   • English copy only. */

/* ── Line icons: 24×24 grid, stroke-based, currentColor ───────────── */
function IconPacket({ className = '' }) {
  return (
    <svg className={'h-11 w-11 md:h-12 md:w-12 ' + className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* data packet: a stack of frames with a streaming node chain */}
      <rect x="2.5" y="4" width="8" height="6" rx="1.5" />
      <rect x="13.5" y="4" width="8" height="6" rx="1.5" />
      <rect x="8" y="14" width="8" height="6" rx="1.5" />
      <path d="M6.5 10v2.5a1.5 1.5 0 0 0 1.5 1.5H8" />
      <path d="M17.5 10v2.5a1.5 1.5 0 0 1-1.5 1.5H16" />
      <path d="M12 14V7" opacity=".45" />
    </svg>
  )
}

function IconSync({ className = '' }) {
  return (
    <svg className={'h-11 w-11 md:h-12 md:w-12 ' + className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* wifi arcs over a clock: wireless + one shared time reference */}
      <circle cx="12" cy="15.5" r="6" />
      <path d="M12 12.5v3.2l2.1 1.3" />
      <path d="M4.6 8.4a10.5 10.5 0 0 1 14.8 0" />
      <path d="M7.6 11.6a6.6 6.6 0 0 1 8.8 0" opacity=".55" />
    </svg>
  )
}

function IconBimanual({ className = '' }) {
  return (
    <svg className={'h-11 w-11 md:h-12 md:w-12 ' + className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* two hand-nodes joined on one local network */}
      <circle cx="5.6" cy="7.4" r="2.6" />
      <circle cx="18.4" cy="7.4" r="2.6" />
      <path d="M5.6 10v3.2a2 2 0 0 0 2 2h8.8a2 2 0 0 0 2-2V10" />
      <circle cx="12" cy="19.2" r="2.2" />
      <path d="M8.2 15.2 10.3 17.4M15.8 15.2l-2.1 2.2" opacity=".55" />
      <path d="M12 4.6v1.4" opacity=".55" />
    </svg>
  )
}

/* value ladder: near-black → deep grey → light grey (one family) */
const TONES = [
  {
    id: '01',
    Icon: IconPacket,
    title: 'Standardized Data Output',
    body: 'UDP packet output provides the global timestamp, device ID, packet sequence number, and node pose data. The protocol is transparent and the data format is fully customizable.',
    card: 'bg-[#111111] text-white border-white/10',
    numeral: 'text-white/[0.07]',
    icon: 'text-white/85',
    hairline: 'bg-white/15',
    kicker: 'text-white/45',
  },
  {
    id: '02',
    Icon: IconSync,
    title: 'Rapid Deployment & Synchronization',
    body: 'Works with standard Wi-Fi routers without requiring a dedicated receiver. Multiple devices maintain a unified time reference, enabling efficient synchronized data collection.',
    card: 'bg-[#2A2A2A] text-white border-white/10',
    numeral: 'text-white/[0.07]',
    icon: 'text-white/85',
    hairline: 'bg-white/15',
    kicker: 'text-white/45',
  },
  {
    id: '03',
    Icon: IconBimanual,
    title: 'Bimanual & Multi-User Collaboration',
    body: 'Supports simultaneous bimanual and multi-user data collection within a single local network, allowing seamless integration with existing data collection, algorithm training, and application systems.',
    card: 'bg-[#E8E8E8] text-ink border-black/[0.08]',
    numeral: 'text-black/[0.06]',
    icon: 'text-ink/70',
    hairline: 'bg-black/10',
    kicker: 'text-ink/45',
  },
]

export default function GloveZeroFeatures() {
  return (
    <section id="g0-features" className="g0-panel relative flex min-h-[100dvh] w-full items-center bg-[#F5F5F5] font-sans" aria-label="Glove-0 capabilities">
      <div className="g0-panel-inner mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {TONES.map(({ id, Icon, title, body, card, numeral, icon, hairline, kicker }, i) => (
            <Reveal key={id} delay={i} className="h-full">
              <article
                className={
                  'group relative flex h-full flex-col overflow-hidden rounded-[24px] border ' +
                  card +
                  ' px-7 pb-8 pt-7 transition-transform duration-500 ease-out hover:scale-[1.015] md:px-8'
                }
              >
                {/* oversized ghost numeral, clipped by the card radius */}
                <span
                  aria-hidden="true"
                  className={
                    'pointer-events-none absolute -left-2 -top-9 select-none font-mono text-[104px] font-medium leading-none tracking-tighter md:-top-10 md:text-[124px] ' +
                    numeral
                  }
                >
                  {id}
                </span>

                {/* icon + hairline */}
                <div className="relative pt-6 md:pt-7">
                  <Icon className={icon} />
                </div>
                <span aria-hidden="true" className={'mt-7 block h-px w-12 ' + hairline} />

                {/* copy */}
                <h3 className="relative mt-6 text-[19px] font-semibold leading-[1.25] tracking-tight md:text-[21px]">
                  {title}
                </h3>
                <p className={'relative mt-4 text-[13px] leading-[1.75] md:text-sm ' + kicker}>
                  {body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}