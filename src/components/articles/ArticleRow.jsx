import OptimizedImage from '../ui/OptimizedImage'
import MediaPlaceholder from '../ui/MediaPlaceholder'
import { toHref } from '../../hooks/useHashRoute'

/**
 * Full-width horizontal article row — the shared list item for the
 * News and Research pages, so both stay visually identical:
 *   media on the left (0.9fr) · copy on the right (1.1fr)
 *   gap-8, items-center on md+, stacked below that.
 *
 * Width, spacing, type scale, media ratio, hover (media fade + arrow
 * nudge) and reveal timing all come from the News list — Research adds
 * only an ordinal in front of its meta line.
 *
 * `image` null → MediaPlaceholder, so real assets can be dropped in
 * later without touching layout.
 */
export default function ArticleRow({
  ordinal,
  meta,
  title,
  description,
  image = null,
  ctaLabel = 'Read More',
  href,
  mediaLabel = 'IMAGE',
}) {
  return (
    <a href={toHref(href)} className="group grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
      {image ? (
        <OptimizedImage
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="aspect-video w-full rounded-[16px] object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]"
        />
      ) : (
        <MediaPlaceholder label={mediaLabel} className="transition-opacity duration-300 group-hover:opacity-90" />
      )}

      <div>
        <div className="flex items-center gap-4">
          {ordinal && <span className="text-xs font-mono tracking-[0.3em] text-brandLight">{ordinal}</span>}
          <span className="text-xs font-mono uppercase tracking-[0.15em] text-mute">{meta}</span>
        </div>

        <h2 className="mt-3 text-2xl font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-brand">
          {title}
        </h2>

        {description && <p className="mt-4 text-sm leading-relaxed text-ink/60">{description}</p>}

        <span className="mt-6 inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.25em] text-brand">
          {ctaLabel}
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-[3px]">
            →
          </span>
        </span>
      </div>
    </a>
  )
}
