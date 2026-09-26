import { useEffect, useRef } from 'react'

/**
 * Subtle scroll parallax — translates the target vertically by a small
 * factor as it crosses the viewport. Deliberately restrained (a few
 * dozen px at most): the story page should drift, not bounce.
 *
 * Disabled for prefers-reduced-motion users.
 */
export default function useParallax(factor = 0.08) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      /* 0 when the element centre sits at viewport centre */
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh
      el.style.transform = `translate3d(0, ${(progress * factor * 100).toFixed(1)}px, 0)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [factor])

  return ref
}
