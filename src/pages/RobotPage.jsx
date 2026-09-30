import { useEffect, useRef, useState } from 'react'
import Reveal from '../components/ui/Reveal'

/* Stable element ids for the Robot page scroll controller. */
const HERO_ID = 'robot-hero'
const VIDEO_ID = 'robot-videos'

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

/**
 * Robot — standalone route (/#/robot), NOT a home-section.
 *
 * Structure:
 *   1. Hero  — robot.png centred on a pure-white canvas, brand tagline above.
 *   2. Human → Robot video stage — ONE 100vh section holding two stacked
 *      full-bleed videos (human soccer, then robot soccer). The two are NOT
 *      separate scroll sections: they are two visual states of the same
 *      pinned stage, switched by a dedicated wheel controller:
 *        • enter from Hero (down)        → Human state
 *        • within stage, scroll down     → Human → Robot (crossfade, no scroll)
 *        • within stage, scroll up       → Robot → Human (crossfade, no scroll)
 *        • at Human state, scroll up     → leave stage back to Hero
 *        • at Robot state, scroll down   → hand off to the content below
 *      This guarantees no jarring jump when scrolling back up from Robot.
 *   3. (future content) — room left below for additional sections.
 */
export default function RobotPage() {
  const heroImg = import.meta.env.BASE_URL + 'images/robot/robot.png'
  const humanVideo = import.meta.env.BASE_URL + 'videos/robot/human-soccer.mp4'
  const robotVideo = import.meta.env.BASE_URL + 'videos/robot/robot-soccer.mp4'

  // 'human' | 'robot' — which footage the pinned stage shows.
  const [phase, setPhase] = useState('human')
  const phaseRef = useRef(phase)
  phaseRef.current = phase
  const animatingRef = useRef(false)

  // Dedicated full-screen scroll controller for this page.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const DUR = reduce ? 0 : 1000

    const heroEl = document.getElementById(HERO_ID)
    const videoEl = document.getElementById(VIDEO_ID)
    if (!heroEl || !videoEl) return

    const animateTo = (targetY) => {
      if (DUR === 0) {
        window.scrollTo(0, targetY)
        animatingRef.current = false
        return
      }
      animatingRef.current = true
      const startY = window.scrollY
      const delta = targetY - startY
      const t0 = performance.now()
      const step = (now) => {
        const t = Math.min((now - t0) / DUR, 1)
        window.scrollTo(0, startY + delta * easeInOutCubic(t))
        if (t < 1) requestAnimationFrame(step)
        else animatingRef.current = false
      }
      requestAnimationFrame(step)
    }

    const onWheel = (e) => {
      // Lock input while a scroll animation is mid-flight.
      if (animatingRef.current) {
        e.preventDefault()
        return
      }
      if (Math.abs(e.deltaY) < 2) return

      const y = window.scrollY
      const videoTop = videoEl.getBoundingClientRect().top + window.scrollY
      const heroTop = heroEl.getBoundingClientRect().top + window.scrollY

      const goingDown = e.deltaY > 0
      // The video stage is exactly 100vh — "in" it means scrollY sits on its
      // top edge. Anything below its top edge is the content beneath.
      const atVideo = y >= videoTop - 4 && y < videoTop + 4
      const atHero = y < videoTop - 4

      if (atVideo) {
        const ph = phaseRef.current
        if (goingDown) {
          if (ph === 'human') {
            // Human → Robot: crossfade in place, no scroll.
            e.preventDefault()
            setPhase('robot')
          }
          // phase 'robot' going down → let native scroll into content below.
        } else {
          if (ph === 'robot') {
            // Robot → Human: crossfade back in place, no scroll.
            e.preventDefault()
            setPhase('human')
          } else {
            // Human + scroll up → leave the stage, return to Hero.
            e.preventDefault()
            setPhase('human')
            animateTo(heroTop)
          }
        }
      } else if (atHero) {
        if (goingDown) {
          // Enter the video stage at the Human state.
          e.preventDefault()
          setPhase('human')
          animateTo(videoTop)
        }
        // At the very top → native scroll (nothing above).
      }
      // Below the video stage → plain native scrolling.
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])

  const humanActive = phase === 'human'
  const crossfade = 'opacity 900ms cubic-bezier(0.4,0,0.2,1)'

  return (
    <>
      {/* ── 1. Hero ── */}
      <section
        id={HERO_ID}
        className="relative min-h-screen w-full overflow-hidden bg-white pt-16"
      >
        {/* Very faint brand bloom — future-facing, never competes with the visual */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(62% 52% at 50% 36%, rgba(90,156,252,0.08) 0%, rgba(90,156,252,0) 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl flex-col items-center justify-center px-6 pb-12 text-center lg:px-10">
          {/* Brand tagline — display face (default sans-serif), large one-line headline in soft #333 */}
          <Reveal
            as="p"
            delay={1}
            className="max-w-full font-display font-normal leading-[1.12] tracking-[0.06em] text-[#333333] whitespace-nowrap text-[clamp(1.5rem,4.6vw,3rem)]"
          >
            Capturing Humans, Empowering Robots
          </Reveal>

          {/* Core visual — centred, original ratio, never cropped / stretched / distorted */}
          <Reveal delay={2} className="mt-8 flex w-full justify-center md:mt-12">
            <img
              src={heroImg}
              alt="A robot and a human reach toward each other — the human wears HumanPlus smart apparel and gloves, symbolising the link between human motion capture and robotic intelligence."
              className="h-auto w-auto max-w-full object-contain drop-shadow-[0_24px_60px_rgba(17,17,17,0.10)]"
              style={{ maxHeight: 'min(52vh, 560px)' }}
            />
          </Reveal>
        </div>
      </section>

      {/* ── 2. Human → Robot video stage (single 100vh section, internal states) ── */}
      <section
        id={VIDEO_ID}
        className="relative w-full bg-white"
        aria-label="Human behavior to robotic action"
      >
        {/* Pinned full-bleed stage — both videos share the exact same frame. */}
        <div className="relative h-screen w-full overflow-hidden bg-white">
          <video
            src={humanVideo}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{
              opacity: humanActive ? 1 : 0,
              transition: crossfade,
              willChange: 'opacity',
            }}
          />
          <video
            src={robotVideo}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{
              opacity: humanActive ? 0 : 1,
              transition: crossfade,
              willChange: 'opacity',
            }}
          />
        </div>
      </section>

      {/* ── 3. Future Robot content (placeholder) ── */}
      <section className="flex min-h-screen w-full items-center justify-center bg-white px-6 text-center">
        <p className="max-w-md text-sm leading-relaxed text-ink/35">
          More Robot capabilities — data capture, learning, and deployment — coming soon.
        </p>
      </section>
    </>
  )
}
