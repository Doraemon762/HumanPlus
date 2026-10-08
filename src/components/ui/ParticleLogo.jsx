import { useEffect, useRef } from 'react'

const LOGO_SOURCE = 'images/logo/logo.png'
const ORBIT_LEAD_MS = 1000
const ASSEMBLE_MS = 3800
const TOTAL_MS = ORBIT_LEAD_MS + ASSEMBLE_MS

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
const easeInOutCubic = (t) => (
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
)

export default function ParticleLogo({ onReveal }) {
  const canvasRef = useRef(null)
  const playedRef = useRef(false)
  const revealedRef = useRef(false)
  const revealCallbackRef = useRef(onReveal)
  revealCallbackRef.current = onReveal

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    if (!canvas || !host) return undefined

    const context = canvas.getContext('2d')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let particles = []
    let startTime = 0
    let visible = false
    let size = { width: 0, height: 0, dpr: 1 }
    let revealTimer = 0
    const pointer = { x: 0, y: 0, active: false }

    const revealContent = () => {
      if (revealedRef.current) return
      revealedRef.current = true
      revealCallbackRef.current?.()
    }

    const resize = () => {
      const rect = host.getBoundingClientRect()
      // A full-viewport canvas becomes extremely expensive on 2x/3x screens.
      // This cap keeps the dots crisp while avoiding multi-million-pixel
      // redraws during the intro.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.35)
      size = { width: rect.width, height: rect.height, dpr }
      canvas.width = Math.max(1, Math.round(rect.width * dpr))
      canvas.height = Math.max(1, Math.round(rect.height * dpr))
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (now) => {
      frame = 0
      if (!visible || !particles.length) return

      const elapsed = reducedMotion ? TOTAL_MS : now - startTime
      const progress = Math.max(0, Math.min((elapsed - ORBIT_LEAD_MS) / ASSEMBLE_MS, 1))
      const orbitProgress = Math.min(elapsed / (ORBIT_LEAD_MS + ASSEMBLE_MS * 0.44), 1)
      const introOpacity = reducedMotion ? 1 : Math.min(1, elapsed / 320)
      const gather = easeOutCubic(Math.min(progress / 0.44, 1))
      const travel = easeInOutCubic(Math.max(0, Math.min((progress - 0.49) / 0.35, 1)))
      const { width, height } = size
      const largeWidth = Math.min(width * 0.42, height * 0.62)
      const finalWidth = Math.min(width * 0.42, height * 0.59)
      const logoRatio = 1281 / 1109
      const largeCenter = { x: width * 0.5, y: height * 0.51 }
      const finalCenter = { x: width * 0.81, y: height * 0.64 }
      const centerX = largeCenter.x + (finalCenter.x - largeCenter.x) * travel
      const centerY = largeCenter.y + (finalCenter.y - largeCenter.y) * travel
      const logoWidth = largeWidth + (finalWidth - largeWidth) * travel
      const logoHeight = logoWidth / logoRatio
      const yaw = orbitProgress * Math.PI * 2.45
      const pitch = 0.22 + Math.sin(orbitProgress * Math.PI * 1.8) * 0.46
      const yawCos = Math.cos(yaw)
      const yawSin = Math.sin(yaw)
      const pitchCos = Math.cos(pitch)
      const pitchSin = Math.sin(pitch)

      context.clearRect(0, 0, width, height)
      context.globalCompositeOperation = 'lighter'

      particles.forEach((particle) => {
        const targetX = centerX + particle.nx * logoWidth
        const targetY = centerY + particle.ny * logoHeight
        // Build an actual 3D cloud, rotate it around two spatial axes, then
        // project it through a perspective camera. Near particles grow and
        // brighten; far particles recede and dim before all points settle
        // onto the flat logo plane.
        const yawX = particle.spaceX * yawCos + particle.spaceZ * yawSin
        const yawZ = -particle.spaceX * yawSin + particle.spaceZ * yawCos
        const rotatedY = particle.spaceY * pitchCos - yawZ * pitchSin
        const rotatedZ = particle.spaceY * pitchSin + yawZ * pitchCos
        const cameraDistance = 1.62
        const perspective = Math.max(0.42, Math.min(2.15, cameraDistance / (cameraDistance - rotatedZ)))
        const cloudExtent = Math.min(width, height) * 0.72
        const cloudX = largeCenter.x + yawX * cloudExtent * perspective
        const cloudY = largeCenter.y + rotatedY * cloudExtent * perspective
        const shimmer = progress >= 0.84
          ? Math.sin(now * 0.0017 + particle.phase) * 0.65
          : 0
        const x = cloudX + (targetX - cloudX) * gather + shimmer
        const y = cloudY + (targetY - cloudY) * gather + shimmer * 0.45
        const pointerDistance = Math.hypot(x - pointer.x, y - pointer.y)
        const hoverDistance = 54
        const hoverLinear = pointer.active && progress > 0.84
          ? Math.max(0, 1 - pointerDistance / hoverDistance)
          : 0
        const hover = hoverLinear * hoverLinear * (3 - 2 * hoverLinear)
        const depthLight = Math.max(0.34, Math.min(1, 0.28 + perspective * 0.48))
        const opacity = introOpacity
          * Math.min(1, particle.opacity + hover * 0.62)
          * (depthLight + (1 - depthLight) * gather)
        const depthSize = perspective + (1 - perspective) * gather
        const radius = particle.radius * (0.58 + gather * 0.42) * depthSize

        if (hover > 0.015) {
          const glowRadius = radius * (4.8 + hover * 2.8)
          const glow = context.createRadialGradient(x, y, 0, x, y, glowRadius)
          glow.addColorStop(0, `rgba(242, 249, 255, ${0.42 * hover})`)
          glow.addColorStop(0.28, `rgba(216, 237, 255, ${0.24 * hover})`)
          glow.addColorStop(1, 'rgba(175, 218, 255, 0)')
          context.beginPath()
          context.globalAlpha = 1
          context.fillStyle = glow
          context.arc(x, y, glowRadius, 0, Math.PI * 2)
          context.fill()
        }

        context.beginPath()
        context.fillStyle = hover > 0.015 ? '#f4f9ff' : particle.color
        context.globalAlpha = Math.min(1, opacity + hover * 0.38)
        context.arc(x, y, radius * (1 + hover * 0.06), 0, Math.PI * 2)
        context.fill()
      })

      context.globalAlpha = 1
      context.globalCompositeOperation = 'source-over'
      if (progress >= 0.49) revealContent()
      // Stop consuming a full animation frame after the intro. Pointer
      // movement requests a single new frame for the interactive glow.
      if (progress < 1) frame = requestAnimationFrame(draw)
    }

    const buildParticles = (image) => {
      const sample = document.createElement('canvas')
      const sampleWidth = 220
      const sampleHeight = Math.round(sampleWidth / (image.width / image.height))
      sample.width = sampleWidth
      sample.height = sampleHeight
      const sampleContext = sample.getContext('2d', { willReadFrequently: true })
      sampleContext.drawImage(image, 0, 0, sampleWidth, sampleHeight)
      const pixels = sampleContext.getImageData(0, 0, sampleWidth, sampleHeight).data
      const points = []

      for (let y = 0; y < sampleHeight; y += 8) {
        for (let x = 0; x < sampleWidth; x += 8) {
          const offset = (y * sampleWidth + x) * 4
          const alpha = pixels[offset + 3]
          const red = pixels[offset]
          const green = pixels[offset + 1]
          const blue = pixels[offset + 2]
          const isLogo = alpha > 40 && !(red > 242 && green > 242 && blue > 242)
          if (!isLogo) continue

          // Use the source artwork's actual colour instead of its vertical
          // position: the dark left stroke continues into the lower-left.
          const isLightPiece = green > 112
          const variant = (x + y) % 3
          const angle = ((x * 13 + y * 7) % 360) * (Math.PI / 180)
          const depth = Math.abs(Math.sin(x * 0.31 + y * 0.17))
          const orbitRadius = 0.34 + Math.abs(Math.sin(x * 0.09 - y * 0.14)) * 0.56
          const elevation = (depth - 0.5) * Math.PI * 0.94
          points.push({
            nx: x / sampleWidth - 0.5,
            ny: y / sampleHeight - 0.5,
            color: isLightPiece
              ? (variant === 0 ? '#b7d8ff' : '#78b3ff')
              : (variant === 0 ? '#2f78df' : '#5a9cfc'),
            radius: 0.92 + Math.abs(Math.sin(x * 1.7 + y)) * 0.78,
            opacity: 0.72 + Math.abs(Math.sin(x * 0.41 + y * 0.73)) * 0.28,
            phase: x * 0.18 + y * 0.11,
            spaceX: Math.cos(elevation) * Math.cos(angle) * orbitRadius,
            spaceY: Math.sin(elevation) * orbitRadius * 0.82,
            spaceZ: Math.cos(elevation) * Math.sin(angle) * orbitRadius,
          })
        }
      }

      particles = points
      if (!particles.length) {
        revealContent()
        return
      }

      const rect = host.getBoundingClientRect()
      visible = visible || (rect.bottom > 0 && rect.top < window.innerHeight)
      if (visible && !playedRef.current) {
        playedRef.current = true
        startTime = performance.now()
        frame = requestAnimationFrame(draw)
      }
    }

    resize()
    const image = new Image()
    image.decoding = 'async'
    image.onload = () => buildParticles(image)
    image.onerror = revealContent
    image.src = LOGO_SOURCE
    revealTimer = window.setTimeout(revealContent, TOTAL_MS + 1400)

    const onPointerMove = (event) => {
      const rect = host.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = true
      if (playedRef.current && visible && !frame) frame = requestAnimationFrame(draw)
    }
    const onPointerLeave = () => {
      pointer.active = false
      if (playedRef.current && visible && !frame) frame = requestAnimationFrame(draw)
    }
    host.addEventListener('pointermove', onPointerMove, { passive: true })
    host.addEventListener('pointerleave', onPointerLeave)

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && particles.length && !playedRef.current) {
        playedRef.current = true
        startTime = performance.now()
        frame = requestAnimationFrame(draw)
      }
      if (!visible && frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
    }, { threshold: 0.36 })
    observer.observe(host)

    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (playedRef.current && visible && !frame) {
        startTime = performance.now() - TOTAL_MS
        frame = requestAnimationFrame(draw)
      }
    })
    resizeObserver.observe(host)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(revealTimer)
      observer.disconnect()
      resizeObserver.disconnect()
      host.removeEventListener('pointermove', onPointerMove)
      host.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="company-particle-logo" aria-hidden="true" />
}
