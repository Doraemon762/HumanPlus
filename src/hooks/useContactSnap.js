import { useEffect } from 'react'

/* ── Contact-only full-screen section snap ─
   Same feel as the site-wide useSectionSnap: one wheel gesture always
   completes a ~1s hand-off between adjacent full-screen modules
   (easeInOutCubic, window.scrollTo), instead of free-scrolling.

   Why a Contact-specific variant instead of the shared hook:
   the shared hook assumes every section is ~one viewport tall and has
   no notion of *inner* scrolling. The Contact form can be taller than
   the viewport, so this variant is section-inner-scroll aware — when
   the active section still has room to scroll in the wheel direction,
   the wheel scrolls *inside* it (so every field stays reachable and
   submittable) and only snaps to the next/previous module once the
   section's own scroll boundary is reached.

   - Desktop only; touch / narrow / portrait / reduced-motion fall back
     to native scrolling, so mobile stays fully usable.
   - `ids` selects which sections snap. Pass a stable module-level
     constant so the effect does not re-run every render. */

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export default function useContactSnap({ duration = 1000, ids = [], topOffset = 0 } = {}) {
  useEffect(() => {
    // OS-level reduced-motion → plain scrolling.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Touch / narrow / portrait → native scrolling (mobile must stay usable).
    const isMobile = window.matchMedia(
      '(pointer: coarse), (max-width: 900px), (orientation: portrait)'
    ).matches
    if (isMobile) return

    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (els.length < 2) return

    let animating = false

    const animateTo = (targetY) => {
      animating = true
      const startY = window.scrollY
      const delta = targetY - startY
      const t0 = performance.now()
      const step = (now) => {
        const t = Math.min((now - t0) / duration, 1)
        window.scrollTo(0, startY + delta * easeInOutCubic(t))
        if (t < 1) requestAnimationFrame(step)
        else animating = false
      }
      requestAnimationFrame(step)
    }

    const stopOf = (el) =>
      Math.max(0, el.getBoundingClientRect().top + window.scrollY - topOffset)

    const onWheel = (e) => {
      // Swallow input mid-flight so a second flick can't stack.
      if (animating) {
        e.preventDefault()
        return
      }
      if (Math.abs(e.deltaY) < 2) return

      const stops = els.map(stopOf)
      const y = window.scrollY
      let idx = 0
      for (let i = 0; i < stops.length; i++) if (y >= stops[i] - 4) idx = i

      const active = els[idx]
      const goingDown = e.deltaY > 0

      // Only treat a section's *internal* scroll as "live" when the
      // window is parked exactly on that section's snap point. If the
      // window has already scrolled past it (e.g. into the footer), a
      // wheel-up should snap the window back to this section, not keep
      // nudging an off-screen inner scroll.
      const parked = Math.abs(y - stops[idx]) <= 4

      // Let a tall section scroll internally before leaving it.
      const scrollable = active.scrollHeight - active.clientHeight
      if (parked && scrollable > 4) {
        const atTop = active.scrollTop <= 1
        const atBottom = active.scrollTop >= scrollable - 1
        if (goingDown && !atBottom) return
        if (!goingDown && !atTop) return
      }

      if (goingDown) {
        // At the last snapped section → hand back to native scroll
        // (footer / any content below flows normally).
        if (idx >= els.length - 1) return
        e.preventDefault()
        animateTo(stops[idx + 1])
      } else {
        if (idx <= 0) return
        e.preventDefault()
        animateTo(stops[idx - 1])
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [duration, ids, topOffset])
}
