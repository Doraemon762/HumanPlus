import { useEffect, useRef } from 'react'
import points from '../../data/digitLogoPoints.json'
import './DigitLogo.css'

// Sampled from the blue symbol in the existing HumanPlus brand asset.
export default function DigitLogo({ style, background = false }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    // Keep the original silhouette coordinates untouched. Background cells
    // are a separate grid; never round and reconstruct the logo itself.
    const logoCells = new Set(points.map(([x, y]) => `${Math.round(x * 75 - .5)}:${Math.floor(y * 64)}`))
    const coordinates = points.map(([x, y]) => {
      const col = Math.round(x * 75 - .5), row = Math.floor(y * 64)
      let neighbors = 0
      for (let dy = -1; dy <= 1; dy += 1) {
        for (let dx = -1; dx <= 1; dx += 1) {
          if (logoCells.has(`${col + dx}:${row + dy}`)) neighbors += 1
        }
      }
      // Quiet isolated tip cells for gently rounded corners, without moving the grid.
      return { x, y, logo: true, edgeOpacity: Math.min(1, Math.max(.15, (neighbors - 1) / 4)) }
    })
    if (background) {
      for (let row = 0; row < 64; row += 1) {
        for (let col = 0; col < 75; col += 1) {
          if (logoCells.has(`${col}:${row}`)) continue
          coordinates.push({ x: (col + .5) / 75, y: (row + .5) / 64, logo: false })
        }
      }
    }
    const cells = coordinates.map(cell => ({ ...cell, digit: Math.floor(Math.random() * 10), next: Math.random() * 2400, start: -1000 }))
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
        const edgeFade = Math.min(1, cell.x * 8, (1 - cell.x) * 8, cell.y * 12, (1 - cell.y) * 12)
        const opacity = cell.logo ? (.52 + cell.y * .23) * cell.edgeOpacity : .065 * Math.max(0, edgeFade)
        ctx.fillStyle = `rgba(83, 91, 101, ${opacity})`
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
  }, [background])
  return <canvas ref={ref} className="contact-digit-logo" style={style} aria-hidden="true" />
}
