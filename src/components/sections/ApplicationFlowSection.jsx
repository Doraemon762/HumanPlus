import Reveal from '../ui/Reveal'

/* ── Inline line-icons (stroke = currentColor) ─────────────────────── */

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
      <circle cx="12" cy="5.5" r="2.2" />
      <path d="M12 8v6" />
      <path d="M12 11l-3.4 2.3M12 11l3.4 2.3" />
      <path d="M8.6 21c0-3.3 1.7-5.6 3.4-5.6s3.4 2.3 3.4 5.6" />
    </svg>
  )
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  )
}

function NetworkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
      <circle cx="12" cy="12" r="2.3" />
      <circle cx="5" cy="6" r="1.7" />
      <circle cx="19" cy="6" r="1.7" />
      <circle cx="5" cy="18" r="1.7" />
      <circle cx="19" cy="18" r="1.7" />
      <path d="M6.4 6.9 10 10.6M17.6 6.9 14 10.6M6.4 17.1 10 13.4M17.6 17.1 14 13.4" />
    </svg>
  )
}

function RobotIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
      <rect x="5" y="9" width="14" height="10" rx="2.6" />
      <path d="M12 9V6.6M10.4 6.6h3.2" />
      <circle cx="9.2" cy="14" r="1.3" />
      <circle cx="14.8" cy="14" r="1.3" />
      <path d="M9.6 17.4h4.8" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function ArrowDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  )
}

/* Human folding (line illustration) */
function HumanFold() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-20 w-20" aria-hidden="true">
      <circle cx="32" cy="11" r="3.4" />
      <path d="M32 15v10" />
      <path d="M32 21c-5 1-7.5 4.5-8.5 9" />
      <path d="M32 21c5 1 7.5 4.5 8.5 9" />
      <path d="M25 54c0-5 2.6-8.5 7-8.5s7 3.5 7 8.5" />
      <rect x="21" y="38" width="22" height="11" rx="1.8" />
      <path d="M27 38v11M32 38v11M37 38v11" />
    </svg>
  )
}

/* Robot arm folding (line illustration) */
function RobotFold() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-20 w-20" aria-hidden="true">
      <rect x="6" y="52" width="52" height="6" rx="2" />
      <path d="M32 52V44" />
      <path d="M32 44 19 33" />
      <path d="M19 33 30 20" />
      <circle cx="30" cy="20" r="2.6" />
      <rect x="22" y="13" width="22" height="10" rx="1.8" />
      <path d="M28 13v10M33 13v10M38 13v10" />
    </svg>
  )
}

/* ── Per-stage sub-visuals ─────────────────────────────────────────── */

function HumanTasks() {
  const items = ['grasping', 'folding', 'pouring', 'opening', 'placing', 'tool use']
  return (
    <div className="flex flex-wrap justify-center gap-1.5">
      {items.map((t) => (
        <span key={t} className="rounded-full border border-line bg-paper px-2.5 py-1 text-[11px] font-mono text-mute">{t}</span>
      ))}
    </div>
  )
}

function ConvergeDiagram() {
  const sources = ['Ego Vision', 'Whole-body Motion', 'Hand Pose', 'IMU', 'Trajectory']
  const colors = 'rgba(17,17,17,0.18)'
  return (
    <svg viewBox="0 0 280 168" className="mx-auto h-auto w-full max-w-[17rem]" role="img" aria-label="Five data modalities converging into Human Data">
      {/* merge lines */}
      {sources.map((_, i) => {
        const y = 16 + i * 30
        return <path key={i} d={`M104 ${y} C 150 ${y}, 170 84, 196 84`} fill="none" stroke={colors} strokeWidth="1.4" />
      })}
      {/* source dots */}
      {sources.map((s, i) => {
        const y = 16 + i * 30
        return (
          <g key={s}>
            <circle cx="104" cy={y} r="3" fill="rgb(var(--brand-rgb))" />
            <text x="98" y={y + 3.2} textAnchor="end" fontSize="10" fontFamily="monospace" fill="#767676">{s}</text>
          </g>
        )
      })}
      {/* convergence node */}
      <circle className="appflow-pulse" cx="210" cy="84" r="17" fill="rgba(90,156,252,0.10)" stroke="rgb(var(--brand-rgb))" strokeWidth="1.6" />
      <text x="210" y="80" textAnchor="middle" fontSize="9" fontWeight="700" fill="#111111">Human</text>
      <text x="210" y="91" textAnchor="middle" fontSize="9" fontWeight="700" fill="#111111">Data</text>
    </svg>
  )
}

function LearningChain() {
  const steps = ['Demonstrations', 'Behavior Representation', 'Policy Learning', 'Robot Skill']
  return (
    <div className="flex flex-col items-center gap-1.5">
      {steps.map((s, i) => (
        <div key={s} className="flex flex-col items-center">
          <span className="text-[12px] font-medium text-ink">{s}</span>
          {i < steps.length - 1 && <ArrowDown />}
        </div>
      ))}
    </div>
  )
}

function ActionChain() {
  const steps = ['Perceive', 'Understand', 'Act']
  return (
    <div className="flex flex-col items-center gap-1.5">
      {steps.map((s, i) => (
        <div key={s} className="flex flex-col items-center">
          <span className="text-[12px] font-medium text-ink">{s}</span>
          {i < steps.length - 1 && <ArrowDown />}
        </div>
      ))}
    </div>
  )
}

