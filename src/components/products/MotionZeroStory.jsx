import { useEffect, useRef } from 'react'
import Reveal from '../ui/Reveal'
import useReveal from '../../hooks/useReveal'
import useParallax from '../../hooks/useParallax'
import { toHref } from '../../hooks/useHashRoute'

const IMG = 'images/motion-0'
const VID = 'videos/motion-0'

/* ── Story video ──────────────────────────────────────────────────
   Same contract as the Robotics background clip: muted + loop +
   playsInline, IntersectionObserver plays on enter / pauses on leave
   so nothing burns cycles off-screen. */
function StoryVideo({ src, className = '', poster }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true

    const play = () => {
      const played = video.play()
      if (played && typeof played.catch === 'function') played.catch(() => {})
    }

    if (typeof IntersectionObserver === 'undefined') {
      play()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play()
        else video.pause()
      },
      { threshold: 0.25 }
    )
    observer.observe(video)

    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      tabIndex={-1}
      aria-hidden="true"
      className={`select-none outline-none focus:outline-none ${className}`}
    />
  )
}

/* Data labels that drift in and out over footage — never permanent. */
function DataLabels({ labels }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {labels.map((l) => (
        <span
          key={l.text}
          className="m0-label absolute"
          style={{ top: l.top, left: l.left, '--d': `${l.delay}s` }}
        >
          {l.text}
        </span>
      ))}
    </div>
  )
}

/* Section shell — kicker + headline, editorial rhythm. */
function SectionHead({ index, kicker, children, className = '' }) {
  return (
    <div className={className}>
      <Reveal className="m0-kicker">{index} — {kicker}</Reveal>
      <Reveal as="h2" delay={1} className="mt-6 font-bold leading-[1.08] tracking-tight text-white text-[clamp(1.9rem,4vw,3.5rem)]">
        {children}
      </Reveal>
    </div>
  )
}

/* ── S02 — 11 IMUs ────────────────────────────────────────────────
   One spatial garment visual: sensor nodes pop in staggered, hairline
   links draw between them, then the number lands. Not a card grid. */

const IMU_NODES = [
  { x: 26.5, y: 21 },  // collar / back-neck
  { x: 15.5, y: 26 },  // L shoulder
  { x: 37.5, y: 26 },  // R shoulder
  { x: 26.5, y: 40 },  // chest
  { x: 8.5, y: 47 },   // L elbow
  { x: 44.5, y: 47 },  // R elbow
  { x: 5, y: 66 },     // L wrist
  { x: 48, y: 66 },    // R wrist
  { x: 17, y: 60 },    // L waist
  { x: 36, y: 60 },    // R waist
  { x: 26.5, y: 78 },  // front hem
]

const IMU_LINKS = [
  [0, 3, 0.55], [3, 10, 0.7],          // spine
  [1, 4, 0.6], [4, 6, 0.75],           // L arm
  [2, 5, 0.65], [5, 7, 0.8],           // R arm
  [3, 8, 0.85], [3, 9, 0.9],           // waist
  [1, 2, 0.5],                         // shoulder line
]

