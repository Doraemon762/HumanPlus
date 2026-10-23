import { useEffect } from 'react'

// Let native scrolling finish before gently aligning nearby section edges.
export default function useIdleSectionSnap({ ids, duration = 1000, topOffset = 0 }) {
  useEffect(() => {
    const disabled = () => window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse), (max-width: 900px), (orientation: portrait)').matches
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (sections.length < 2 || disabled()) return
    let timer = 0
    let frame = 0
    let animating = false
    let interacting = false
    const cancel = () => {
      clearTimeout(timer)
      cancelAnimationFrame(frame)
      frame = 0
      animating = false
    }
    const settle = () => {
      if (interacting || disabled()) return
      const y = window.scrollY
      const maxY = Math.max(0, document.documentElement.scrollHeight - innerHeight)
      const stops = sections.flatMap((section) => {
        const top = section.getBoundingClientRect().top + y
        const start = Math.max(0, top - topOffset)
        const end = Math.max(start, top + section.offsetHeight - innerHeight)
        return end - start > 80 ? [start, end] : [start]
      }).map((stop) => Math.min(maxY, stop)).sort((a, b) => a - b)
      if (y < stops[0] - 2 || y > stops.at(-1) + 80) return
      const target = stops.reduce((best, stop) => Math.abs(stop - y) < Math.abs(best - y) ? stop : best)
      const delta = target - y
      // Do not pull readers away from the middle of tall content.
      if (Math.abs(delta) < 3 || Math.abs(delta) > Math.min(innerHeight * 0.48, 420)) return
      const began = performance.now()
      const ms = Math.max(1500, duration * 1.5)
      animating = true
      const tick = (now) => {
        const t = Math.min(1, (now - began) / ms)
        const eased = t * t * (3 - 2 * t)
        window.scrollTo({ top: y + delta * eased, behavior: 'instant' })
        if (t < 1) frame = requestAnimationFrame(tick)
        else { frame = 0; animating = false }
      }
      frame = requestAnimationFrame(tick)
    }
    const onScroll = () => {
      if (animating || interacting) return
      clearTimeout(timer)
      timer = window.setTimeout(settle, 320)
    }
    const onInput = () => cancel()
    const onPointerDown = () => { interacting = true; cancel() }
    const onPointerUp = () => { interacting = false; onScroll() }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onInput, { passive: true })
    window.addEventListener('keydown', onInput)
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('resize', cancel)
    return () => {
      cancel()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onInput)
      window.removeEventListener('keydown', onInput)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('resize', cancel)
    }
  }, [ids, duration, topOffset])
}
