/**
 * Builds the rounded-trapezoid path used by the product cards.
 *
 * Geometry is identical to the previous CSS-skew version — same 5°
 * (4° on mobile) slant, same 16px corner radius, both cards slanting
 * the same way ("\ \") — but an SVG path can carry a STROKE, which the
 * clipped skew technique could not: the clipped vertical edge of a
 * skewed plate can never show a border.
 *
 * slantEdge 'right' (Glove-0)  → right edge leans down-right
 * slantEdge 'left'  (Vision-0) → left  edge leans down-right
 */
const RADIUS = 20 // design system §4: media 16px / cards 20px — bumped 16→20 (+25%) for softer corners; slant angle untouched

function roundedPolygonPath(points, radius) {
  const n = points.length
  let d = ''

  for (let i = 0; i < n; i++) {
    const prev = points[(i - 1 + n) % n]
    const cur = points[i]
    const next = points[(i + 1) % n]

    const len1 = Math.hypot(prev[0] - cur[0], prev[1] - cur[1])
    const len2 = Math.hypot(next[0] - cur[0], next[1] - cur[1])
    // Never let a corner radius eat more than half of either edge
    const r = Math.min(radius, len1 / 2, len2 / 2)

    const a = [cur[0] + ((prev[0] - cur[0]) / len1) * r, cur[1] + ((prev[1] - cur[1]) / len1) * r]
    const b = [cur[0] + ((next[0] - cur[0]) / len2) * r, cur[1] + ((next[1] - cur[1]) / len2) * r]

    d += i === 0 ? `M ${a[0].toFixed(2)} ${a[1].toFixed(2)}` : ` L ${a[0].toFixed(2)} ${a[1].toFixed(2)}`
    d += ` Q ${cur[0].toFixed(2)} ${cur[1].toFixed(2)} ${b[0].toFixed(2)} ${b[1].toFixed(2)}`
  }

  return `${d} Z`
}

export function trapezoidPath(width, height, slantEdge) {
  const w = Math.max(width, 1)
  const h = Math.max(height, 1)
  const angle = (typeof window !== 'undefined' && window.innerWidth < 768 ? 4 : 5) * (Math.PI / 180)
  const slant = h * Math.tan(angle)

  const points =
    slantEdge === 'left'
      ? [
          [0, 0],
          [w, 0],
          [w, h],
          [slant, h],
        ]
      : [
          [0, 0],
          [w - slant, 0],
          [w, h],
          [0, h],
        ]

  return roundedPolygonPath(points, RADIUS)
}
