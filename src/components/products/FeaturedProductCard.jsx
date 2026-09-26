import { toHref } from '../../hooks/useHashRoute'

/**
 * Featured product — the top full-width banner of "Our Products".
 *
 * Layout (unchanged): left = enlarged product name in brand blue
 * (turns white on hover); right = product showcase.
 *
 * Motion-0 shows a right-aligned triptych of vertical product shots
 * (object-cover, kept at a 2:3 ratio so they never stretch or
 * distort — edges are cropped to fill, like a product wall) with a
 * restrained 14px radius and a soft shadow. The three shots are set
 * with generous horizontal spacing and pushed slightly off the right
 * edge so the group "opens up" with breathing room while staying on
 * the right. Glove-0 / Vision-0 still pass a single `image`.
 *
 * A brand-blue pill tag sits under the name stating the product's
 * capability; it inverts (white fill, brand text) on hover so it
 * stays legible once the whole plate turns #5A9CFC.
 *
 * Hover: the whole plate transitions to brand blue (#5A9CFC) — title
 * turns white, the gallery keeps showing and scales gently. White
 * glass card at rest (hairline border + soft shadow + backdrop blur).
 */
export default function FeaturedProductCard({ product }) {
  const gallery = product.images && product.images.length
    ? product.images
    : product.image
      ? [product.image]
      : []

  return (
    <a
      href={toHref(product.href)}
      className="group block transition-transform duration-300 hover:-translate-y-[2px]"
    >
      <div className="relative flex aspect-[16/10] items-center overflow-hidden rounded-[16px] border border-black/[0.08] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-[12px] transition-[background-color,border-color,box-shadow] duration-500 group-hover:border-brandLine group-hover:bg-brand group-hover:shadow-[0_14px_40px_rgba(90,156,252,0.28)] md:aspect-[3.4/1]">
        {/* Left: product name + capability tag */}
        <div className="relative z-10 flex w-[44%] flex-col justify-center px-8 py-8 md:px-12">
          <h3 className="text-4xl font-bold tracking-tight text-brand transition-colors duration-300 group-hover:text-white md:text-6xl">
            {product.name}
          </h3>
          {product.tag && (
            <span className="mt-4 inline-flex w-fit items-center rounded-full bg-brand px-4 py-1.5 text-xs font-medium tracking-wide text-white transition-colors duration-300 group-hover:bg-white group-hover:text-brand md:text-sm">
              {product.tag}
            </span>
          )}
        </div>

        {/* Right: vertical product shots, loose right-aligned triptych */}
        {gallery.length > 0 && (
          <div className="relative flex h-full w-[56%] items-center justify-end gap-2 pr-5 md:gap-6 md:pr-8">
            {gallery.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${product.name} view ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="w-[26%] rounded-[14px] object-cover aspect-[2/3] shadow-[0_6px_18px_rgba(0,0,0,0.12)] transition-transform duration-[600ms] ease-out group-hover:scale-[1.03] md:h-[86%] md:w-auto"
              />
            ))}
          </div>
        )}
      </div>
    </a>
  )
}
