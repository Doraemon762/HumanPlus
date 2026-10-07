import { useEffect } from 'react'

/**
 * Adds `vg-snap-leaving` to <html> while the window is mid-scroll on the
 * given full-screen panels, and removes it once scrolling settles. The
 * `v0-g0-panels.css` stylesheet uses that class for a restrained
 * fade/rise on the panel content — the visual half of the hand-off that
 * `useSectionSnap` performs.
 *
 * Deliberately independent of useSectionSnap so that hook stays untouched
 * (Motion-0 shares it). Scoped by class name and only active on routes
 * where the ids exist, so nothing outside Vision-0 / Glove-0 can change.
 */
export default function usePanelLeaveFlag(ids) {
  useEffect(() => {
    const panels = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (panels.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = document.documentElement
    let timer = 0
    let lastY = window.scrollY

    const onScroll = () => {
      // Only engage while a hand-off is plausibly in flight: we are inside
      // the panel band and the position actually changed since last frame.
      const y = window.scrollY
      if (y !== lastY) {
        const first = panels[0].getBoundingClientRect().top + y
        const last = panels[panels.length - 1].getBoundingClientRect().top + y
        if (y > first - window.innerHeight && y < last + window.innerHeight) {
          root.classList.add('vg-snap-leaving')
          clearTimeout(timer)
          timer = window.setTimeout(() => root.classList.remove('vg-snap-leaving'), 180)
        }
      }
      lastY = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
      root.classList.remove('vg-snap-leaving')
    }
  }, [ids])
}