/**
 * Placeholder for future image / video assets.
 * Renders the light media frame from the design system:
 * aspect-video, 16px radius, #F5F5F6 → #ECEDEF diagonal gradient,
 * hairline border. The mono label marks what asset belongs here.
 *
 * tone="dark" flips the frame for use inside the Robotics band.
 */
const TONES = {
  light: {
    frame: 'bg-gradient-to-br from-panel to-panel2 border-black/10',
    label: 'text-ink/30',
    rule: 'bg-black/10',
  },
  dark: {
    frame: 'bg-gradient-to-br from-[#161A22] to-[#0F131A] border-white/10',
    label: 'text-white/30',
    rule: 'bg-white/10',
  },
}

export default function MediaPlaceholder({ label = 'IMAGE PLACEHOLDER', tone = 'light', className = '' }) {
  const t = TONES[tone]
  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-[16px] border ${t.frame} ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 dot-grid opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        {/* small crosshair mark to signal "asset goes here" */}
        <span className={`relative h-8 w-8 ${t.label}`}>
          <span className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 ${t.rule}`} />
          <span className={`absolute top-1/2 left-0 w-full h-px -translate-y-1/2 ${t.rule}`} />
        </span>
        <span className={`text-[10px] font-mono uppercase tracking-[0.3em] ${t.label}`}>{label}</span>
      </div>
    </div>
  )
}