function ImuSection() {
  const [ref, inView] = useReveal()

  return (
    <section className="bg-black py-28 md:py-40">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <SectionHead index="02" kicker="Sensing" className="max-w-2xl">
          11 IMUs. One complete body.
        </SectionHead>

        <div ref={ref} className={`relative mx-auto mt-16 w-full max-w-3xl md:mt-24 ${inView ? 'in' : ''}`}>
          <img
            src="images/products/motion-0.png"
            alt="Motion-0 garment with 11 IMU sensor positions"
            className="w-full select-none object-contain"
            style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))' }}
          />

          {/* Sensor links — drawn behind the nodes */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {IMU_LINKS.map(([a, b, d], i) => (
              <line
                key={i}
                x1={IMU_NODES[a].x}
                y1={IMU_NODES[a].y}
                x2={IMU_NODES[b].x}
                y2={IMU_NODES[b].y}
                pathLength="1"
                className="m0-link"
                style={{ '--d': `${d}s`, stroke: 'rgb(90 156 252 / 0.4)', strokeWidth: 0.12 }}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          {/* Nodes pop in staggered */}
          {IMU_NODES.map((n, i) => (
            <span
              key={i}
              className="m0-node"
              style={{ left: `${n.x}%`, top: `${n.y}%`, '--d': `${0.12 + i * 0.14}s` }}
            />
          ))}
        </div>

        <div className="mt-16 text-center md:mt-24">
          <Reveal className="font-bold leading-none tracking-tight text-brand text-[clamp(5rem,14vw,11rem)]">11</Reveal>
          <Reveal delay={1} className="mt-2 text-sm font-semibold uppercase tracking-[0.4em] text-white">IMUs</Reveal>
          <Reveal delay={2} className="mx-auto mt-8 max-w-xl">
            <p className="text-sm leading-[1.9] text-white/45 md:text-base">
              Distributed across the garment to capture full-body movement through synchronized inertial sensing.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ── S04 — high-precision: real action + hairline skeleton overlay ── */

const SKELETON_JOINTS = [
  { x: 60, y: 13 }, { x: 60, y: 22 },              // head, neck
  { x: 52, y: 28 }, { x: 68, y: 28 },              // shoulders
  { x: 47, y: 17 }, { x: 75, y: 17 },              // elbows
  { x: 44, y: 9 }, { x: 80, y: 9 },                // wrists
  { x: 54, y: 55 }, { x: 67, y: 55 },              // hips
  { x: 55, y: 74 }, { x: 66, y: 74 },              // knees
  { x: 56, y: 91 }, { x: 65, y: 91 },              // ankles
]

const SKELETON_BONES = [
  [1, 2], [1, 3], [2, 4], [4, 6], [3, 5], [5, 7],
  [1, 8], [8, 9], [8, 10], [9, 11], [10, 12], [11, 13], [12, 14],
]

function PrecisionSection() {
  return (
    <section className="bg-black py-28 md:py-40">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="grid items-end gap-12 lg:grid-cols-[5fr_4fr] lg:gap-20">
          <SectionHead index="04" kicker="Fidelity">
            High-precision motion capture
          </SectionHead>
          <Reveal delay={2}>
            <p className="max-w-md text-sm leading-[1.9] text-white/45 md:text-base">
              Capture detailed full-body movement with high-fidelity inertial sensing.
            </p>
            <p className="m0-kicker mt-6" style={{ color: 'rgb(255 255 255 / 0.3)' }}>
              Formal benchmarks in progress — metrics published with test protocol
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:mt-24 md:grid-cols-[3fr_2fr] md:gap-10">
          <Reveal className="relative overflow-hidden">
            <img src={`${IMG}/activity-cooking.jpg`} alt="Wearing Motion-0 while cooking" className="h-full w-full object-cover" />
          </Reveal>

          <div className="relative overflow-hidden">
            <div ref={useParallax(-0.05)}>
              <img src={`${IMG}/activity-reach.jpg`} alt="Reaching naturally while Motion-0 captures movement" className="w-full select-none object-cover" />
            </div>
            {/* Hairline skeleton — the captured body as data */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {SKELETON_BONES.map(([a, b], i) => (
                  <line
                    key={i}
                    x1={SKELETON_JOINTS[a].x}
                    y1={SKELETON_JOINTS[a].y}
                    x2={SKELETON_JOINTS[b].x}
                    y2={SKELETON_JOINTS[b].y}
                    style={{ stroke: 'rgb(90 156 252 / 0.55)', strokeWidth: 1 }}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>
              {SKELETON_JOINTS.map((j, i) => (
                <span key={i} className="m0-joint" style={{ left: `${j.x}%`, top: `${j.y}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── The story stack — everything AFTER the hero. The hero itself is
   frozen: this component must never wrap or restyle it. ────────── */

export default function MotionZeroStory() {
  const parallaxRef = useParallax(0.06)

  return (
    <div className="bg-black text-white">
      {/* ── 01 · REAL-WORLD MOTION ─────────────────────────────── */}
      <section className="bg-black pb-28 pt-24 md:pb-40 md:pt-32">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <SectionHead index="01" kicker="Real-world motion" className="max-w-3xl">
            Motion, captured.
          </SectionHead>

          <div className="mt-16 grid items-center gap-12 md:mt-24 lg:grid-cols-[6fr_4fr] lg:gap-20">
            <Reveal>
              <p className="max-w-xl text-lg leading-[1.8] text-white/70 md:text-xl">
                Motion-0 is worn where life actually happens — kitchens, laundries, workshops. No lab, no stage, no T-pose. Just people doing what people do, captured as data.
              </p>
              <p className="m0-kicker mt-10">Cooking · Cleaning · Reaching · Living</p>
            </Reveal>

            <Reveal delay={1} className="relative">
              <div className="m0-video-fade relative overflow-hidden">
                <StoryVideo
                  src={`${VID}/kitchen-real.mp4`}
                  poster={`${IMG}/kitchen-wide.jpg`}
                  className="mx-auto max-h-[78vh] w-full object-cover"
                />
                <DataLabels
                  labels={[
                    { text: 'FULL-BODY MOTION', top: '12%', left: '8%', delay: 0 },
                    { text: 'REAL-WORLD CAPTURE', top: '46%', left: '48%', delay: 3 },
                    { text: 'MOTION DATA', top: '76%', left: '12%', delay: 6 },
                  ]}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 02 · 11 IMUs ───────────────────────────────────────── */}
      <ImuSection />

      {/* ── 03 · FROM HUMAN MOTION TO DIGITAL MOTION ───────────── */}
      <section className="bg-black py-28 md:py-40">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <SectionHead index="03" kicker="Data">
            From human motion
            <br />
            <span className="text-brand">to digital motion</span>
          </SectionHead>

          {/* Transformation stages — inline text, not cards */}
          <Reveal delay={2} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            {['Real world', 'Data', 'Digital body'].map((s, i) => (
              <span key={s} className="flex items-center gap-6">
                {i > 0 && <span aria-hidden="true" className="h-px w-10 bg-brand/40 md:w-16" />}
                <span className="m0-kicker" style={i === 2 ? undefined : { color: 'rgb(255 255 255 / 0.4)' }}>{s}</span>
              </span>
            ))}
          </Reveal>
        </div>

        <Reveal delay={1} className="m0-video-fade relative mt-14 md:mt-20">
          <StoryVideo src={`${VID}/digital-motion.mp4`} className="max-h-[82vh] w-full object-cover" />
          <div className="pointer-events-none absolute bottom-8 left-6 right-6 md:bottom-14 md:left-10">
            <p className="max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              Human movement becomes <span className="text-brand">structured digital motion</span>.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── 04 · HIGH-PRECISION MOTION CAPTURE ─────────────────── */}
      <PrecisionSection />

      {/* ── 05 · 10+ HOURS ─────────────────────────────────────── */}
      <section className="bg-black py-28 md:py-40">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 lg:grid-cols-[7fr_4fr] lg:gap-10 lg:px-10">
          <div>
            <Reveal className="m0-kicker">05 — Endurance</Reveal>
            <Reveal delay={1} className="mt-8 font-bold leading-[0.9] tracking-tight text-brand text-[clamp(6rem,17vw,13rem)]">
              10+
            </Reveal>
            <Reveal delay={2} className="mt-6 text-lg font-semibold uppercase tracking-[0.25em] text-white md:text-2xl">
              Hours of continuous capture
            </Reveal>
            <Reveal delay={3} className="mt-8 max-w-md">
              <p className="text-sm leading-[1.9] text-white/45 md:text-base">
                Designed for extended data collection sessions with 10+ hours of battery life.
              </p>
            </Reveal>
          </div>

          <Reveal delay={2} className="relative lg:justify-self-end">
            <div ref={parallaxRef}>
              <img
                src={`${IMG}/garment-worn.jpg`}
                alt="Motion-0 worn — front and back"
                className="w-full max-w-[340px] select-none object-cover lg:max-w-[380px]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 06 · WEAR. CAPTURE. WASH. REPEAT. ──────────────────── */}
      <section className="bg-black py-28 md:py-40">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 lg:grid-cols-[5fr_6fr] lg:gap-20 lg:px-10">
          <div>
            <Reveal className="m0-kicker">06 — Daily use</Reveal>
            <div className="mt-10 space-y-2">
              {['Wear.', 'Capture.', 'Wash.', 'Repeat.'].map((w, i) => (
                <Reveal key={w} delay={i} className="font-bold leading-[1.15] tracking-tight text-[clamp(2rem,4.5vw,3.75rem)]" >
                  <span className={i === 2 ? 'text-brand' : 'text-white'}>{w}</span>
                </Reveal>
              ))}
            </div>
            <Reveal delay={4} className="mt-10 max-w-md">
              <p className="text-sm leading-[1.9] text-white/45 md:text-base">
                Designed for repeated use in real-world data collection.
              </p>
            </Reveal>
          </div>

          <Reveal delay={1} className="relative">
            <div className="m0-video-fade relative overflow-hidden">
              <img src={`${IMG}/activity-laundry.jpg`} alt="Everyday activity while wearing Motion-0" className="max-h-[80vh] w-full select-none object-cover object-top" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 07 · DESIGNED FOR NATURAL MOVEMENT ─────────────────── */}
      <section className="bg-black py-28 md:py-40">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid items-end gap-12 lg:grid-cols-[6fr_5fr] lg:gap-20">
            <SectionHead index="07" kicker="Natural movement">
              Designed for natural movement
            </SectionHead>
            <Reveal delay={2}>
              <p className="text-lg leading-[1.8] text-white/70 md:text-xl">
                Move naturally.
                <br />
                Capture continuously.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                {['NATURAL MOVEMENT', 'REAL ENVIRONMENT', 'LONG-TERM CAPTURE'].map((t) => (
                  <span key={t} className="m0-kicker">{t}</span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={1} className="m0-video-fade relative mt-16 overflow-hidden md:mt-24">
            <img src={`${IMG}/activity-cooking.jpg`} alt="Cooking while wearing Motion-0" className="max-h-[85vh] w-full select-none object-cover" />
          </Reveal>
        </div>
      </section>

      {/* ── 08 · BUILT FOR THE REAL WORLD ──────────────────────── */}
      <section className="relative bg-black">
        <div className="m0-video-fade relative">
          <img src={`${IMG}/kitchen-wide.jpg`} alt="Two people wearing Motion-0 while cooking in a real kitchen" className="h-[70vh] w-full select-none object-cover md:h-[88vh]" />
          <DataLabels
            labels={[
              { text: 'REAL ENVIRONMENT', top: '22%', left: '7%', delay: 0 },
              { text: 'NATURAL INTERACTION', top: '55%', left: '58%', delay: 3 },
              { text: 'CONTINUOUS CAPTURE', top: '34%', left: '38%', delay: 6 },
            ]}
          />
          <div className="pointer-events-none absolute bottom-10 left-6 right-6 md:bottom-16 md:left-10">
            <Reveal as="h2" className="font-bold leading-[1.1] tracking-tight text-white text-[clamp(1.6rem,3.4vw,3rem)]">
              Built for the real world.
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 09 · ENGINEERED FOR MOTION ─────────────────────────── */}
      <section className="bg-black py-28 md:py-40">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-16 px-6 lg:grid-cols-[7fr_4fr] lg:gap-12 lg:px-10">
          <Reveal className="relative">
            <img
              src="images/products/motion-0.png"
              alt="Motion-0 garment — industrial design"
              className="w-full select-none object-contain"
              style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))' }}
            />
            {/* Thin callout hairlines — two only, no engineering-drawing UI */}
            <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
              <span className="absolute left-[15%] top-[24%] h-px w-16" style={{ background: 'rgb(90 156 252 / 0.5)' }} />
              <span className="m0-kicker absolute left-[4%] top-[22.6%]">IMU NODES</span>
              <span className="absolute left-[44%] top-[62%] h-px w-14" style={{ background: 'rgb(90 156 252 / 0.5)' }} />
              <span className="m0-kicker absolute left-[52%] top-[60.6%]">BATTERY POCKET</span>
            </div>
          </Reveal>

          <div>
            <Reveal className="m0-kicker">08 — Industrial design</Reveal>
            <Reveal as="h2" delay={1} className="mt-6 font-bold leading-[1.08] tracking-tight text-white text-[clamp(1.9rem,4vw,3.5rem)]">
              Engineered
              <br />
              for motion.
            </Reveal>
            <Reveal delay={2} className="mt-8 max-w-sm">
              <p className="text-sm leading-[1.9] text-white/45 md:text-base">
                Sensors, wiring and battery disappear into the garment — Motion-0 reads as clothing first, hardware second.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 10 · TECHNICAL SPECIFICATIONS ──────────────────────── */}
      <section className="bg-black py-28 md:py-36">
        <div className="mx-auto w-full max-w-4xl px-6 lg:px-10">
          <Reveal as="h2" className="text-center font-bold tracking-tight text-white text-[clamp(1.5rem,3vw,2.5rem)]">
            TECHNICAL SPECIFICATIONS
          </Reveal>

          <div className="mt-14 md:mt-20">
            {[
              ['Motion Sensing', '11 × IMU'],
              ['Battery Life', '10+ Hours'],
              ['Form Factor', 'Wearable Garment'],
              ['Washability', 'Washable'],
              ['Motion Capture', 'Full-Body Motion'],
            ].map(([k, v], i) => (
              <Reveal key={k} delay={Math.min(i, 3)} className="m0-spec-row">
                <span className="m0-kicker" style={{ color: 'rgb(255 255 255 / 0.35)' }}>{k}</span>
                <span className="text-right text-base font-medium text-white md:text-lg">{v}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11 · BACK TO HUMANPLUS ─────────────────────────────── */}
      <section className="bg-black pb-32 pt-20 text-center md:pb-44">
        <div className="mx-auto w-full max-w-4xl px-6">
          <Reveal as="h2" className="font-bold leading-[1.12] tracking-tight text-white text-[clamp(1.8rem,3.8vw,3.25rem)]">
            From human motion
            <br />
            <span className="text-brand">to embodied intelligence.</span>
          </Reveal>
          <Reveal delay={1} className="mx-auto mt-8 max-w-xl">
            <p className="text-sm leading-[1.9] text-white/50 md:text-base">
              Motion-0 captures the movement.
              <br />
              HumanPlus turns it into intelligence.
            </p>
          </Reveal>
          <Reveal delay={2} className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <a
              href={toHref('/')}
              className="group inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300"
              style={{ backgroundColor: 'rgb(90 156 252 / 0.92)', boxShadow: '0 0 28px -10px rgb(90 156 252 / 0.8)' }}
            >
              Explore HumanPlus-1000
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-[3px]">→</span>
            </a>
            <a
              href={toHref('/research')}
              className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-brand hover:text-brand"
            >
              Explore Robotics
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-[3px]">→</span>
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
