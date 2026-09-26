import { useEffect, useRef } from 'react'

/* ── Motion data field ────────────────────────────────────────────
   The Hero backdrop: a sparse blue particle field that drifts along
   soft, irregular paths and leaves short trails — reading as captured
   human-motion trajectories / data flow, not as a starfield.

   Rules it obeys (Hero brief §4):
     - brand blue only, mixed at low alpha — no orange, no fill washes
     - particles live in the EDGE region; three keep-out ellipses keep
       the centre, the product and the headline block clean
     - thin, very low-alpha links between near neighbours only
     - weight stays below the product: small radii, slow speeds */

/* Keep-out zones in normalised space (fractions of canvas w/h).
   Anything inside is pushed back out, so particles flow AROUND the
   product rather than over it. */
const KEEPOUTS = [
  { cx: 0.5, cy: 0.5, rx: 0.33, ry: 0.38 }, // centre of the frame
  { cx: 0.73, cy: 0.52, rx: 0.19, ry: 0.3 }, // product visual
  { cx: 0.26, cy: 0.52, rx: 0.19, ry: 0.24 }, // headline block
]

const TRAIL = 18 // samples kept per particle
const LINK_MAX = 150 // px — link only to close neighbours
const LINK_ALPHA = 0.14 // ceiling; links must stay barely visible

const rand = (a, b) => a + Math.random() * (b - a)

/* Distance to a keep-out in ellipse units (< 1 == inside). */
const zoneD = (x, y, z, w, h) =>
  Math.hypot((x - z.cx * w) / (z.rx * w), (y - z.cy * h) / (z.ry * h))

/* Outward push accumulated from every zone the point overlaps. */
function repulsion(x, y, w, h) {
  let nx = 0
  let ny = 0
  for (const z of KEEPOUTS) {
    const d = zoneD(x, y, z, w, h)
    if (d < 1.1) {
      const dx = x - z.cx * w
      const dy = y - z.cy * h
      const m = Math.hypot(dx, dy) || 1
      const s = (1.1 - d) / 1.1
      nx += (dx / m) * s
      ny += (dy / m) * s
    }
  }
  return [nx, ny]
}

/* Rejection-sample a start point that sits in the clean edge band. */
function seedPoint(w, h) {
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * w
    const y = Math.random() * h
    if (KEEPOUTS.every((z) => zoneD(x, y, z, w, h) >= 1.05)) return [x, y]
  }
  return [Math.random() < 0.5 ? rand(0, w * 0.12) : rand(w * 0.88, w), Math.random() * h]
}

function makeParticles(count, w, h) {
  return Array.from({ length: count }, () => {
    const [x, y] = seedPoint(w, h)
    /* depth: 0 far (small, dim, slow) → 1 near (bigger, brighter) */
    const depth = Math.random()
    return {
      x,
      y,
      base: rand(0, Math.PI * 2), // heading
      amp: rand(0.35, 0.95), // how much the heading bends
      wf: rand(0.05, 0.16), // bend frequency — slow, organic
      ph: rand(0, Math.PI * 2),
      speed: rand(7, 16) * (0.6 + depth * 0.6), // px/s — drifting, not flying
      r: 0.7 + depth * 1.1,
      alpha: 0.18 + depth * 0.4,
      trail: [],
    }
  })
}

export default function MotionDataField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    /* Brand blue comes from the stylesheet, so the field follows the
       design token instead of hard-coding a hex. */
    const brand =
      getComputedStyle(document.documentElement).getPropertyValue('--brand-rgb').trim() || '90 156 252'

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let w = 0
    let h = 0
    let particles = []
    let raf = 0
    let last = 0
    let clock = 0
    let running = true

    const countFor = () => (w < 700 ? 12 : w < 1200 ? 20 : 28)

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = makeParticles(countFor(), w, h)
    }

    const step = (dt) => {
      clock += dt
      for (const p of particles) {
        /* Heading bends smoothly → curved, non-repeating paths. */
        const ang = p.base + p.amp * Math.sin(clock * p.wf + p.ph)
        const [nx, ny] = repulsion(p.x, p.y, w, h)
        const vx = Math.cos(ang) * p.speed + nx * p.speed * 2.4
        const vy = Math.sin(ang) * p.speed + ny * p.speed * 2.4

        p.x += vx * dt
        p.y += vy * dt

        /* Wrap with margin; the trail is dropped so no line is drawn
           across the screen. */
        let wrapped = false
        if (p.x < -24) (p.x = w + 24), (wrapped = true)
        else if (p.x > w + 24) (p.x = -24), (wrapped = true)
        if (p.y < -24) (p.y = h + 24), (wrapped = true)
        else if (p.y > h + 24) (p.y = -24), (wrapped = true)
        if (wrapped) p.trail.length = 0

        p.trail.push(p.x, p.y)
        if (p.trail.length > TRAIL * 2) p.trail.splice(0, p.trail.length - TRAIL * 2)
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      /* Trajectories — the "captured motion path" read. */
      for (const p of particles) {
        const t = p.trail
        if (t.length < 6) continue
        ctx.beginPath()
        ctx.moveTo(t[0], t[1])
        for (let i = 2; i < t.length; i += 2) ctx.lineTo(t[i], t[i + 1])
        ctx.strokeStyle = `rgb(${brand} / ${0.07 * p.alpha + 0.03})`
        ctx.lineWidth = 0.8
        ctx.stroke()
      }

      /* Data links — only between close neighbours. */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d > LINK_MAX) continue
          const t = 1 - d / LINK_MAX
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgb(${brand} / ${(LINK_ALPHA * t * t).toFixed(3)})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      }

      /* Nodes. */
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgb(${brand} / ${p.alpha.toFixed(3)})`
        ctx.fill()
        /* One soft halo ring for the near layer only — no bloom. */
        if (p.r > 1.3) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * 3.2, 0, Math.PI * 2)
          ctx.fillStyle = `rgb(${brand} / 0.05)`
          ctx.fill()
        }
      }
    }

    const frame = (ts) => {
      if (!running) return
      const dt = last ? Math.min((ts - last) / 1000, 0.05) : 0.016
      last = ts
      step(dt)
      draw()
      raf = requestAnimationFrame(frame)
    }

    resize()

    if (reduce) {
      draw() // static field: respectful of the OS setting
      return () => {}
    }

    /* Pause when the Hero scrolls away or the tab is hidden — the loop
       must not burn cycles off-screen. */
    const io =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting && !document.hidden && !raf) {
                last = 0
                raf = requestAnimationFrame(frame)
              } else if (!entry.isIntersecting && raf) {
                cancelAnimationFrame(raf)
                raf = 0
              }
            },
            { threshold: 0 }
          )
    if (io) io.observe(canvas)
    else raf = requestAnimationFrame(frame)

    const onVisibility = () => {
      if (document.hidden && raf) {
        cancelAnimationFrame(raf)
        raf = 0
      } else if (!document.hidden && !raf) {
        last = 0
        raf = requestAnimationFrame(frame)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(resize)
    if (ro) ro.observe(canvas)
    else window.addEventListener('resize', resize)

    return () => {
      running = false
      if (raf) cancelAnimationFrame(raf)
      io?.disconnect()
      ro?.disconnect()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
}
