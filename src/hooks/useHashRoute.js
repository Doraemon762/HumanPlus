import { useEffect, useState } from 'react'

/**
 * Hash routing — same approach as the HumanPlus-1000 system (~60 lines,
 * no react-router): URLs look like `#/products/motion-0`.
 *
 * Why hash and not history routing:
 * GitHub Pages serves static files only. A deep link such as
 * `/products/motion-0` would hit the server first and 404; with a hash
 * the browser never leaves index.html, so every route is directly
 * reachable and refresh-safe — no 404.html fallback needed.
 */

/* '#/products/' → '/products' ; '' or '#' → '/' */
export function normalizeHash(hash) {
  const raw = String(hash || '').replace(/^#/, '')
  if (!raw || raw === '/') return '/'
  return '/' + raw.replace(/^\/+/, '').replace(/\/+$/, '')
}

/* Route path → real href. Keeps a single place that knows about '#'. */
export function toHref(path) {
  return `#${normalizeHash(path)}`
}

export function navigate(path) {
  window.location.hash = normalizeHash(path)
}

export default function useHashRoute() {
  const [path, setPath] = useState(() => normalizeHash(window.location.hash))

  useEffect(() => {
    const onChange = () => setPath(normalizeHash(window.location.hash))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return path
}
