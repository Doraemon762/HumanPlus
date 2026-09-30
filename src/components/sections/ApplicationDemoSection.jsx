import Reveal from '../ui/Reveal'

/* Small inline arrow (stroke = currentColor) */
function ArrowDownSmall() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-brand" aria-hidden="true">
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  )
}

/* A single labelled demo video.
   - Uniform 16:9 frame + rounded corners + subtle grey frame background.
   - `object-contain` so the original video ratio is preserved (no stretch,
     no crop) — bars blend into the frame background.
   - Native controls, preload="metadata" (no full download until played),
     playsInline, no autoplay (perf-safe on load). */
function VideoTile({ src, label }) {
  return (
    <figure className="group">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-panel ring-1 ring-line transition-all duration-300 group-hover:ring-brand/30 group-hover:shadow-[0_10px_40px_rgba(90,156,252,0.10)]">
        <video
          src={src}
          className="h-full w-full object-contain"
          controls
          preload="metadata"
          playsInline
        />
      </div>
      <figcaption className="mt-3 text-center text-xs font-mono uppercase tracking-[0.18em] text-mute">
        {label}
      </figcaption>
    </figure>
  )
}

/* Minimal descending connector between the two video groups.
   A thin brand line + travelling dot (reuses .appflow-dot-y) and two
   short labels — not a full flowchart. Reduced-motion users still see
   the static line + labels. */
function DemoConnector() {
  return (
    <div className="relative my-14 flex justify-center md:my-20">
      <div className="relative flex flex-col items-center gap-3">
        <span aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-brand/0 via-brand/45 to-brand/0" />
        <span aria-hidden className="appflow-dot-y" />
        <ArrowDownSmall />
        <span className="relative z-10 rounded-full border border-brand/30 bg-brandSoft px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.28em] text-brand">Human Data</span>
        <ArrowDownSmall />
        <span className="relative z-10 rounded-full border border-brand/30 bg-brandSoft px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.28em] text-brand">Robot Learning</span>
        <ArrowDownSmall />
      </div>
    </div>
  )
}

export default function ApplicationDemoSection() {
  return (
    <section className="relative bg-paper2 py-20 md:py-28" aria-label="Human to robot demo showcase">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        {/* heading */}
        <Reveal as="p" className="text-xs font-mono uppercase tracking-[0.3em] text-mute">
          Human Demonstration → Robot Learning → Robotic Action
        </Reveal>
        <Reveal as="h2" delay={1} className="mt-4 font-black tracking-tight leading-[1.1] text-[clamp(2rem,6vw,3.5rem)] text-ink">
          DEMO
        </Reveal>
        <Reveal delay={2} className="mt-4">
          <p className="max-w-2xl text-base leading-relaxed text-ink/70">
            From Human Demonstrations to Robotic Actions
          </p>
        </Reveal>

        {/* Part 1 — Human Demonstration */}
        <div className="mt-16 md:mt-20">
          <Reveal as="h3" className="text-center font-black tracking-tight text-[clamp(1.25rem,3vw,1.75rem)] text-ink">
            Human Demonstration
          </Reveal>
          <Reveal delay={1} className="mt-3 text-center">
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-ink/70">
              Capturing natural human behaviors and manipulation skills in the real world.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <VideoTile src="videos/demo/human-demo-1-1080.mp4" label="Human Demonstration" />
            <VideoTile src="videos/demo/human-manipulation.mp4" label="Human Manipulation" />
          </div>
        </div>

        <DemoConnector />

        {/* Part 2 — Robot Operation */}
        <div>
          <Reveal as="h3" className="text-center font-black tracking-tight text-[clamp(1.25rem,3vw,1.75rem)] text-ink">
            Robot Operation
          </Reveal>
          <Reveal delay={1} className="mt-3 text-center">
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-ink/70">
              Translating human demonstrations into physical robotic actions.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <VideoTile src="videos/demo/robot-action.mp4" label="Robot Action" />
            <VideoTile src="videos/demo/robot-manipulation.mp4" label="Robot Manipulation" />
          </div>
        </div>
      </div>
    </section>
  )
}
