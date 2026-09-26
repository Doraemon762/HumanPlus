import { useEffect } from 'react'

/* ── Full-screen section hand-off ─
   One wheel gesture always completes a full-screen transition between
   adjacent sections over `duration` ms, instead of free-scrolling
   through them.

   Why JS and not CSS scroll-snap:
   - CSS `scroll-snap-type: y mandatory` gives no control over the
     transition duration (the brief asks for ~0.8–1.2s), and a fast
     flick skips past whole sections.

   `ids` selects which sections snap. After the last id, native
   scrolling is handed back (so any content below flows normally).
   Defaults to the homepage's six sections. Pass a stable array
   reference (module-level constant) so the effect does not re-run on
   every render. */

const DEFAULT_IDS = ['hero', 'about', 'products', 'robotics', 'research', 'news']

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export default function useSectionSnap({ duration = 1000, ids } = {}) {
  const sectionIds = ids ?? DEFAULT_IDS
  useEffect(() => {
    // Respect users who ask the OS for reduced motion — plain scrolling.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const els = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)
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

    const onWheel = (e) => {
      // Swallow input mid-flight so a second flick can't stack on the first.
      if (animating) {
        e.preventDefault()
        return
      }
      if (Math.abs(e.deltaY) < 2) return

      const tops = els.map((el) => el.getBoundingClientRect().top + window.scrollY)
      const y = window.scrollY

      // Section currently in view: last one whose top is at/above the
      // viewport top, with a small tolerance for rounding.
      let idx = 0
      for (let i = 0; i < tops.length; i++) if (y >= tops[i] - 4) idx = i

      const goingDown = e.deltaY > 0
      if (goingDown) {
        // At/below the last snapped section → hand back to native scroll.
        if (idx >= els.length - 1) return
        e.preventDefault()
        animateTo(tops[idx + 1])
      } else {
        // At the very top → nothing above, native scroll.
        if (idx <= 0) return
        e.preventDefault()
        animateTo(tops[idx - 1])
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [duration, sectionIds])
}
