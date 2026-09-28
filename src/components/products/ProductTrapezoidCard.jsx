import { useEffect, useRef, useState } from 'react'
import { toHref } from '../../hooks/useHashRoute'
import { trapezoidPath } from './trapezoidPath'

/**
 * Trapezoid product card — white glass plate with a hairline stroke and
 * the exact "\ \" silhouette (see trapezoidPath.js).
 *
 * Layout (unchanged): enlarged product name on the LEFT (brand-blue →
 * light-blue gradient), keyed-out product image on the RIGHT.
 *
 * Hover: a single soft brand-blue/white sheen sweeps across the plate
 * once (see `.sheen-bar` in index.css). The sheen layer is clipped to
 * the trapezoid outline via `clip-path: path()`, so it never spills
 * outside the shape. No full-plate blue fill, no lift, no colour shift.
 *
 * slantEdge 'right' → Glove-0 (left card),  right edge leans down-right
 * slantEdge 'left'  → Vision-0 (right card), left edge leans down-right
 */
export default function ProductTrapezoidCard({ product, slantEdge = 'right' }) {
  const ref = useRef(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

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
      className="group relative block h-[200px] md:h-[210px]"
    >
      {/* Glass plate: white body + hairline stroke + very soft shadow. */}
      <div className="glass-plate absolute inset-0">
        {path && (
          <svg width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`} className="block" aria-hidden="true">
            <defs>
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
            />
          </svg>
        )}
      </div>

      {/* Product image: keyed-out PNG, right side, enlarged, contained. */}
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute right-0 top-1/2 z-[1] h-[88%] w-[56%] -translate-y-1/2 object-contain object-right"
        />
      )}

      {/* Hover sheen — clipped to the trapezoid outline so it never
          spills outside the plate. Sits above the image (z-1) but below
          the title/tag (z-10). */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={path ? { clipPath: `path('${path}')` } : undefined}
        aria-hidden="true"
      >
        <span className="sheen-bar" />
      </div>

      {/* Title: left side, enlarged, brand blue → light-blue gradient. */}
      <div className="absolute left-7 top-1/2 z-10 max-w-[42%] -translate-y-1/2 md:left-9">
        <h3 className="text-4xl font-bold tracking-tight bg-gradient-to-b from-[#5A9CFC] to-[#8BB9FF] bg-clip-text text-transparent md:text-5xl">
          {product.name}
        </h3>
        {product.tag && (
          <span className="mt-3 inline-flex w-fit items-center rounded-full bg-brand px-3 py-1 text-[11px] font-medium tracking-wide text-white md:px-4 md:py-1.5 md:text-xs">
            {product.tag}
          </span>
        )}
      </div>
    </a>
  )
}
