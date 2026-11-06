import { translate, useSiteLanguage } from '../../i18n'
import { useEffect, useRef } from 'react'

const FRAME_COUNT = 120
const frameUrl = index => `media/pulse-exploded/frames/frame-${String(index + 1).padStart(3, '0')}.webp`

export default function PulseExploded() {
  useSiteLanguage()
  const track = useRef(null)
  const canvas = useRef(null)
  useEffect(() => {
    const surface = canvas.current
    const context = surface.getContext('2d', { alpha: false })
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const controller = new AbortController()
    const blobs = new Map()
    const bitmaps = new Map()
    const decoding = new Map()
    let disposed = false, started = false, animation = 0, target = 0, painted = -1
    const draw = () => {
      animation = 0
      if (disposed || !bitmaps.size) return
      const index = bitmaps.has(target) ? target : [...bitmaps.keys()].reduce((a, b) => Math.abs(a - target) < Math.abs(b - target) ? a : b)
      const bitmap = bitmaps.get(index)
      const box = surface.getBoundingClientRect()
      const ratio = Math.min(devicePixelRatio || 1, 2)
      const width = Math.round(box.width * ratio), height = Math.round(box.height * ratio)
      if (!width || !height) return
      if (surface.width !== width || surface.height !== height) {
        surface.width = width; surface.height = height; painted = -1
      }
      if (painted === index) return
      const scale = Math.max(width / bitmap.width, height / bitmap.height)
      context.drawImage(bitmap, (width - bitmap.width * scale) / 2, (height - bitmap.height * scale) / 2, bitmap.width * scale, bitmap.height * scale)
      painted = index
      surface.style.opacity = '1'
    }
    const schedule = () => { if (!animation && !disposed) animation = requestAnimationFrame(draw) }
    const decode = index => {
      if (disposed || !blobs.has(index) || bitmaps.has(index) || decoding.has(index)) return
      const promise = createImageBitmap(blobs.get(index)).then(bitmap => {
        if (disposed) { bitmap.close(); return }
        bitmaps.set(index, bitmap)
        if (bitmaps.size > 12) {
          const distant = [...bitmaps.keys()].sort((a, b) => Math.abs(b - target) - Math.abs(a - target))[0]
          bitmaps.get(distant).close(); bitmaps.delete(distant)
        }
        schedule()
      }).catch(() => {}).finally(() => decoding.delete(index))
      decoding.set(index, promise)
    }
    const warm = () => {
      decode(target)
      for (let offset = 1; offset <= 2; offset++) {
        if (target + offset < FRAME_COUNT) decode(target + offset)
        if (target - offset >= 0) decode(target - offset)
      }
      schedule()
    }
    const update = () => {
      const box = track.current.getBoundingClientRect()
      const stage = track.current.querySelector('.pulse-exploded-stage')
      const progress = reduced.matches ? .5 : Math.max(0, Math.min(1, (72 - box.top) / Math.max(1, box.height - stage.offsetHeight)))
      target = Math.round(progress * (FRAME_COUNT - 1))
      warm()
    }
    const preload = async () => {
      if (started) return
      started = true
      const pending = new Set(Array.from({ length: FRAME_COUNT }, (_, i) => i))
      const worker = async () => {
        while (!disposed && pending.size) {
          const index = [...pending].reduce((a, b) => Math.abs(a - target) < Math.abs(b - target) ? a : b)
          pending.delete(index)
          try {
            const response = await fetch(frameUrl(index), { signal: controller.signal, cache: 'force-cache' })
            if (!response.ok) continue
            blobs.set(index, await response.blob())
            warm()
          } catch { if (disposed) return }
        }
      }
      await Promise.all(Array.from({ length: 4 }, worker))
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { update(); preload() }
    }, { rootMargin: '1000px' })
    observer.observe(track.current)
    const resize = new ResizeObserver(() => { painted = -1; update() })
    resize.observe(surface)
    addEventListener('scroll', update, { passive: true })
    reduced.addEventListener('change', update)
    update()
    return () => {
      disposed = true; controller.abort(); observer.disconnect(); resize.disconnect()
      cancelAnimationFrame(animation)
      for (const bitmap of bitmaps.values()) bitmap.close()
      blobs.clear(); bitmaps.clear()
      removeEventListener('scroll', update); reduced.removeEventListener('change', update)
    }
  }, [])
  return <section ref={track} className="pulse-exploded-scroll" aria-label={translate('Inside Pulse: scroll to explore the sensor assembly')}>
    <div className="pulse-exploded-stage">
      <div className="pulse-exploded-media">
        <img src={frameUrl(0)} alt="" loading="lazy" decoding="async" />
        <canvas ref={canvas} role="img" aria-label={translate('Exploded view of the Pulse IMU sensor, controlled by scrolling')} />
      </div>
    </div>
  </section>
}
