import DeferredVideo from '../ui/DeferredVideo'
import { useEffect, useRef, useState } from 'react'

/* A single labelled demo video.
   - Uniform 16:9 frame + rounded corners; object-contain keeps the native
     ratio (no stretch / crop) — bars blend into the frame background.
   - `tone` flips the frame styling for the dark Robot Operation panel so the
     video stays legible on black instead of washing out.
   - Muted is forced via ref: React doesn't reliably reflect the JSX `muted`
     attribute onto the live DOM <video>, so we set the property directly.
     This keeps autoplay / loop silent WITHOUT touching any other page's videos. */
function VideoTile({ src, label, tone = 'light', enabled }) {
  const videoRef = useRef(null)
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = true
  }, [])
  const frame =
    tone === 'dark'
      ? 'bg-white/5 ring-1 ring-white/15'
      : 'bg-panel ring-1 ring-line'
  const caption = tone === 'dark' ? 'text-white/55' : 'text-mute'
  return (
    <figure className="group">
      <div className={`relative aspect-video overflow-hidden rounded-2xl transition-all duration-300 ${frame} group-hover:ring-brand/40 group-hover:shadow-[0_10px_40px_rgba(90,156,252,0.12)]`}>
        <DeferredVideo
          enabled={enabled}
          ref={videoRef}
          src={src}
          className="h-full w-full object-contain"
          controls
          muted
          preload="metadata"
          playsInline
        />
      </div>
      <figcaption className={`mt-3 text-center text-xs font-mono uppercase tracking-[0.18em] ${caption}`}>
        {label}
      </figcaption>
    </figure>
  )
}

/* Human Demonstration uses the first two demo clips; Robot Operation uses the
   last two. Both sets stay muted; the first Human clip keeps the
   落地-人类踢足球.mp4 source from the earlier round. No clips are re-ordered. */
const HUMAN_CLIPS = [
  { src: 'videos/demo/落地-人类踢足球.mp4', label: 'Human Demonstration' },
  { src: 'videos/demo/human-manipulation.mp4', label: 'Human Manipulation' },
]
const ROBOT_CLIPS = [
  { src: 'videos/demo/robot-action.mp4', label: 'Robot Action' },
  { src: 'videos/demo/robot-manipulation.mp4', label: 'Robot Manipulation' },
]

export default function ApplicationDemoSection() {
  /* Two full-screen views stacked with `absolute inset-0`. Switching only
     toggles opacity — there is NO scroll, NO scroll-snap, NO translateY slide.
     The wheel/touch handlers act purely as a state trigger: they preventDefault
     so the browser never actually scrolls, and only flip `active`. */
  const [active, setActive] = useState('human')
  const activeRef = useRef('human')
  const lock = useRef(false)
  const rootRef = useRef(null)

  useEffect(() => {
    const switchTo = (next) => {
      if (activeRef.current === next || lock.current) return
      activeRef.current = next
      setActive(next)
      // brief cooldown so one gesture = one switch, not a rapid fire
      lock.current = true
      setTimeout(() => {
        lock.current = false
      }, 600)
    }

    const root = rootRef.current
    const onWheel = (e) => {
      e.preventDefault()
      if (lock.current) return
      if (e.deltaY > 0) switchTo('robot')
      else if (e.deltaY < 0) switchTo('human')
    }
    // touch: swipe up -> robot, swipe down -> human (passive, no preventDefault
    // so video controls stay usable on mobile)
    let touchStartY = 0
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }
    const onTouchEnd = (e) => {
      const dy = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(dy) < 40) return
      if (dy > 0) switchTo('robot')
      else switchTo('human')
    }

    root.addEventListener('wheel', onWheel, { passive: false })
    root.addEventListener('touchstart', onTouchStart, { passive: true })
    root.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      root.removeEventListener('wheel', onWheel)
      root.removeEventListener('touchstart', onTouchStart)
      root.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return (
    <div ref={rootRef} className="application-page relative h-screen w-full overflow-hidden bg-white">
      {/* ── View 1 · Human Demonstration — white ground / black text ── */}
      <section
        className={`absolute inset-0 flex flex-col justify-center bg-white px-6 pb-16 pt-24 transition-opacity duration-200 lg:px-10 ${
          active === 'human' ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="mx-auto w-full max-w-7xl">
          <h3 className="font-black tracking-tight text-[clamp(1.6rem,4vw,2.5rem)] text-ink">
            Human Demonstration
          </h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink/70">
            Capturing natural human behaviors and manipulation skills in the real world.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            {HUMAN_CLIPS.map((d) => (
              <VideoTile key={d.src} src={d.src} label={d.label} tone="light" enabled={active === 'human'} />
            ))}
          </div>
        </div>
      </section>

      {/* ── View 2 · Robot Operation — black ground / white text ── */}
      <section
        className={`absolute inset-0 flex flex-col justify-center bg-black px-6 pb-16 pt-24 transition-opacity duration-200 lg:px-10 ${
          active === 'robot' ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="mx-auto w-full max-w-7xl">
          <h3 className="font-black tracking-tight text-[clamp(1.6rem,4vw,2.5rem)] text-white">
            Robot Operation
          </h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
            Translating human demonstrations into physical robotic actions.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            {ROBOT_CLIPS.map((d) => (
              <VideoTile key={d.src} src={d.src} label={d.label} tone="dark" enabled={active === 'robot'} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
