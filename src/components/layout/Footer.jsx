import { footerNav, site } from '../../data/site'

export default function Footer() {
  return (
    <footer className="border-t border-black/5 px-6 lg:px-10 py-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-3">
            <img src={site.logo} alt="" aria-hidden="true" className="h-8 w-auto" />
            <span className="text-sm font-semibold tracking-[0.2em] text-ink">人一智能</span>
          </div>
          {/* Placeholder note — real company line replaces it later */}
          <p className="mt-2 max-w-md text-sm leading-relaxed text-mute">
            {site.nameEn} — {site.tagline}
          </p>
        </div>

        <div className="md:text-right">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
            {footerNav.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="text-sm text-mute transition-colors duration-200 hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs font-mono text-mute">© 2026 Renyi Intelligence. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
