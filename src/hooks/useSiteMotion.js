import { useEffect } from 'react'
import Lenis from 'lenis'

export default function useSiteMotion(path) {
  useEffect(() => {
    if (path === '/dataset') return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let scroll
    let entryTimer = 0
    let direction = 0
    let aligningEntry = false
    const getStops = () => {
      const header = document.querySelector('.site-nav')?.getBoundingClientRect().bottom || 72
      return [...document.querySelectorAll('.research-editorial-paper')].map((paper) => {
        const media = paper.querySelector('.research-editorial-media img, .research-editorial-media video')
        const copy = paper.querySelector('.research-editorial-copy')
        const top = (media || paper).getBoundingClientRect().top + window.scrollY
        const bottom = (copy || media || paper).getBoundingClientRect().bottom + window.scrollY
        const space = Math.max(24, (innerHeight - header - (bottom - top)) / 2)
        return Math.max(0, top - header - space)
      })
    }
    const finishEntry = () => {
      if (path !== '/research' || !scroll || aligningEntry || !direction || innerWidth < 768) return
      const position = scroll.targetScroll
      // Settle only ahead of the input direction: never pull back after overshoot.
      const target = getStops().filter((stop) => (stop - position) * direction >= -1)
        .sort((a, b) => Math.abs(a - position) - Math.abs(b - position))[0]
      if (target === undefined || Math.abs(target - position) > 100) return
      aligningEntry = true
      scroll.scrollTo(target, { duration: 0.85, onComplete: () => { aligningEntry = false } })
    }
    const onInput = () => {
      clearTimeout(entryTimer)
      if (aligningEntry && scroll) scroll.scrollTo(scroll.animatedScroll, { immediate: true })
      aligningEntry = false
    }
    const gentleResistance = (input) => {
      if (path !== '/research' || !scroll || innerWidth < 768 || input.event.type !== 'wheel' || input.event.ctrlKey || !input.deltaY || Math.abs(input.deltaX) > Math.abs(input.deltaY)) return true
      onInput()
      direction = Math.sign(input.deltaY)
      const stops = getStops()
      const position = scroll.targetScroll
      const ahead = stops.filter((stop) => (stop - position) * direction > 1)
        .sort((a, b) => Math.abs(a - position) - Math.abs(b - position))[0]
      if (ahead !== undefined) {
        const distance = Math.abs(ahead - position)
        const weight = Math.exp(-Math.pow(distance / 180, 2))
        input.deltaY *= 1 - 0.5 * weight
        // Catch a crossing in the same Lenis animation; the next wheel input
        // can continue freely, with no lock, timeout gate or reverse motion.
        if (Math.abs(input.deltaY) >= distance) input.deltaY = ahead - position
      }
      entryTimer = window.setTimeout(finishEntry, 180)
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
    window.addEventListener('touchstart', onInput, { passive: true })
    window.addEventListener('pointerdown', onInput, { passive: true })
    window.addEventListener('keydown', onInput)
    reduced.addEventListener('change', configure)
    return () => {
      reduced.removeEventListener('change', configure)
      clearTimeout(entryTimer)
      window.removeEventListener('touchstart', onInput)
      window.removeEventListener('pointerdown', onInput)
      window.removeEventListener('keydown', onInput)
      scroll?.destroy()
      document.documentElement.classList.remove('site-smooth-motion')
    }
  }, [path])
}