const STAGES = [
  { id: '01', label: 'Human Demonstration', caption: 'Capture how humans move, interact, and manipulate objects in the real world.', icon: <PersonIcon />, sub: <HumanTasks /> },
  { id: '02', label: 'Multimodal Data', caption: 'Human behavior is transformed into synchronized multimodal data.', icon: <LayersIcon />, sub: <ConvergeDiagram /> },
  { id: '03', label: 'Robot Learning', caption: 'Learning from diverse human demonstrations to build reusable manipulation skills.', icon: <NetworkIcon />, sub: <LearningChain /> },
  { id: '04', label: 'Autonomous Robot Action', caption: 'Learned skills are transferred into autonomous robotic actions in the physical world.', icon: <RobotIcon />, sub: <ActionChain /> },
]

function FlowDotX({ delay }) {
  return <span className="appflow-dot-x" style={{ animationDelay: `${delay}s` }} />
}
function FlowDotY({ delay }) {
  return <span className="appflow-dot-y" style={{ animationDelay: `${delay}s` }} />
}

function TaskPanel({ title, icon }) {
  return (
    <div className="rounded-2xl border border-line p-6">
      <span className="text-sm font-semibold text-ink">{title}</span>
      <div className="mt-5 flex h-32 items-center justify-center rounded-xl bg-white text-ink/80 ring-1 ring-line">
        {icon}
      </div>
    </div>
  )
}

export default function ApplicationFlowSection() {
  return (
    <section className="relative bg-paper py-20 md:py-28" aria-label="Human to robot learning pipeline">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        {/* heading */}
        <Reveal as="p" className="text-xs font-mono uppercase tracking-[0.3em] text-mute">Robot Autonomous Manipulation</Reveal>
        <Reveal as="h2" delay={1} className="mt-4 max-w-3xl font-black tracking-tight leading-[1.2] text-[clamp(1.5rem,4vw,2.75rem)] text-ink">
          From Human Demonstrations to Robot Actions
        </Reveal>
        <Reveal delay={2} className="mt-5">
          <p className="max-w-2xl text-base leading-relaxed text-ink/70">
            Human motion and interaction data provide a scalable foundation for learning how robots perceive, understand, and perform real-world manipulation tasks.
          </p>
        </Reveal>

        {/* core flow */}
        <div className="relative mt-16 md:mt-24">
          {/* desktop horizontal track */}
          <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-8 hidden h-[2px] rounded-full bg-gradient-to-r from-brand/0 via-brand/50 to-brand/0 md:block">
            <FlowDotX delay={0} />
            <FlowDotX delay={1} />
            <FlowDotX delay={2} />
          </div>
          {/* mobile vertical track */}
          <div className="pointer-events-none absolute bottom-10 left-1/2 top-10 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-brand/0 via-brand/50 to-brand/0 md:hidden">
            <FlowDotY delay={0} />
            <FlowDotY delay={1} />
            <FlowDotY delay={2} />
          </div>

          <div className="relative flex flex-col gap-14 md:grid md:grid-cols-4 md:gap-x-6">
            {STAGES.map((s) => (
              <div key={s.id} className="relative flex flex-col items-center text-center">
                <span className="mb-3 text-xs font-mono text-brand">{s.id}</span>
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-brand/30 bg-white text-brand shadow-[0_4px_22px_rgba(90,156,252,0.14)]">
                  {s.icon}
                </div>
                <h3 className="mt-5 text-base font-semibold text-ink">{s.label}</h3>
                <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-mute">{s.caption}</p>
                <div className="mt-5 w-full">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* task example */}
        <div className="mt-24 md:mt-32">
          <Reveal as="h3" className="font-black tracking-tight text-[clamp(1.25rem,3vw,2rem)] text-ink">Learning from Human Tasks</Reveal>
          <Reveal delay={1} className="mt-3">
            <p className="max-w-xl text-sm leading-relaxed text-ink/70">
              A representative task: <span className="font-medium text-ink">Folding Clothes</span>. The same manipulation, demonstrated by a human and reproduced by a robot through learned skills.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
            <TaskPanel title="Human Demonstration" icon={<HumanFold />} />
            {/* desktop connector */}
            <div className="hidden flex-col items-center gap-2 px-2 md:flex">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand">HumanPlus</span>
              <div className="relative h-[2px] w-16 rounded-full bg-gradient-to-r from-brand/0 via-brand to-brand/0">
                <FlowDotX delay={0} />
              </div>
              <span className="text-brand"><ArrowRight /></span>
            </div>
            {/* mobile connector */}
            <div className="flex flex-col items-center gap-2 py-1 md:hidden">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand">HumanPlus</span>
              <div className="relative h-10 w-[2px] rounded-full bg-gradient-to-b from-brand/0 via-brand to-brand/0">
                <FlowDotY delay={0} />
              </div>
              <span className="text-brand"><ArrowDown /></span>
            </div>
            <TaskPanel title="Robot Autonomous Execution" icon={<RobotFold />} />
          </div>

          {/* observe → capture → learn → act */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
            {['Observe', 'Capture', 'Learn', 'Act'].map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <span className="flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-medium text-ink">
                  <span className="font-mono text-brand">{String(i + 1).padStart(2, '0')}</span>
                  {step}
                </span>
                {i < 3 && <span className="text-brand"><ArrowRight /></span>}
              </div>
            ))}
          </div>
        </div>

        {/* summary */}
        <div className="mt-24 border-t border-line pt-12 text-center">
          <Reveal as="p" className="mx-auto max-w-3xl text-[clamp(1.25rem,3vw,2rem)] font-semibold leading-snug text-ink">
            From observing human behavior to learning reusable robotic skills.
          </Reveal>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-mute">
            HumanPlus provides scalable multimodal human data for learning embodied behaviors in the physical world.
          </p>
        </div>
      </div>
    </section>
  )
}
