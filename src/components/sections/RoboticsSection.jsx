import { useEffect, useRef } from 'react'

/* ── Robotics ────────────────────────────────────────────────────
   A single full-screen (100vh) immersive video band. No heading, no
   copy, no veil — just the full-bleed clip at 100% opacity / full
   brightness. It snaps as its own viewport in the
   Hero ⇄ About ⇄ Products ⇄ Robotics hand-off (see useSectionSnap). */

const VIDEO_SRC = 'videos/robotics/kitchen-v3.mp4'

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
          fills the whole viewport (immersive). No heading above. */}
      <BackgroundVideo src={VIDEO_SRC} />
    </section>
  )
}
