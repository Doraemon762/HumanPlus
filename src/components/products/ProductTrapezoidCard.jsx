import { useEffect, useRef, useState } from 'react'
import { toHref } from '../../hooks/useHashRoute'
import { trapezoidPath } from './trapezoidPath'

/**
 * Trapezoid product card — white card with a subtle glass frame.
 *
 * The silhouette is an SVG path (see trapezoidPath.js): it keeps the
 * exact "\ \" geometry and rounded corners while allowing a real hairline
 * stroke on all four edges. Layout, slant, radius and the parallel gap
 * between the two cards are unchanged from the previous version.
 *
 * slantEdge 'right' → Glove-0 (left card),  right edge leans down-right
 * slantEdge 'left'  → Vision-0 (right card), left edge leans down-right
 */
export default function ProductTrapezoidCard({ product, slantEdge = 'right' }) {
  const ref = useRef(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  /* The path needs real pixel coordinates, so measure the card. */
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const measure = () => {
      const r = el.getBoundingClientRect()
      setSize({ w: Math.round(r.width), h: Math.round(r.height) })
    }
    measure()

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure)
      return () => window.removeEventListener('resize', measure)
    }
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const path = size.w > 0 ? trapezoidPath(size.w, size.h, slantEdge) : null
  const gradientId = `glass-${product.id}`

  return (
    <a
      ref={ref}
      href={toHref(product.href)}
      className="group relative block h-[220px] transition-transform duration-300 hover:-translate-y-[2px] md:h-[300px]"
    >
      {/* Glass plate: white body + hairline stroke + very soft shadow.
          Shadow is a CSS drop-shadow on the wrapper so it follows the
          trapezoid outline instead of a rectangle. */}
      <div className="glass-plate absolute inset-0">
        {path && (
          <svg width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`} className="block" aria-hidden="true">
            <defs>
              {/* Barely-there vertical sheen — reads as glass, not gradient */}
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.96)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.78)" />
              </linearGradient>
            </defs>
            <path
              d={path}
              fill={`url(#${gradientId})`}
              stroke="rgba(17,17,17,0.10)"
              strokeWidth="1"
              className="transition-[stroke] duration-300 group-hover:stroke-brandLine"
            />
          </svg>
        )}
      </div>

      <div className="relative flex h-full flex-col justify-between p-8 md:p-10">
        <h3 className="text-2xl font-bold tracking-tight text-[#252525] md:text-3xl">{product.name}</h3>
        <span
          aria-hidden="true"
          className="self-start text-[11px] font-mono uppercase tracking-[0.25em] text-ink/40 transition-transform duration-300 group-hover:translate-x-[3px]"
        >
          View →
        </span>
      </div>
    </a>
  )
}
