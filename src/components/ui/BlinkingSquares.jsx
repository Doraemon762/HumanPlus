import { memo, useEffect, useRef } from 'react'
import './BlinkingSquares.css'

const hexToRgb = (hex) => {
  const normalized = hex.replace('#', '')
  const value = Number.parseInt(normalized.length === 3
    ? normalized.split('').map((char) => char + char).join('')
    : normalized, 16)
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  }
}

const seeded = (index, salt) => {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
  return value - Math.floor(value)
}

function BlinkingSquares({
  squareColor = '#2aa3ff',
  gridSize = 52,
  squareSize = 0.56,
  minBrightness = 0.12,
  twinkleSpeed = 0.42,
  twinkleStrength = 0.34,
  opacity = 0.78,
  className = '',
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    if (!canvas || !host) return undefined

    const context = canvas.getContext('2d', { alpha: true })
    const color = hexToRgb(squareColor)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 1
    let height = 1
    let dpr = 1
    let frame = 0
    let visible = false
    let lastFrame = 0

    const resize = () => {
      const rect = host.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      dpr = Math.min(window.devicePixelRatio || 1, 1.25)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (now = 0) => {
      frame = 0
      if (!visible || document.hidden) return
      if (!reducedMotion && now - lastFrame < 32) {
        frame = requestAnimationFrame(draw)
        return
      }
      lastFrame = now
      context.clearRect(0, 0, width, height)

      const columns = Math.max(18, Math.round(gridSize))
      const cell = width / columns
      const rows = Math.ceil(height / cell)
      const size = Math.max(1, cell * squareSize)
      const time = reducedMotion ? 0 : now * 0.001 * twinkleSpeed

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const index = row * columns + column
          const horizontal = column / Math.max(1, columns - 1)
          const vertical = row / Math.max(1, rows - 1)
          const edgeDensity = Math.pow(horizontal, 1.42)
          const centerLift = 0.72 + 0.28 * Math.sin(vertical * Math.PI)
          const probability = edgeDensity * centerLift * 0.82
          if (seeded(index, 1.7) > probability) continue

          const phase = seeded(index, 4.1) * Math.PI * 2
          const rate = 0.58 + seeded(index, 8.9) * 0.76
          const pulse = 0.5 + 0.5 * Math.sin(time * rate * Math.PI * 2 + phase)
          const randomLevel = 0.36 + seeded(index, 12.3) * 0.64
          const brightness = Math.min(1, minBrightness + pulse * twinkleStrength * randomLevel)
          const x = column * cell + (cell - size) * 0.5
          const y = row * cell + (cell - size) * 0.5

          context.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${brightness * opacity * edgeDensity})`
          context.fillRect(x, y, size, size)
        }
      }

      if (!reducedMotion) frame = requestAnimationFrame(draw)
    }

    const start = () => {
      if (!frame) frame = requestAnimationFrame(draw)
    }
    const stop = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = 0
    }
    const onVisibility = () => (document.hidden ? stop() : visible && start())
    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (visible) start()
    })
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    }, { threshold: 0.01 })

    resizeObserver.observe(host)
    visibilityObserver.observe(host)
    document.addEventListener('visibilitychange', onVisibility)
    resize()

    return () => {
      stop()
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [gridSize, minBrightness, opacity, squareColor, squareSize, twinkleSpeed, twinkleStrength])

  return <canvas ref={canvasRef} className={`blinking-squares ${className}`.trim()} aria-hidden="true" />
}

export default memo(BlinkingSquares)
