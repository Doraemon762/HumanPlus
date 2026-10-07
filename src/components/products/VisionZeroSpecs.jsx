import Reveal from '../ui/Reveal'
import '../../styles/v0-g0-panels.css'

/* Vision-0 specification — the SECOND full-screen panel of the Vision-0
   page (id="v0-spec", snaps after id="v0-hero" via the shared
   useSectionSnap hook configured in ProductDetailPage).

   Structure: the SECTION owns the viewport (100vh, edge to edge); the
   TABLE stays a centred, rounded card inside it (max 1180px). This is what
   the brief asks for — "the full-screen thing is the section, not the table".

   Design:
   • Flat light-grey panel #F1F1F1, no gradient / glow / glassmorphism / blue.
   • One rounded card (rounded-[22px], overflow-hidden, hairline border)
     wrapping the whole table; cells are never individually rounded and row
     separators are hairline + low contrast.
   • All copy is English, exactly as supplied. NO extra "Specification"
     heading above the table and NO "SPECIFICATION | DETAILS" column-header
     row (removed per brief) — the wordmark row plus the data rows are the
     whole module.
   • NO internal scroller (no overflow-auto/scroll): the page keeps one
     single native vertical scroll, and useSectionSnap performs the
     full-page hand-off between the two panels. */

const ROWS = [
  ['Diagonal Field of View (FOV)', '165°'],
  ['Binocular Resolution', '3840 × 1200'],
  ['Frame Rate', '30 fps'],
  ['Image Sensor', 'AR0234 (1/2.6")'],
  ['Maximum Effective Resolution', '1920 (H) × 1200 (V)'],
  ['Output Image Format', 'MJPEG / YUV2 (YUYV)'],
]

export default function VisionZeroSpecs() {
  return (
    /* ── full-viewport panel: owns 100vh × 100vw, NOT the table ── */
    <section
      id="v0-spec"
      className="v0-panel relative flex min-h-[100dvh] w-full items-center bg-[#F1F1F1] px-6 py-20 font-sans md:py-24"
      aria-label="Vision-0 specification"
    >
      {/* ── centred rounded spec card ── */}
      <Reveal className="mx-auto w-[min(100%,1180px)]">
        <div className="overflow-hidden rounded-[22px] border border-black/[0.08] bg-[#EDEDED] shadow-[0_1px_2px_rgba(17,17,17,0.03),0_18px_50px_-28px_rgba(17,17,17,0.16)]">
          {/* ── top row: SPECIFICATION wordmark ── */}
          <div className="flex items-baseline justify-between gap-6 bg-[#E4E4E4] px-6 py-5 md:px-10">
            <div className="font-mono text-[12px] font-medium uppercase tracking-[0.3em] text-ink/70 md:text-[13px]">
              Specification
            </div>
          </div>

          {/* ── data rows (hairline separators, no per-cell radius) ── */}
          <div className="border-t border-black/[0.06] bg-[#F6F6F6] px-6 md:px-10">
            {ROWS.map(([label, value], i) => (
              <div
                key={label}
                className={
                  'grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] items-center gap-x-6 py-5 md:py-6 ' +
                  (i < ROWS.length - 1 ? 'border-b border-black/[0.055]' : '')
                }
              >
                <div className="text-[13px] leading-relaxed text-ink/70 md:text-[15px]">
                  {label}
                </div>
                <div className="font-mono text-[13px] leading-relaxed text-ink md:text-[15px]">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}