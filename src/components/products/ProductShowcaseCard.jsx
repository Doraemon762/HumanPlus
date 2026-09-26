import { toHref } from '../../hooks/useHashRoute'

/**
 * Home "Products" showcase card — one of three (Motion-0 / Glove-0 /
 * Vision-0). White glass plate by default; on hover the whole plate
 * floods with brand blue (#5A9CFC) and the name + copy flip to white
 * while the product image gets a gentle 1.04 scale.
 *
 * The image keeps its NATIVE aspect ratio (w-auto + max-h/max-w within a
 * fixed-height, centred box) so nothing stretches or crops — required by
 * the brief ("保持原比例、不拉伸、不变形、图片居中"). The three source
 * assets have different ratios (≈2.2 / webp / ≈1.5), so each is
 * letterboxed inside the same plate, never distorted.
 */
export default function ProductShowcaseCard({ product }) {
  return (
    <a
      href={toHref(product.href)}
      className="group relative block overflow-hidden rounded-[18px] border border-black/[0.07] bg-white shadow-[0_10px_34px_-12px_rgba(17,45,90,0.18)] transition-[background-color,border-color,box-shadow,transform] duration-500 ease-out hover:-translate-y-[2px] hover:border-brand hover:bg-brand hover:shadow-[0_20px_46px_-14px_rgba(90,156,252,0.55)]"
    >
      <div className="flex h-[200px] items-center justify-center px-8 md:h-[240px]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="h-auto max-h-full w-auto max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="px-8 pb-10">
        <h3 className="text-[1.75rem] font-bold tracking-tight text-[#252525] transition-colors duration-500 group-hover:text-white">
          {product.name}
        </h3>
        {product.subtitle && (
          <span className="mt-1 inline-block text-sm font-medium text-brand transition-colors duration-500 group-hover:text-white/90">
            {product.subtitle}
          </span>
        )}
      </div>
    </a>
  )
}
