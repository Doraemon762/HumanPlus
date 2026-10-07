import { useEffect, useRef } from 'react'

/**
 * Full-page section navigation for Vision-0 / Glove-0.
 *
 * ── Why this replaces the old wheel+rAF-scrollTo approach ──────────────
 * The previous implementation (useSectionSnap) drove the page with a
 * requestAnimationFrame loop that called window.scrollTo on every frame for
 * up to 1000ms, and swallowed every wheel event while `animating` was true.
 * That produced exactly the reported asymmetry:
 *   • a trackpad emits a *stream* of inertial wheel events after the finger
 *     lifts — the first one started the 1s animation, the rest were eaten;
 *   • the per-frame scrollTo fought the browser's own inertial scrolling,
 *     which made scrolling UP feel sluggish and required several attempts.
 *
 * ── The new architecture ───────────────────────────────────────────────
 *   wheel / touch / keys
 *        ↓
 *   currentIndex (explicit state — never guessed from scrollY)
 *        ↓
 *   target section → ONE instant scrollTo (no rAF loop, no fighting)
 *        ↓
 *   CSS handles the visual transition (see v0-g0-panels.css)
 *
 * Consequences:
 *   • Up and down run the *same* code path with only `direction` different —
 *     identical threshold, identical lock, identical duration.
 *   • No rAF loop, so the browser never competes with us for scroll position.
 *   • The lock is released after 2 animation frames (~32ms) instead of a
 *     1s timeout, so a fast double-flick still advances exactly one section
 *     per gesture but is never held hostage.
 *   • Nothing outside these two routes can be affected: the listeners are
 *     attached only while `ids` resolve to real elements, and the page is
 *     only intercepted between the first and last section.
 */

const WHEEL_THRESHOLD = 2 // px; below this it's jitter, not intent

/* How long the wheel must stay silent before we consider the gesture over
   and allow another section jump. This is what guarantees "one gesture = one
   section": a trackpad flick delivers a burst of inertial events, and we
   must not treat the tail of that burst as new intent. 220ms is longer than
   any real inter-event gap in a single flick, but far shorter than the gap
   between two deliberate flicks. */
const GESTURE_SETTLE_MS = 220

/* Normalise the three deltaMode units to pixels so a Firefox-style
   line/page delta can't be read as "huge" or "tiny". */
function deltaToPx(e) {
  if (e.deltaMode === 1) return e.deltaY * 16 // lines
  if (e.deltaMode === 2) return e.deltaY * window.innerHeight // pages
  return e.deltaY
}

export default function useFullPageSections(ids, { topOffset = 0, enabled = true } = {}) {
  // Refs, not state: this hook must never trigger a React render. Re-rendering
  // mid-gesture is what makes scroll handlers feel unstable.
  const indexRef = useRef(0)
  const lockRef = useRef(false)
  const lockTimer = useRef(0)

  useEffect(() => {
    if (!enabled) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (els.length < 2) return

    // Touch / narrow viewports get native scrolling — the wheel model below
    // is a desktop concept, and hijacking touch would break momentum.
    const isTouch = window.matchMedia('(pointer: coarse), (max-width: 900px)').matches

    /* Scroll to a section INSTANTLY. The eye-catching part is CSS, so JS has
       nothing to animate — which is precisely why up and down feel identical. */
    const jumpTo = (i) => {
      const el = els[i]
      if (!el) return false
      indexRef.current = i
      const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - topOffset)
      window.scrollTo({ top, behavior: 'auto' })
      playEnter(el)
      return true
    }

    /* Retrigger the CSS enter animation on the panel we just moved to.
       We toggle the class off then on within a frame so the animation
       restarts cleanly even when revisiting the same section. */
    const playEnter = (el) => {
      const inner = el.querySelector('.v0-panel-inner, .g0-panel-inner') || el
      inner.classList.remove('is-entering')
      // force reflow so re-adding the class restarts the animation
      void inner.offsetWidth
      inner.classList.add('is-entering')
    }

    /* Move exactly one section. `dir` is the ONLY thing that differs between
       going down and going up. Locking is handled by the caller (onWheel),
       which owns the gesture window. */
    const step = (dir) => {
      const next = indexRef.current + dir
      if (next < 0 || next > els.length - 1) return false
      return jumpTo(next)
    }

    // ── wheel / trackpad (desktop) ──────────────────────────────────────
    const onWheel = (e) => {
      if (isTouch) return
      const dy = deltaToPx(e)
      if (Math.abs(dy) < WHEEL_THRESHOLD) return

      const dir = dy > 0 ? 1 : -1

      // At the very edge, hand scrolling back to the browser so the page can
      // never feel trapped — but only in the outward direction.
      const atEdge = (dir > 0 && indexRef.current >= els.length - 1) ||
                     (dir < 0 && indexRef.current <= 0)
      if (atEdge) return // no preventDefault → native scroll (e.g. the Footer)

      e.preventDefault()

      // Every event inside one gesture pushes the settle window forward, so
      // the lock only lifts once the wheel has genuinely been quiet for
      // GESTURE_SETTLE_MS — no matter how long the inertial tail is.
      window.clearTimeout(lockTimer.current)
      lockTimer.current = window.setTimeout(() => { lockRef.current = false }, GESTURE_SETTLE_MS)

      if (lockRef.current) return // tail of the current gesture — ignore
      lockRef.current = true
      step(dir)
    }

    // ── touch (mobile): swipe up = next, swipe down = previous ──────────
    let touchY = null
    const onTouchStart = (e) => { touchY = e.touches[0].clientY }
    const onTouchEnd = (e) => {
      if (touchY === null) return
      const dy = touchY - e.changedTouches[0].clientY
      touchY = null
      if (Math.abs(dy) < 40) return
      if (lockRef.current) return
      const dir = dy > 0 ? 1 : -1 // swipe up → next
      const atEdge = (dir > 0 && indexRef.current >= els.length - 1) ||
                     (dir < 0 && indexRef.current <= 0)
      if (atEdge) return
      lockRef.current = true
      window.clearTimeout(lockTimer.current)
      lockTimer.current = window.setTimeout(() => { lockRef.current = false }, GESTURE_SETTLE_MS)
      step(dir)
    }

    // ── keyboard: symmetric with wheel ─────────────────────────────────
    const press = (dir) => {
      if (lockRef.current) return
      const atEdge = (dir > 0 && indexRef.current >= els.length - 1) ||
                     (dir < 0 && indexRef.current <= 0)
      if (atEdge) return
      lockRef.current = true
      window.clearTimeout(lockTimer.current)
      lockTimer.current = window.setTimeout(() => { lockRef.current = false }, GESTURE_SETTLE_MS)
      step(dir)
    }

    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault(); press(1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault(); press(-1)
      } else if (e.key === 'Home') {
        e.preventDefault(); lockRef.current = true; jumpTo(0)
      } else if (e.key === 'End') {
        e.preventDefault(); lockRef.current = true; jumpTo(els.length - 1)
      }
    }

    // A programmatic jump elsewhere (anchor, resize, restore scroll) must
    // resync the index, or the next wheel would step from a stale place.
    const onScroll = () => {
      if (lockRef.current) return
      const y = window.scrollY
      let i = 0
      for (let k = 0; k < els.length; k++) {
        const top = els[k].getBoundingClientRect().top + window.scrollY - topOffset
        if (y >= top - 8) i = k
      }
      indexRef.current = i
    }

    const onResize = () => { indexRef.current = 0; lockRef.current = false }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    // Land on the section matching the current scroll position (deep reload).
    onScroll()

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.clearTimeout(lockTimer.current)
    }
  }, [ids, topOffset, enabled])
}