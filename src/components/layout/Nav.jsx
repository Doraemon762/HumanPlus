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

/* External links (Data / Dataset → HumanPlus1000) open in a new tab and
   never get the in-app hash prefix. */
const externalProps = (url) => ({ href: url, target: '_blank', rel: 'noopener noreferrer' })

export default function Nav({ path }) {
  /* Desktop: which dropdown is open (keyed by nav label). Hover-driven
     on the whole li wrapper, so moving the cursor across the small gap
     between trigger and panel never closes it. */
  const [openMenu, setOpenMenu] = useState(null)
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

  const scheduleClose = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120)
  }
  const cancelClose = () => clearTimeout(closeTimer.current)

  const linkClass = (href, base) =>
    `${base} ${isActive(path, href) ? 'text-brand' : 'text-ink/70 hover:text-ink'}`

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Brand: logo left, wordmark right — real logo asset, no filters. */}
        <a href={toHref('/')} className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <img src={site.logo} alt="HumanPlus logo" className="h-[28.8px] w-auto" />
          <span className="text-sm font-semibold tracking-[0.2em] text-ink">人一智能</span>
        </a>

        {/* ── Desktop nav ── */}
        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) =>
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
                    className={`flex items-center gap-1.5 text-sm transition-colors duration-200 ${
                      openMenu === item.label || isActive(path, item.href) ? 'text-brand' : 'text-ink/70 hover:text-ink'
                    }`}
                  >
                    {item.label}
                    <Chevron open={openMenu === item.label} />
                  </a>
                ) : (
                  <button
                    type="button"
                    aria-expanded={openMenu === item.label}
                    onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                    className={`flex items-center gap-1.5 text-sm transition-colors duration-200 ${
                      openMenu === item.label || isActive(path, item.href) ? 'text-brand' : 'text-ink/70 hover:text-ink'
                    }`}
                  >
                    {item.label}
                    <Chevron open={openMenu === item.label} />
                  </button>
                )}

                <div className={`dropdown-panel absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 ${openMenu === item.label ? 'open' : ''}`}>
                  <div className="min-w-[240px] rounded-[12px] border border-black/10 bg-white py-2 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.18)]">
                    {item.children.map((child) =>
                      child.external ? (
                        <a
                          key={child.label}
                          {...externalProps(child.external)}
                          className="block px-5 py-2.5 text-sm transition-colors duration-150 hover:bg-brandSoft hover:text-brand text-ink/70"
                        >
                          {child.label}
                        </a>
                      ) : (
                        <a
                          key={child.label}
                          href={toHref(child.href)}
                          className={`block px-5 py-2.5 text-sm transition-colors duration-150 hover:bg-brandSoft hover:text-brand ${
                            isActive(path, child.href) ? 'text-brand' : 'text-ink/70'
                          }`}
                        >
                          {child.label}
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
                    className={`text-sm transition-colors duration-200 ${linkClass(item.href, '')}`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <a href={toHref(item.href)} className={`text-sm transition-colors duration-200 ${linkClass(item.href, '')}`}>
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
          className="flex h-10 w-10 items-center justify-center md:hidden"
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
      <div className={`accordion-body md:hidden ${mobileOpen ? 'open' : ''}`}>
        <div>
          <ul className="border-t border-black/5 bg-white px-6 pb-6 pt-2">
            {nav.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <button
                    type="button"
                    aria-expanded={mobileSub === item.label}
                    onClick={() => setMobileSub(mobileSub === item.label ? null : item.label)}
                    className={`flex w-full items-center justify-between py-3 text-sm ${isActive(path, item.href) ? 'text-brand' : 'text-ink'}`}
                  >
                    {item.label}
                    <Chevron open={mobileSub === item.label} />
                  </button>
                  <div className={`accordion-body ${mobileSub === item.label ? 'open' : ''}`}>
                    <div>
                      <ul className="pb-2">
                        <li>
                          <a
                            {...(item.external ? externalProps(item.external) : { href: toHref(item.href) })}
                            className={`block border-l border-black/10 py-2.5 pl-4 text-sm ${isActive(path, item.href) ? 'text-brand' : 'text-ink/60'}`}
                          >
                            All {item.label}
                          </a>
                        </li>
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
                      className={`block py-3 text-sm ${isActive(path, item.href) ? 'text-brand' : 'text-ink'}`}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <a
                      href={toHref(item.href)}
                      className={`block py-3 text-sm ${isActive(path, item.href) ? 'text-brand' : 'text-ink'}`}
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
