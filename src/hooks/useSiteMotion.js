import { useEffect } from 'react'
import Lenis from 'lenis'

export default function useSiteMotion(path) {
  path = ({ '/hardware/weave': '/hardware/motion-0', '/hardware/pulse': '/hardware/motion-strap' })[path] || path
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let scroll
    let entryTimer = 0
    let direction = 0
    let aligningEntry = false
    const getStops = () => {
      const header = document.querySelector('.site-nav')?.getBoundingClientRect().bottom || 72
      if (path === '/') {
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - innerHeight)
        const topOf = node => node.getBoundingClientRect().top + window.scrollY - header
        const products = [...document.querySelectorAll('.home-product')]
        const nodes = [
          document.querySelector('#robotics'),
          ...(innerWidth >= 768 ? [document.querySelector('#products')] : products),
          document.querySelector('#research'),
          document.querySelector('#news'),
          document.querySelector('#news .news-story-grid'),
        ].filter(Boolean)
        const stops = [0, ...nodes.map(topOf)]
        const last = document.querySelector('#news')
        if (last) stops.push(topOf(last) + last.offsetHeight - (innerHeight - header))
        stops.push(maxScroll)
        return [...new Set(stops.map(stop => Math.round(Math.max(0, Math.min(maxScroll, stop)))))].sort((a, b) => a - b)
      }
      if (path === '/hardware/motion-strap' || path === '/hardware/motion-0' || path === '/hardware/cap') {
        const maxScroll = document.documentElement.scrollHeight - innerHeight
        return [...document.querySelectorAll(path === '/hardware/motion-0' ? '.weave-page > section' : path === '/hardware/cap' ? '.cap-page > section' : '.pulse-page > section')].flatMap((section) => {
          const top = section.getBoundingClientRect().top + window.scrollY
          const available = innerHeight - header
          const center = top - header - Math.max(0, (available - section.offsetHeight) / 2)
          const stops = section.offsetHeight > available + 80
            ? [top - header, top + section.offsetHeight - innerHeight]
            : [center]
          return stops.map((stop) => Math.max(0, Math.min(maxScroll, stop)))
        })
      }
      if (path === '/dataset') {
        const topOf = (node) => node.getBoundingClientRect().top + window.scrollY
        const hero = document.querySelector('.dataset-hero-scroll')
        const track = document.querySelector('.dataset-life-intro .scroll-expand__track')
        const preview = document.querySelector('.life-preview')
        const gallery = document.querySelector('.dataset-gallery')
        const resources = document.querySelector('.dataset-resources-screen')
        const stops = [0]
        if (hero) stops.push(topOf(hero) + hero.offsetHeight - innerHeight)
        if (track) stops.push(topOf(track) - header, topOf(track) + Math.max(480, innerHeight - 72) * .9)
        if (preview) stops.push(topOf(preview) - header, topOf(preview) - header + innerHeight * .7)
        if (gallery) {
          // Align the white section boundary, not the shorter carousel center:
          // centering the carousel exposed the preceding black video above it.
          const section = gallery.closest('.dataset-preview-section') || gallery
          stops.push(topOf(section) - header)
        }
        if (resources) stops.push(topOf(resources) - header)
        return stops.map((value) => Math.max(0, Math.min(document.documentElement.scrollHeight - innerHeight, value)))
      }
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
      if (!['/', '/research', '/dataset', '/hardware/motion-strap', '/hardware/motion-0', '/hardware/cap'].includes(path) || !scroll || aligningEntry || !direction || innerWidth < 768) return
      const position = scroll.targetScroll
      // Home panels settle to the nearest boundary, including a small overshoot.
      // Direction-only settling could skip the screen the user just reached.
      const target = getStops().filter((stop) => path === '/' || (stop - position) * direction >= -1)
        .sort((a, b) => Math.abs(a - position) - Math.abs(b - position))[0]
      if (target === undefined || Math.abs(target - position) > (path === '/' ? Math.min(360, (innerHeight - 72) * .48) : 100)) return
      aligningEntry = true
      scroll.scrollTo(target, { duration: 0.85, onComplete: () => { aligningEntry = false } })
    }
    const onInput = () => {
      clearTimeout(entryTimer)
      if (aligningEntry && scroll) scroll.scrollTo(scroll.animatedScroll, { immediate: true })
      aligningEntry = false
    }
    const gentleResistance = (input) => {
      if (!['/', '/research', '/dataset', '/hardware/motion-strap', '/hardware/motion-0', '/hardware/cap'].includes(path) || !scroll || innerWidth < 768 || input.event.type !== 'wheel' || input.event.ctrlKey || !input.deltaY || Math.abs(input.deltaX) > Math.abs(input.deltaY)) return true
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
