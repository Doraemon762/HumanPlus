import Reveal from '../ui/Reveal'
import '../../styles/v0-g0-panels.css'

/* Glove-0 technical specification — two full-viewport panels that follow
   the capability showcase (g0-features) on the Glove-0 route:

     g0-specs     → HARDWARE & COMMUNICATION      (3-column compare table)
     g0-accuracy  → 6-IMU HAND POSE ACCURACY      (hero metrics)
                    + EVALUATION DEFINITION       (glossary block)

   Both are `.g0-panel` sections (see v0-g0-panels.css) so they take part in
   the same useSectionSnap full-screen hand-off as the rest of the page, and
   both are registered in ProductDetailPage.jsx (GLOVE_ZERO_IDS).

   Design language: black / white / grey only. Hairline rules, generous
   spacing, small-caps mono headers, no fills competing with the type, no
   colour coding. The three accuracy numbers are the visual centrepiece —
   set large in the sans face with a hairline underscore, per the brief. */

/* ── Section 1 · Hardware & Communication ──────────────────────────── */
const SPEC_ROWS = [
  ['Sensors', '6 × 9-axis IMUs', '11 × 9-axis IMUs'],
  ['Sampling Rate', '45 Hz default, adjustable', '30 Hz default, adjustable'],
  ['Output', '3-axis acceleration, quaternion', '3-axis acceleration, quaternion'],
  ['Communication & Synchronization', '2.4 GHz Wi-Fi UDP; NTP ≤ 20 ms', '2.4 GHz Wi-Fi UDP; NTP ≤ 20 ms'],
  ['Effective Range', '20 m indoors', '20 m indoors'],
  ['Power & Battery Life', '3.7 V; ≥ 2.5 hours @ 30 Hz', '3.7 V; ≥ 2 hours @ 30 Hz'],
  ['Module Dimensions', 'Back of hand: 33 × 30 mm; Fingertip: 9 × 12 mm', 'Back of hand: 33 × 30 mm; Fingertip: 9 × 12 mm; Interfinger: 10 × 14 mm'],
]

/* ── Section 2 · accuracy hero metrics ──────────────────────────────── */
const METRICS = [
  ['4.8°', 'Mean Rotation Error'],
  ['3.26 mm', 'MPJPE'],
  ['3.15 mm', 'MPVPE'],
]

/* ── Section 2 · evaluation glossary ────────────────────────────────── */
const DEFINITIONS = [
  ['Mean Rotation Error', 'Mean geodesic SO(3) error across 16 hand joints.'],
  ['MPJPE', '21-joint error obtained with MANO FK after fixing the root.'],
  ['MPVPE', '778-vertex error obtained with MANO FK after fixing the root.'],
]

/* Shared small-caps section label. */
function SectionLabel({ children }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-mute md:text-[12px]">
      {children}
    </p>
  )
}

export function GloveZeroHardwareSpecs() {
  return (
    <section
      id="g0-specs"
      className="g0-panel relative flex min-h-[100dvh] w-full items-center bg-white font-sans"
      aria-label="Glove-0 hardware and communication specifications"
    >
      <div className="g0-panel-inner mx-auto w-full max-w-6xl px-6 py-20 lg:px-10">
        <Reveal>
          <SectionLabel>Glove-0</SectionLabel>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-4 text-[clamp(1.5rem,3.2vw,2.5rem)] font-semibold leading-[1.08] tracking-tight text-ink">
            Hardware &amp; Communication
          </h2>
        </Reveal>

        {/* ── compare table: indicator / 6-IMU / 11-IMU ── */}
        <Reveal delay={2}>
          <div className="mt-10 md:mt-14">
            {/* column header */}
            <div className="grid grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)_minmax(0,1fr)] gap-x-6 border-b border-black/15 pb-4 md:gap-x-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute md:text-[11px]">
                Indicator
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/80 md:text-[11px]">
                6-IMU Version
              </div>
              {/* the 11-IMU column sits on a whisper-light grey so the two
                  versions read as a pair without any colour coding. The
                  negative inset is desktop-only — on narrow screens it would
                  widen the grid past the viewport. */}
              <div className="bg-[#F2F2F2] px-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/80 sm:-mx-3 md:text-[11px]">
                11-IMU Version
              </div>
            </div>

            {/* rows */}
            {SPEC_ROWS.map(([label, v6, v11]) => (
              <div
                key={label}
                className="grid grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)_minmax(0,1fr)] items-baseline gap-x-6 gap-y-1 border-b border-black/[0.07] py-5 md:gap-x-10 md:py-6"
              >
                <div className="text-[13px] leading-relaxed text-ink/85 md:text-[15px]">
                  {label}
                </div>
                <div className="text-[13px] leading-relaxed text-ink/60 md:text-[15px]">
                  {v6}
                </div>
                <div className="bg-[#F2F2F2] px-3 text-[13px] leading-relaxed text-ink/60 sm:-mx-3 md:text-[15px]">
                  {v11}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function GloveZeroAccuracy() {
  return (
    <section
      id="g0-accuracy"
      className="g0-panel relative flex min-h-[100dvh] w-full items-center bg-[#F5F5F5] font-sans"
      aria-label="Glove-0 hand pose reconstruction accuracy"
    >
      <div className="g0-panel-inner mx-auto w-full max-w-6xl px-6 py-20 lg:px-10">
        <Reveal>
          <SectionLabel>Glove-0 · 6-IMU Version</SectionLabel>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-4 max-w-3xl text-[clamp(1.35rem,2.9vw,2.25rem)] font-semibold leading-[1.1] tracking-tight text-ink">
            6-IMU Hand Pose Reconstruction Accuracy
          </h2>
        </Reveal>

        {/* ── the three metrics, set large as the visual anchor ── */}
        <Reveal delay={2}>
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-3 md:mt-16">
            {METRICS.map(([value, label]) => (
              <div key={label} className="flex flex-col">
                <div className="text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-none tracking-tight text-ink">
                  {value}
                </div>
                {/* hairline underscore, per the sketch */}
                <span aria-hidden="true" className="mt-4 block h-px w-full bg-black/12" />
                <div className="mt-4 text-[12px] uppercase tracking-[0.16em] text-mute md:text-[13px]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── evaluation definition ── */}
        <Reveal delay={3}>
          <div className="mt-16 border-t border-black/12 pt-10 md:mt-24 md:pt-12">
            <SectionLabel>Evaluation Definition</SectionLabel>
            <dl className="mt-7 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-3 md:gap-y-8">
              {DEFINITIONS.map(([term, def]) => (
                <div key={term}>
                  <dt className="text-[13px] font-medium text-ink md:text-[15px]">{term}</dt>
                  <dd className="mt-1.5 text-[13px] leading-relaxed text-ink/60 md:text-[15px]">
                    {def}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}