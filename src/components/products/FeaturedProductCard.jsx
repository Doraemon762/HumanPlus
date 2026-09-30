import { toHref } from '../../hooks/useHashRoute'

/**
 * Featured product — the top full-width banner of "Our Products".
 *
 * Layout (unchanged): left = enlarged product name in a brand-blue →
 * light-blue gradient; right = product showcase triptych.
 *
 * Hover: a single, subtle scale-up of the whole card (scale 1.02 with a
 * ~0.3s ease-out transition). No sheen / glow / glint — the plate stays
 * white at rest and on hover, the title keeps its blue gradient and the
 * tag stays blue-filled.
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
      className="group block transition-transform duration-300 ease-out hover:scale-[1.02]"
    >
      <div className="relative flex aspect-[16/10] items-center overflow-hidden rounded-[20px] border border-black/[0.08] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-[12px] md:aspect-[3.4/1]">
        {/* Left: product name + capability tag */}
        <div className="relative z-10 flex w-[44%] flex-col justify-center px-8 py-8 md:px-12">
          <h3 className="text-4xl font-bold tracking-tight bg-gradient-to-b from-[#5A9CFC] to-[#8BB9FF] bg-clip-text text-transparent md:text-6xl">
            {product.name}
          </h3>
          {product.tag && (
            <span className="mt-4 inline-flex w-fit items-center rounded-full bg-brand px-4 py-1.5 text-xs font-medium tracking-wide text-white md:text-sm">
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
                className="w-[26%] rounded-[18px] object-cover aspect-[2/3] shadow-[0_6px_18px_rgba(0,0,0,0.12)] md:h-[86%] md:w-auto"
              />
            ))}
          </div>
        )}
      </div>
    </a>
  )
}
