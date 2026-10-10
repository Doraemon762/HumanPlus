import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import './ConcaveCarousel.css'

if (typeof window !== 'undefined') gsap.registerPlugin(Draggable, InertiaPlugin)

const DRAG_PIXELS_PER_CARD = 285
const AUTO_SPEED = 0.085
const wrap = (value, length) => ((value % length) + length) % length

export default function ConcaveCarousel({ items = [], ariaLabel = 'Research paper carousel' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const viewportRef = useRef(null)
  const cardRefs = useRef([])
  const positionRef = useRef({ value: 0 })
  const activeIndexRef = useRef(0)
  const autoplayVelocityRef = useRef(AUTO_SPEED)
  const hoveredRef = useRef(false)
  const draggingRef = useRef(false)
  const throwingRef = useRef(false)
  const centeringRef = useRef(false)
  const centerTweenRef = useRef(null)
  const draggableRef = useRef(null)
  const centerIndexRef = useRef(() => {})
  const reduceMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  useLayoutEffect(() => {
    if (!items.length || !viewportRef.current) return undefined

    const motion = positionRef.current
    motion.value = 0
    activeIndexRef.current = 0
    setActiveIndex(0)
    autoplayVelocityRef.current = reduceMotion ? 0 : AUTO_SPEED

    const normalizedOffset = (index, currentPosition = motion.value) => {
      const half = items.length / 2
      return ((((index - currentPosition) + half) % items.length) + items.length) % items.length - half
    }

    const render = () => {
      cardRefs.current.forEach((card, index) => {
        if (!card) return
        const offset = normalizedOffset(index)
        const distance = Math.abs(offset)
        const edgeFade = distance > 2.72 ? Math.max(0, (3.2 - distance) / 0.48) : 1
        const opacity = Math.min(1, Math.max(0, (1 - distance * 0.14) * edgeFade))
        const visible = distance <= 3.2
        card.style.setProperty('--offset', offset)
        card.style.setProperty('--distance', distance)
        card.style.setProperty('--depth', Math.round(40 - distance * 5))
        card.style.setProperty('--card-opacity', opacity)
        card.setAttribute('aria-hidden', String(!visible))
      })

      const nextIndex = wrap(Math.round(motion.value), items.length)
      if (nextIndex !== activeIndexRef.current) {
        cardRefs.current[activeIndexRef.current]?.classList.remove('is-active')
        cardRefs.current[nextIndex]?.classList.add('is-active')
        activeIndexRef.current = nextIndex
        setActiveIndex(nextIndex)
      }
    }

    const proxy = document.createElement('div')
    gsap.set(proxy, { x: 0 })

    const syncFromProxy = (draggable) => {
      motion.value = -draggable.x / DRAG_PIXELS_PER_CARD
      render()
    }

    const centerIndex = (index) => {
      const offset = normalizedOffset(wrap(index, items.length))
      if (Math.abs(offset) < 0.001) return
      centerTweenRef.current?.kill()
      draggableRef.current?.tween?.kill()
      throwingRef.current = false
      centeringRef.current = true
      autoplayVelocityRef.current = 0
      centerTweenRef.current = gsap.to(motion, {
        value: motion.value + offset,
        duration: reduceMotion ? 0 : Math.min(0.9, 0.58 + Math.abs(offset) * 0.1),
        ease: 'power3.inOut',
        overwrite: true,
        onUpdate: render,
        onComplete: () => {
          centeringRef.current = false
          gsap.set(proxy, { x: -motion.value * DRAG_PIXELS_PER_CARD })
          draggableRef.current?.update()
        },
      })
    }
    centerIndexRef.current = centerIndex

    const cardIndexAtPoint = (clientX, clientY) => cardRefs.current.reduce((best, card, index) => {
      if (!card || card.getAttribute('aria-hidden') === 'true') return best
      const rect = card.getBoundingClientRect()
      if (clientY < rect.top || clientY > rect.bottom) return best
      const distance = Math.abs(clientX - (rect.left + rect.width / 2))
      return !best || distance < best.distance ? { index, distance } : best
    }, null)?.index

    let lastDragEndedAt = -Infinity
    const handleCardClick = (event) => {
      if (performance.now() - lastDragEndedAt < 160) return
      const index = cardIndexAtPoint(event.clientX, event.clientY)
      if (!Number.isInteger(index)) return
      requestAnimationFrame(() => centerIndex(index))
    }

    viewportRef.current.addEventListener('click', handleCardClick, true)

    const draggable = Draggable.create(proxy, {
      trigger: viewportRef.current,
      type: 'x',
      inertia: !reduceMotion,
      minimumMovement: 5,
      allowContextMenu: true,
      zIndexBoost: false,
      throwResistance: 1250,
      minDuration: 0.45,
      maxDuration: 2.4,
      overshootTolerance: 0,
      snap: (value) => Math.round(value / DRAG_PIXELS_PER_CARD) * DRAG_PIXELS_PER_CARD,
      onPressInit() {
        centerTweenRef.current?.kill()
        this.tween?.kill()
        centeringRef.current = false
        throwingRef.current = false
        autoplayVelocityRef.current = 0
        gsap.set(proxy, { x: -motion.value * DRAG_PIXELS_PER_CARD })
        this.update()
      },
      onDragStart() {
        centerTweenRef.current?.kill()
        centeringRef.current = false
        gsap.set(proxy, { x: -motion.value * DRAG_PIXELS_PER_CARD })
        this.update()
        draggingRef.current = true
      },
      onDrag() {
        syncFromProxy(this)
      },
      onDragEnd() {
        draggingRef.current = false
        lastDragEndedAt = performance.now()
        throwingRef.current = Boolean(this.isThrowing)
      },
      onThrowUpdate() {
        throwingRef.current = true
        syncFromProxy(this)
      },
      onThrowComplete() {
        syncFromProxy(this)
        throwingRef.current = false
      },
    })[0]
    draggableRef.current = draggable

    const tick = (_time, deltaTime) => {
      if (draggingRef.current || throwingRef.current || centeringRef.current) return
      const deltaSeconds = Math.min(deltaTime / 1000, 0.05)
      const targetVelocity = hoveredRef.current || reduceMotion ? 0 : AUTO_SPEED
      const smoothing = 1 - Math.exp(-deltaSeconds * 4.2)
      autoplayVelocityRef.current += (targetVelocity - autoplayVelocityRef.current) * smoothing
      if (Math.abs(autoplayVelocityRef.current) < 0.0001) return
      motion.value += autoplayVelocityRef.current * deltaSeconds
      gsap.set(proxy, { x: -motion.value * DRAG_PIXELS_PER_CARD })
      render()
    }

    render()
    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      centerTweenRef.current?.kill()
      viewportRef.current?.removeEventListener('click', handleCardClick, true)
      draggable.kill()
      draggableRef.current = null
    }
  }, [items.length, reduceMotion])

  if (!items.length) return null

  const move = (direction) => centerIndexRef.current(activeIndexRef.current + direction)

  return (
    <section
      className="concave-carousel"
      aria-label={ariaLabel}
      tabIndex="0"
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') move(-1)
        if (event.key === 'ArrowRight') move(1)
      }}
    >
      <div
        ref={viewportRef}
        className="concave-carousel__viewport"
        onMouseEnter={() => { hoveredRef.current = true }}
        onMouseLeave={() => { hoveredRef.current = false }}
        onFocus={() => { hoveredRef.current = true }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) hoveredRef.current = false
        }}
      >
        <div className="concave-carousel__wall">
          {items.map((item, index) => (
            <div
              ref={(node) => { cardRefs.current[index] = node }}
              data-carousel-index={index}
              className={`concave-carousel__card${index === activeIndex ? ' is-active' : ''}`}
              role="button"
              aria-label={`Center ${item.title}`}
              tabIndex={index === activeIndex ? 0 : -1}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  centerIndexRef.current(index)
                }
              }}
              key={`${item.title}-${index}`}
            >
              <div
                className="concave-carousel__media"
                role="img"
                aria-label={item.alt || item.title}
                style={{ backgroundImage: `url(${item.src})` }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="concave-carousel__caption" aria-live="polite">
        <strong>{items[activeIndex].title}</strong>
        <span>{items[activeIndex].subtitle}</span>
        <div className="concave-carousel__links">
          {items[activeIndex].links?.map((link) => (
            <a href={link.href} target="_blank" rel="noreferrer" key={`${activeIndex}-${link.label}-${link.href}`}>
              {link.label} <i aria-hidden="true">↗</i>
            </a>
          ))}
        </div>
      </div>

      <div className="concave-carousel__controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous paper">‹</button>
        <span>{String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
        <button type="button" onClick={() => move(1)} aria-label="Next paper">›</button>
      </div>
    </section>
  )
}
