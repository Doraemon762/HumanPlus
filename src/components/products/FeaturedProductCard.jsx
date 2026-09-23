import { toHref } from '../../hooks/useHashRoute'

/**
 * Featured product — the top full-width banner of "Our Products".
 * White card with a subtle glass frame (hairline border, soft shadow,
 * gentle backdrop blur) and dark typography; a real image fills the
 * whole container with object-fit: cover and no black plate behind it.
 */
export default function FeaturedProductCard({ product }) {
  return (
    <a href={toHref(product.href)} className="group block transition-transform duration-300 hover:-translate-y-[2px]">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[16px] border border-black/[0.08] bg-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-[12px] transition-shadow duration-300 group-hover:shadow-[0_12px_36px_rgba(0,0,0,0.09)] group-hover:border-brandLine md:aspect-[2.6/1]">
        {product.image && (
          <>
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]"
            />
            {/* Whisper of white scrim so dark text stays legible — never
                a black plate, never a heavy gradient (§7 / §4) */}
            <div className="absolute inset-0 bg-white/25" aria-hidden="true" />
          </>
        )}

        <h3 className="absolute left-8 top-8 text-2xl font-bold tracking-tight text-[#252525] md:left-10 md:top-10 md:text-3xl">
          {product.name}
        </h3>
      </div>
    </a>
  )
}
