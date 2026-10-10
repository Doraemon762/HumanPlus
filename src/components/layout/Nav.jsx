import OptimizedImage from '../ui/OptimizedImage'
import { useEffect, useRef, useState } from 'react'
import { nav, site } from '../../data/site'
import { toHref } from '../../hooks/useHashRoute'

function Chevron({ open }) {
  return (
    <svg viewBox="0 0 12 12" className={`h-3 w-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true">
      <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/* A top-level item is active on its own route AND on any child route. */
const isActive = (path, href) => (href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`))
const isExactActive = (path, href) => (href === '/' ? path === '/' : path === href)

const isItemActive = (path, item) => (
  isActive(path, item.href)
  || item.children?.some((child) => !child.external && isActive(path, child.href))
)

/* External links (Data / Dataset → HumanPlus1000) open in a new tab and
   never get the in-app hash prefix. */
const externalProps = (url) => ({ href: url, target: '_blank', rel: 'noopener noreferrer' })

/* A dropdown parent that already lists a child pointing at its own route
   (e.g. Contact → Contact self-link) should NOT also render the generic
   "All {label}" parent entry in the mobile accordion — that would show a
   duplicate parent link. */
const hasParentSelfLink = (item) =>
  Array.isArray(item.children) && item.children.some((c) => c.href === item.href)

export default function Nav({ path }) {
  /* Desktop: which dropdown is open (keyed by nav label). Hover-driven
     on the whole li wrapper, so moving the cursor across the small gap
     between trigger and panel never closes it. */
  const [openMenu, setOpenMenu] = useState(null)
  const [homePastIntro, setHomePastIntro] = useState(false)
  const closeTimer = useRef(null)

  /* Mobile: hamburger + accordion state */
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSub, setMobileSub] = useState(null)

  /* Route change closes everything (every nav item is now a route) */
  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
    setMobileSub(null)
  }, [path])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpenMenu(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  useEffect(() => {
    if (path !== '/') {
      setHomePastIntro(false)
      return undefined
    }

    let frame = 0
    const update = () => {
      frame = 0
      const products = document.getElementById('products')
      setHomePastIntro(Boolean(products && products.getBoundingClientRect().top <= 72))
    }
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [path])

  const scheduleClose = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120)
  }
  const cancelClose = () => clearTimeout(closeTimer.current)

  const linkClass = (href, base) =>
    `${base} ${isExactActive(path, href) ? 'text-brand' : 'text-ink/70 hover:text-brand'}`

  return (
    <nav className={`site-nav fixed top-0 left-0 right-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md ${path === '/' ? 'site-nav--home' : ''} ${homePastIntro ? 'site-nav--home-past-intro' : ''}`}>
      <div className="relative mx-auto flex h-[72px] w-full items-center px-6 lg:px-12">
        {/* Brand: complete HumanPlus wordmark logo (no separate icon / wordmark). */}
        <a href={toHref('/')} className="flex items-center" onClick={() => setMobileOpen(false)}>
          <OptimizedImage src={site.logo} alt="HumanPlus" loading="eager" sizes="120px" className="h-[28.8px] w-auto" />
        </a>

        {/* ── Desktop nav ── */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
          {nav.map((item, i) =>
            item.children ? (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => {
                  cancelClose()
                  setOpenMenu(item.label)
                }}
                onMouseLeave={scheduleClose}
              >
                {item.external ? (
                  /* Parent with an external target AND a dropdown: the
                     label itself is the external link; hover still opens
                     the panel for Dataset / Application. */
                  <a
                    {...externalProps(item.external)}
                    className={`flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] transition-colors duration-200 ${
                      openMenu === item.label || isItemActive(path, item) ? 'text-brand' : 'text-ink/70 hover:text-brand'
                    }`}
                  >
                    {item.label}
                    <Chevron open={openMenu === item.label} />
                  </a>
                ) : (
                  /* Internal parent with a dropdown: the label is a REAL
                     link to its own route (click → navigate), while hover
                     still opens the flyout (handled on the <li> wrapper). */
                  <a
                    href={toHref(item.href)}
                    className={`flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] transition-colors duration-200 ${
                      openMenu === item.label || isItemActive(path, item) ? 'text-brand' : 'text-ink/70 hover:text-brand'
                    }`}
                  >
                    {item.label}
                    <Chevron open={openMenu === item.label} />
                  </a>
                )}

                <div className={`dropdown-panel absolute top-full z-50 pt-3 ${i === nav.length - 1 ? 'right-0' : 'left-1/2 -translate-x-1/2'} ${openMenu === item.label ? 'open' : ''}`}>
                  <div className="site-nav-dropdown min-w-[240px] py-2">
                    {item.children.map((child) =>
                      child.external ? (
                        <a
                          key={child.label}
                          {...externalProps(child.external)}
                          className="site-nav-dropdown-link block px-5 py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-ink/70"
                        >
                          <span>{child.label}</span>
                        </a>
                      ) : (
                        <a
                          key={child.label}
                          href={toHref(child.href)}
                          className={`site-nav-dropdown-link block px-5 py-2.5 text-xs font-medium uppercase tracking-[0.1em] ${
                            isActive(path, child.href) ? 'is-active text-brand' : 'text-ink/70'
                          }`}
                        >
                          <span>{child.label}</span>
                        </a>
                      )
                    )}
                  </div>
                </div>
              </li>
            ) : (
              <li key={item.label}>
                {item.external ? (
                  <a
                    {...externalProps(item.external)}
                    className={`text-[12px] font-medium uppercase tracking-[0.14em] transition-colors duration-200 ${linkClass(item.href, '')}`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <a href={toHref(item.href)} className={`text-[12px] font-medium uppercase tracking-[0.14em] transition-colors duration-200 ${linkClass(item.href, '')}`}>
                    {item.label}
                  </a>
                )}
              </li>
            )
          )}
        </ul>

        {/* ── Mobile hamburger ── */}
        <button
          type="button"
          className="site-nav-mobile-toggle ml-auto flex h-10 w-10 items-center justify-center lg:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 top-0 h-px w-full bg-ink transition-transform duration-200 ${mobileOpen ? 'translate-y-[5.5px] rotate-45' : ''}`} />
            <span className={`absolute left-0 bottom-0 h-px w-full bg-ink transition-transform duration-200 ${mobileOpen ? '-translate-y-[5.5px] -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      {/* ── Mobile panel ── */}
      <div className={`accordion-body lg:hidden ${mobileOpen ? 'open' : ''}`}>
        <div>
          <ul className="site-nav-mobile-panel border-t border-black/5 bg-white px-6 pb-6 pt-2">
            {nav.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <button
                    type="button"
                    aria-expanded={mobileSub === item.label}
                    onClick={() => setMobileSub(mobileSub === item.label ? null : item.label)}
                    className={`flex w-full items-center justify-between py-3 text-sm ${isItemActive(path, item) ? 'text-brand' : 'text-ink'}`}
                  >
                    {item.label}
                    <Chevron open={mobileSub === item.label} />
                  </button>
                  <div className={`accordion-body ${mobileSub === item.label ? 'open' : ''}`}>
                    <div>
                      <ul className="pb-2">
                        {!hasParentSelfLink(item) && (
                          <li>
                            <a
                              {...(item.external ? externalProps(item.external) : { href: toHref(item.href) })}
                              className={`block border-l border-black/10 py-2.5 pl-4 text-sm ${isActive(path, item.href) ? 'text-brand' : 'text-ink/60'}`}
                            >
                              All {item.label}
                            </a>
                          </li>
                        )}
                        {item.children.map((child) =>
                          child.external ? (
                            <li key={child.label}>
                              <a
                                {...externalProps(child.external)}
                                className="block border-l border-black/10 py-2.5 pl-4 text-sm text-ink/60"
                              >
                                {child.label}
                              </a>
                            </li>
                          ) : (
                            <li key={child.label}>
                              <a
                                href={toHref(child.href)}
                                className={`block border-l border-black/10 py-2.5 pl-4 text-sm ${
                                  isActive(path, child.href) ? 'text-brand' : 'text-ink/60'
                                }`}
                              >
                                {child.label}
                              </a>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={item.label}>
                  {item.external ? (
                    <a
                      {...externalProps(item.external)}
                      className={`block py-3 text-sm transition-colors duration-200 ${isExactActive(path, item.href) ? 'text-brand' : 'text-ink/70 hover:text-brand'}`}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <a
                      href={toHref(item.href)}
                      className={`block py-3 text-sm transition-colors duration-200 ${isExactActive(path, item.href) ? 'text-brand' : 'text-ink/70 hover:text-brand'}`}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
