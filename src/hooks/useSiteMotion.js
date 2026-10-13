import { useEffect } from 'react'
import Lenis from 'lenis'

export default function useSiteMotion(path) {
  useEffect(() => {
    if (path === '/dataset') return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let scroll
    let entryTimer = 0
    let previousY = window.scrollY
    let direction = 0
    let aligningEntry = false
    const finishEntry = () => {
      if (path !== '/research' || !scroll || aligningEntry || direction <= 0 || innerWidth < 768) return
      const first = document.querySelector('.research-editorial-paper')
      if (!first) return
      const target = first.getBoundingClientRect().top + window.scrollY - 72
      const remaining = target - window.scrollY
      // Only complete an almost-finished forward entry. Never reverse-scroll
      // or drag someone back from the next section.
      if (remaining < 3 || remaining > 120) return
      aligningEntry = true
      scroll.scrollTo(target, { duration: 1.1, easing: (t) => t * t * (3 - 2 * t), onComplete: () => { aligningEntry = false } })
    }
    const onScroll = () => {
      const y = window.scrollY
      if (Math.abs(y - previousY) > 0.2) direction = Math.sign(y - previousY)
      previousY = y
      clearTimeout(entryTimer)
      if (!aligningEntry) entryTimer = window.setTimeout(finishEntry, 250)
    }
    const onInput = () => { clearTimeout(entryTimer); aligningEntry = false }
    const gentleResistance = (input) => {
      if (path !== '/research' || !scroll || innerWidth < 768 || input.event.type !== 'wheel' || input.event.ctrlKey || input.deltaY <= 0 || Math.abs(input.deltaX) > input.deltaY) return true
      const papers = [...document.querySelectorAll('.research-editorial-paper')]
      if (!papers.length) return true
      const y = window.scrollY
      const stops = papers.map((paper) => paper.getBoundingClientRect().top + y - 72)
      const position = scroll.targetScroll
      if (position < stops[0] - 160 || position > stops.at(-1) + 160) return true
      const distance = Math.min(...stops.map((stop) => Math.abs(stop - position)))
      // A continuous friction band, not a snap or an input gate. Always
      // advance in the user's direction, including while crossing the stop.
      const weight = Math.exp(-Math.pow(distance / 120, 2))
      input.deltaY *= 1 - 0.3 * weight
      return true
    }
    const configure = () => {
      scroll?.destroy()
      scroll = undefined
      if (reduced.matches) return
      scroll = new Lenis({
        autoRaf: true,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        allowNestedScroll: true,
        virtualScroll: gentleResistance,
      })
    }
    document.documentElement.classList.add('site-smooth-motion')
    configure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onInput, { passive: true })
    reduced.addEventListener('change', configure)
    return () => {
      reduced.removeEventListener('change', configure)
      clearTimeout(entryTimer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onInput)
      scroll?.destroy()
      document.documentElement.classList.remove('site-smooth-motion')
    }
  }, [path])
}
