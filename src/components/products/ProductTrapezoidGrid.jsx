import ProductTrapezoidCard from './ProductTrapezoidCard'

/**
 * Bottom row of "Our Products": two trapezoid cards side by side.
 *
 * The LEFT card slants on its RIGHT edge and the RIGHT card slants on
 * its LEFT edge — both lines lean the same way ("\ \"), so the gap
 * between them reads as one clean diagonal band, never a V or Λ.
 * Mobile stacks them (see §20) and the slant simply gets gentler.
 */
export default function ProductTrapezoidGrid({ products = [] }) {
  if (!products.length) return null

  const [left, right] = products

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
      {left && <ProductTrapezoidCard product={left} slantEdge="right" />}
      {right && <ProductTrapezoidCard product={right} slantEdge="left" />}
    </div>
  )
}
