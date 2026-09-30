import { useCallback, useRef } from 'react'
import './BorderGlow.css'

const parseHsl = (value) => {
  const match = value.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/)
  return match ? { h: Number(match[1]), s: Number(match[2]), l: Number(match[3]) } : { h: 214, s: 96, l: 72 }
}

const glowVariables = (color, intensity) => {
  const { h, s, l } = parseHsl(color)
  const alpha = (value) => Math.min(value * intensity, 1)
  return {
    '--glow-color-60': `hsl(${h}deg ${s}% ${l}% / ${alpha(0.6)})`,
    '--glow-color-35': `hsl(${h}deg ${s}% ${l}% / ${alpha(0.35)})`,
  }
}

export default function BorderGlow({ as: Component = 'div', children, className = '', edgeSensitivity = 24, glowColor = '214 96 72', backgroundColor = '#0d121a', borderRadius = 999, glowRadius = 18, glowIntensity = 0.78, coneSpread = 18, colors = ['#5a9cfc', '#ffffff', '#91bff8'], ...props }) {
  const elementRef = useRef(null)

  const handlePointerMove = useCallback((event) => {
    const element = elementRef.current
    if (!element) return
    const rect = element.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const dx = x - rect.width / 2
    const dy = y - rect.height / 2
    const kx = dx === 0 ? Infinity : rect.width / 2 / Math.abs(dx)
    const ky = dy === 0 ? Infinity : rect.height / 2 / Math.abs(dy)
    const proximity = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1)
    const angle = (Math.atan2(dy, dx) * (180 / Math.PI) + 270) % 360
    element.style.setProperty('--edge-proximity', `${(proximity * 100).toFixed(2)}`)
    element.style.setProperty('--cursor-angle', `${angle.toFixed(2)}deg`)
    element.style.setProperty('--pointer-x', `${x.toFixed(1)}px`)
    element.style.setProperty('--pointer-y', `${y.toFixed(1)}px`)
  }, [])

  const handlePointerLeave = useCallback(() => {
    const element = elementRef.current
    if (!element) return
    element.style.setProperty('--edge-proximity', '0')
    element.style.setProperty('--cursor-angle', '45deg')
    element.style.setProperty('--pointer-x', '50%')
    element.style.setProperty('--pointer-y', '50%')
  }, [])

  return (
    <Component ref={elementRef} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} className={`border-glow-card ${className}`.trim()} style={{ '--card-bg': backgroundColor, '--edge-sensitivity': edgeSensitivity, '--border-radius': `${borderRadius}px`, '--glow-padding': `${glowRadius}px`, '--cone-spread': coneSpread, '--gradient-one': colors[0], '--gradient-two': colors[1], '--gradient-three': colors[2], ...glowVariables(glowColor, glowIntensity) }} {...props}>
      <span className="border-glow-edge" aria-hidden="true" />
      <span className="border-glow-content">{children}</span>
    </Component>
  )
}
