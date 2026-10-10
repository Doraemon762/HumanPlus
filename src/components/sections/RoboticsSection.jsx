import { useEffect, useRef } from 'react'

/* ── Robotics ────────────────────────────────────────────────────
   A single full-screen (100vh) immersive video band. No heading, no
   copy, no veil — just the full-bleed clip at 100% opacity / full
   brightness. It snaps as its own viewport in the
   Hero ⇄ Robotics ⇄ Products ⇄ Research hand-off (see useSectionSnap). */

const VIDEO_SRC = 'videos/robotics/kitchen-v3.mp4'

/**
 * Autoplaying background clip — same contract as the HumanPlus-1000
 * demo clips:
 *  - muted + loop + playsInline, no controls: browsers only allow
 *    gesture-free playback while muted.
 *  - `muted` is asserted in the effect too, because some browsers drop
 *    React's `muted` prop on first mount and freeze the clip on frame 1.
 *  - IntersectionObserver plays on enter and pauses on leave. The browser
 *    initially fetches only metadata; once the critical Hero has had a
 *    moment to start, an idle warm-up changes preload to `auto`. This keeps
 *    the second screen from competing with the Hero on first paint while
 *    avoiding a cold video request when the user scrolls down.
 *  - `poster` paints the first frame instantly so there is never a black /
 *    blank gap while the clip buffers.
 */
function BackgroundVideo({ src, poster }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true

    let warmupTimer
    const warmUp = () => {
      if (video.preload === 'auto') return
      video.preload = 'auto'
      video.load()
    }

    warmupTimer = window.setTimeout(warmUp, 900)

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
        if (entry.isIntersecting) {
          warmUp()
          play()
        }
        else video.pause()
      },
      { threshold: 0.25 }
    )
    observer.observe(video)

    return () => {
      observer.disconnect()
      if (warmupTimer) window.clearTimeout(warmupTimer)
    }
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
      className="absolute inset-0 h-full w-full bg-white object-cover select-none outline-none focus:outline-none"
    />
  )
}

export default function RoboticsSection() {
  return (
    <section
      id="robotics"
      className="relative h-screen w-full overflow-hidden bg-white"
    >
      {/* Full-bleed, 100% opaque clip — full brightness, no veil,
          fills the whole viewport (immersive). Poster paints the first
          frame instantly so there is no black/blank gap while the
          fast-start H.264 clip buffers. */}
      <BackgroundVideo src={VIDEO_SRC} poster="videos/robotics/kitchen-v3-poster.jpg" />

      {/* Left-aligned editorial headline — reuses the EXACT Hero display
          typography (font-family / size / weight / tracking / line-height /
          pure white) so the two read as one system. Pure white only:
          no text-shadow, no stroke, no gradient, no glow, no blue, no
          transparency. Overlaid on the left of the video; the full-bleed
          clip, its playback logic and the snap-scroll are untouched. */}
      <div className="pointer-events-none absolute left-[clamp(1.5rem,5vw,5rem)] top-1/2 z-10 max-w-[min(92%,760px)] -translate-y-1/2">
        <h2
          className="font-display font-bold leading-[1.28] text-white"
          style={{
            fontSize: 'clamp(1.9rem, 4.4vw, 4rem)',
            letterSpacing: '0.055em',
          }}
        >
          {/* Two authored lines — each phrase is its own block and stays
              on one line at >=md (mirrors Hero's line-1 whitespace-nowrap),
              so the break is explicit and never a random browser wrap. The
              inter-line gap reuses Hero's exact leading via the shared
              line-height + the same mt clamp. Pure white only: no stroke,
              shadow, gradient, glow or blue. */}
          <span className="block md:whitespace-nowrap">Capture Life.</span>
          <span className="mt-[clamp(0.1rem,0.7vh,0.5rem)] block md:whitespace-nowrap">
            Empower Intelligence.
          </span>
        </h2>
      </div>
    </section>
  )
}
