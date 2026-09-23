import { useEffect, useRef } from 'react'
import Reveal from '../ui/Reveal'

/* ── Robotics ────────────────────────────────────────────────────
   White section (same as every other home module). A black uppercase
   slogan sits ABOVE a full-bleed background video — the slogan is
   never overlaid on the clip, and the clip stays 100% opaque at full
   brightness (no veil, no brightness mask). */

const VIDEO_SRC = 'videos/robotics/robotics-laundry.mp4'

/**
 * Autoplaying background clip — same contract as the HumanPlus-1000
 * demo clips:
 *  - muted + loop + playsInline, no controls: browsers only allow
 *    gesture-free playback while muted.
 *  - `muted` is asserted in the effect too, because some browsers drop
 *    React's `muted` prop on first mount and freeze the clip on frame 1.
 *  - IntersectionObserver (threshold 0.25) plays on enter and pauses on
 *    leave, and `preload="none"` keeps it off the network until then.
 */
function BackgroundVideo({ src }) {
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
      muted
      loop
      playsInline
      preload="none"
      tabIndex={-1}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover select-none outline-none focus:outline-none"
    />
  )
}

export default function RoboticsSection() {
  return (
    <section className="relative bg-white">
      {/* Slogan sits ABOVE the video (never overlaid). Generous vertical
          breathing room separates the copy from the clip below. */}
      <div className="mx-auto w-full max-w-7xl px-6 pt-[85px] pb-[48px] md:pt-[107px] md:pb-[72px] lg:px-10">
        <Reveal
          as="h2"
          className="font-black leading-[1.1] tracking-tight whitespace-nowrap text-[clamp(1rem,3.4vw,2.75rem)] text-ink uppercase"
        >
          From Human Behavior to Robotic Action
        </Reveal>
      </div>

      {/* Full-bleed, 100% opaque clip — full brightness, no veil. */}
      <div className="relative h-[60vh] w-full overflow-hidden md:h-[78vh]">
        <BackgroundVideo src={VIDEO_SRC} />
      </div>
    </section>
  )
}
