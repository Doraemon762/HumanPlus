import { site } from '../../data/site'

export default function Footer() {
  return (
    <footer className="border-t border-black/5 px-6 py-12 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            {/* Same 80% scale as the navbar logo (32px → 25.6px) */}
            <img src={site.logo} alt="" aria-hidden="true" className="h-[25.6px] w-auto" />
            <span className="text-sm font-semibold tracking-[0.2em] text-ink">人一智能</span>
          </div>
          {/* Placeholder note — real company line replaces it later */}
          <p className="mt-2 max-w-md text-sm leading-relaxed text-mute">
            {site.nameEn} — {site.tagline}
          </p>
        </div>

        <p className="text-xs font-mono text-mute">© 2026 {site.nameEn}. All rights reserved.</p>
      </div>
    </footer>
  )
}
