import { useEffect, useRef } from 'react'
import points from '../../data/digitLogoPoints.json'
import './DigitLogo.css'

// Sampled from the blue symbol in the existing HumanPlus brand asset.
export default function DigitLogo() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const cells = points.map(([x, y]) => ({ x, y, digit: Math.floor(Math.random() * 10), next: Math.random() * 2400, start: -1000 }))
    let width = 0, height = 0, frame = 0, last = 0, visible = true
    const draw = (time) => {
      ctx.clearRect(0, 0, width, height)
      const size = Math.min(width, height / .86) * .91
      const ox = (width - size) / 2, oy = (height - size * .86) / 2
      const step = size / 75, line = size * .86 / 64
      ctx.font = `500 ${Math.max(5, step * .96)}px ui-monospace, SFMono-Regular, Consolas, monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      for (const cell of cells) {
        if (!reduced.matches && time > cell.next) {
          cell.previous = cell.digit
          cell.digit = (cell.digit + 1 + Math.floor(Math.random() * 9)) % 10
          cell.start = time
          cell.next = time + 900 + Math.random() * 3000
        }
        const progress = reduced.matches ? 1 : Math.min(1, (time - cell.start) / 300)
        const x = ox + cell.x * size, y = oy + cell.y * size * .86
        ctx.save()
        ctx.beginPath()
        ctx.rect(x - step / 2, y - line / 2, step, line)
        ctx.clip()
        ctx.fillStyle = `rgba(83, 91, 101, ${.52 + cell.y * .23})`
        if (progress < 1) ctx.fillText(String(cell.previous), x, y - progress * line)
        ctx.fillText(String(cell.digit), x, y + (1 - progress) * line)
        ctx.restore()
      }
    }
    const tick = time => {
      if (visible && !document.hidden && time - last > 50) { draw(time); last = time }
      frame = requestAnimationFrame(tick)
    }
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width; height = entry.contentRect.height
      const dpr = Math.min(devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw(performance.now())
    })
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    resize.observe(canvas); observer.observe(canvas)
    frame = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect() }
  }, [])
  return <canvas ref={ref} className="contact-digit-logo" aria-hidden="true" />
}
