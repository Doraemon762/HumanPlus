import MediaPlaceholder from '../ui/MediaPlaceholder'
import { toHref } from '../../hooks/useHashRoute'

/**
 * Standard product card — used on the /products index page (the home
 * page uses FeaturedProductCard + ProductTrapezoidCard instead).
 */
export default function ProductCard({ product }) {
  return (
    <a
      href={toHref(product.href)}
      className="group flex h-full flex-col rounded-[20px] border border-black/10 bg-white p-6 transition-colors duration-300 hover:border-brandLine"
    >
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="aspect-video w-full rounded-[16px] object-cover"
        />
      ) : (
        <MediaPlaceholder label={`${product.name.toUpperCase()} — IMAGE / VIDEO`} />
      )}

      <h3 className="mt-6 text-xl font-bold tracking-tight text-ink">
        {product.name}
        {product.subtitle && <span className="ml-2 text-sm font-medium text-brand">{product.subtitle}</span>}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink/55">{product.description}</p>

      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[11px] font-mono uppercase tracking-[0.25em] text-brand">
        Learn More
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-[3px]">
          →
        </span>
      </span>
    </a>
  )
}
