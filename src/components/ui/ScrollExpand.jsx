import { useCallback, useEffect, useRef } from 'react'
import './ScrollExpand.css'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const smoothstep = (start, end, value) => {
  const progress = clamp((value - start) / (end - start || 1e-6), 0, 1)
  return progress * progress * (3 - 2 * progress)
}

export default function ScrollExpand({
  src,
  poster = '',
  title,
  children,
  startWidth = 43,
  startHeight = 62,
  startRadius = 30,
  mediaZoom = 1.16,
  scrollDistance = 0.92,
  holdDistance = 0.16,
  smoothing = 0.1,
  align = 'right',
  verticalAlign = 'center',
  startRight = 0,
  startBottom = 0,
  startShiftX = 0,
  topOffset = 0,
  className = '',
}) {
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const stageRef = useRef(null)
  const holdSnapStartRef = useRef(null)
  const holdSnapMiddleRef = useRef(null)
  const frameRef = useRef(null)
  const mediaRef = useRef(null)
  const titleRef = useRef(null)
  const overlayRef = useRef(null)
  const scrimRef = useRef(null)

  const applyProgress = useCallback((progress) => {
    const frame = frameRef.current
    const media = mediaRef.current
    if (!frame || !media) return

    const eased = smoothstep(0, 1, progress)
    const width = startWidth + (100 - startWidth) * eased
    const height = startHeight + (100 - startHeight) * eased
    const sideSpace = Math.max(0, 100 - width)
    const verticalSpace = Math.max(0, 100 - height)
    const bottomSpace = verticalAlign === 'bottom' ? startBottom * (1 - eased) : verticalSpace / 2
    const topSpace = verticalAlign === 'bottom' ? Math.max(0, verticalSpace - bottomSpace) : verticalSpace / 2
    const rightSpace = align === 'right' ? startRight * (1 - eased) : sideSpace / 2
    const leftSpace = align === 'right' ? Math.max(0, sideSpace - rightSpace) : sideSpace / 2
    const radius = startRadius * (1 - eased)

    frame.style.clipPath = `inset(${topSpace}% ${rightSpace}% ${bottomSpace}% ${leftSpace}% round ${radius}px)`
    const shiftX = startShiftX * (1 - eased)
    media.style.transform = `translate3d(${shiftX}%, 0, 0) scale(${mediaZoom + (1 - mediaZoom) * eased})`

    if (scrimRef.current) scrimRef.current.style.opacity = `${0.38 * smoothstep(0.55, 1, progress)}`
    if (titleRef.current) {
      const exit = smoothstep(0.24, 0.74, progress)
      titleRef.current.style.opacity = `${1 - exit}`
      titleRef.current.style.transform = `translate3d(0, ${-24 * exit}px, 0)`
    }
    if (overlayRef.current) {
      const enter = smoothstep(0.72, 1, progress)
      overlayRef.current.style.opacity = `${enter}`
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - enter)}px, 0)`
    }
  }, [align, mediaZoom, startBottom, startHeight, startRadius, startRight, startShiftX, startWidth, verticalAlign])

  useEffect(() => {
    const root = rootRef.current
    const track = trackRef.current
    const stage = stageRef.current
    const holdSnapStart = holdSnapStartRef.current
    const holdSnapMiddle = holdSnapMiddleRef.current
    if (!root || !track || !stage || !holdSnapStart || !holdSnapMiddle) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let current = 0
    let target = 0
    let stageHeight = 0
    let running = false

    const measure = () => {
      stageHeight = Math.max(480, window.innerHeight - topOffset)
      stage.style.top = `${topOffset}px`
      stage.style.height = `${stageHeight}px`
      track.style.height = `${stageHeight * (1 + scrollDistance + holdDistance)}px`
      holdSnapStart.style.top = `${stageHeight * scrollDistance}px`
      holdSnapMiddle.style.top = `${stageHeight * (scrollDistance + holdDistance * 0.55)}px`
    }
    const readProgress = () => clamp(-track.getBoundingClientRect().top / (stageHeight * scrollDistance), 0, 1)
    const tick = () => {
      const strength = reduceMotion || smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * smoothing))
      current += (target - current) * strength
      if (Math.abs(target - current) < 0.0004) {
        current = target
        running = false
      }
      applyProgress(current)
      raf = running ? requestAnimationFrame(tick) : 0
    }
    const update = () => {
      target = readProgress()
      if (!running) {
        running = true
        raf = requestAnimationFrame(tick)
      }
    }
    const resize = () => {
      measure()
      target = readProgress()
      current = target
      applyProgress(current)
    }

    resize()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', resize)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', resize)
    }
  }, [applyProgress, holdDistance, scrollDistance, smoothing, topOffset])

  return (
    <section ref={rootRef} className={`scroll-expand ${className}`.trim()}>
      <div ref={trackRef} className="scroll-expand__track">
        <span ref={holdSnapStartRef} className="scroll-expand__hold-snap" aria-hidden="true" />
        <span ref={holdSnapMiddleRef} className="scroll-expand__hold-snap" aria-hidden="true" />
        <div ref={stageRef} className="scroll-expand__stage">
          <div ref={frameRef} className="scroll-expand__frame">
            <video
              ref={mediaRef}
              className="scroll-expand__media"
              src={src}
              poster={poster || undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div ref={scrimRef} className="scroll-expand__scrim" />
            {children && <div ref={overlayRef} className="scroll-expand__overlay">{children}</div>}
          </div>
          {title && <div ref={titleRef} className="scroll-expand__title">{title}</div>}
        </div>
      </div>
    </section>
  )
}
