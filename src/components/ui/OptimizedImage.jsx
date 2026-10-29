import {translate, useSiteLanguage} from '../../i18n'
import manifest from '../../data/media-manifest.json'

export function mediaKey(src) {
  if (typeof src !== 'string') return src
  const base = import.meta.env.BASE_URL
  return (src.startsWith(base) ? src.slice(base.length) : src).replace(/^\.\//, '')
}

export function imageSource(src, targetWidth = 1280) {
  const variants = manifest.images[mediaKey(src)]?.variants
  return variants?.find(item => item.width >= targetWidth)?.src || variants?.at(-1)?.src || src
}

export default function OptimizedImage({ src, alt = '', loading, decoding = 'async', sizes = '100vw', width, height, fetchPriority, ...props }) {
  useSiteLanguage()
  const image = manifest.images[mediaKey(src)]
  return (
    <img
      {...props}
      fetchpriority={fetchPriority}
      src={image?.variants.at(-1)?.src || src}
      srcSet={image?.variants.map(item => `${item.src} ${item.width}w`).join(', ')}
      sizes={image ? sizes : undefined}
      width={width || image?.width}
      height={height || image?.height}
      alt={translate(alt)}
      loading={loading || (fetchPriority === 'high' ? 'eager' : 'lazy')}
      decoding={decoding}
    />
  )
}
