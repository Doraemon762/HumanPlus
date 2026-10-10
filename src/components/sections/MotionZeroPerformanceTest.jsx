import DeferredVideo from '../ui/DeferredVideo'
import { useEffect, useRef, useState } from 'react'
import './MotionZeroPerformanceTest.css'

/* Motion-0 · Performance Test
   A calm, premium split on a pure-white stage:
     left  — the existing performance-test video with a custom, thin,
             seekable progress bar (play / pause / mute kept, browser
             chrome gone)
     right — three black words on white: Fast. / Stable. / Comfortable.
   The video + words sit as one centered group with balanced left/right
   whitespace; nothing reaches the screen edges. No black panel, no
   particles, no cards, no glow. */

const WORDS = ['Fast.', 'Stable.', 'Comfortable.']

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mzpt-ico" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
    </svg>
  )
}
function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mzpt-ico" aria-hidden="true">
      <rect x="7" y="5.5" width="3.4" height="13" rx="1" fill="currentColor" />
      <rect x="13.6" y="5.5" width="3.4" height="13" rx="1" fill="currentColor" />
    </svg>
  )
}
function SoundIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mzpt-ico" aria-hidden="true">
      <path d="M4 9.5h3.2L12 5.4v13.2L7.2 14.5H4z" fill="currentColor" />
      <path
        d="M15.4 9.2a4 4 0 0 1 0 5.6M17.9 6.7a7.4 7.4 0 0 1 0 10.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}
function MutedIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mzpt-ico" aria-hidden="true">
      <path d="M4 9.5h3.2L12 5.4v13.2L7.2 14.5H4z" fill="currentColor" />
      <path
        d="M15.6 9.6l4.6 4.8M20.2 9.6l-4.6 4.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function MotionZeroPerformanceTest() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const barRef = useRef(null)
  const revealed = useRef(false)
  const dragging = useRef(false)
  const [progress, setProgress] = useState(0) // 0..1
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)

  // Reveal once when the module first scrolls into view (video fade + words).
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !revealed.current) {
            revealed.current = true
            el.classList.add('mzpt-revealed')
            io.disconnect()
          }
        })
      },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Keep the progress bar + play state in sync with the real video.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    /* Autoplay is only allowed while muted, and React's `muted` attribute
       never reaches the DOM — the property must be set on the element. */
    v.muted = muted
    const onTime = () => { if (v.duration) setProgress(v.currentTime / v.duration) }
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onEnded = () => setPlaying(false)
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    v.addEventListener('ended', onEnded)
    return () => {
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
      v.removeEventListener('ended', onEnded)
    }
  }, [muted])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play()
    else v.pause()
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  // Seek to an absolute clientX over the bar (pointer + mouse unified).
  const seekToClientX = (clientX) => {
    const v = videoRef.current
    const bar = barRef.current
    if (!v || !bar || !v.duration) return
    const rect = bar.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    v.currentTime = ratio * v.duration
    setProgress(ratio)
  }

  const onBarDown = (e) => {
    dragging.current = true
    seekToClientX(e.clientX)
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* noop */ }
  }
  const onBarMove = (e) => { if (dragging.current) seekToClientX(e.clientX) }
  const onBarUp = () => { dragging.current = false }

  // Keyboard seek on the bar (arrows = ±5%, Home/End = jump).
  const onBarKey = (e) => {
    const v = videoRef.current
    if (!v || !v.duration) return
    if (e.key === 'ArrowRight') { e.preventDefault(); v.currentTime = Math.min(v.duration, v.currentTime + v.duration * 0.05) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); v.currentTime = Math.max(0, v.currentTime - v.duration * 0.05) }
    else if (e.key === 'Home') { e.preventDefault(); v.currentTime = 0 }
    else if (e.key === 'End') { e.preventDefault(); v.currentTime = v.duration }
  }

  return (
    <section id="m0-performance" ref={sectionRef} className="mzpt-section">
      <div className="mzpt-content">
        {/* ── Left: video + custom controls ── */}
        <div className="mzpt-left">
          <div className="mzpt-video-wrap" onClick={togglePlay}>
            <DeferredVideo
              ref={videoRef}
              className="mzpt-video"
              src="videos/motion-0/performance-test.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
            />
          </div>

          <div className="mzpt-controls">
            <button
              type="button"
              className="mzpt-play"
              onClick={togglePlay}
              aria-label={playing ? 'Pause video' : 'Play video'}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>

            <div
              ref={barRef}
              className="mzpt-bar"
              role="slider"
              aria-label="Seek video"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
              tabIndex={0}
              onPointerDown={onBarDown}
              onPointerMove={onBarMove}
              onPointerUp={onBarUp}
              onPointerCancel={onBarUp}
              onKeyDown={onBarKey}
            >
              <div className="mzpt-track">
                <div className="mzpt-fill" style={{ width: `${progress * 100}%` }} />
                <div className="mzpt-thumb" style={{ left: `${progress * 100}%` }} />
              </div>
            </div>

            <button
              type="button"
              className="mzpt-play"
              onClick={toggleMute}
              aria-label={muted ? 'Unmute video' : 'Mute video'}
              aria-pressed={!muted}
            >
              {muted ? <MutedIcon /> : <SoundIcon />}
            </button>
          </div>
        </div>

        {/* ── Right: white panel, three black words ── */}
        <div className="mzpt-right">
          <div className="mzpt-words">
            {WORDS.map((w, i) => (
              <span key={w} className="mzpt-word" style={{ transitionDelay: `${i * 150}ms` }}>
                {w}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
