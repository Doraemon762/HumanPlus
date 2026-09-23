import { useEffect, useRef, useState } from 'react'

/**
 * One-shot scroll reveal. Returns [ref, inView].
 *
 * Rules inherited from the design system:
 * - `observer.unobserve` after the first trigger — reveal never reverses
 *   when the user scrolls back up.
 * - prefers-reduced-motion users get content immediately (JS side; the
 *   CSS side is a second belt in animations.css).
 */
export default function useReveal() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}
