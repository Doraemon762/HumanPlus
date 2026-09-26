import Reveal from '../ui/Reveal'

/* ── Five product attributes ──────────────────────────────────────
   No section title, no cards: one centred statement, then five
   line icons at comfortable spacing. Icons are hand-drawn to keep the
   project dependency-free — one visual language across all five
   (24px grid, 1.25 stroke, round caps, one brand-blue accent each). */

const ICON = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className: 'h-9 w-9 md:h-10 md:w-10',
  'aria-hidden': 'true',
}

/* 01 · Natural Wear — body inside a garment */
function IconNaturalWear() {
  return (
    <svg {...ICON}>
      <circle cx="12" cy="4.3" r="2.1" />
      <path d="M5.6 9.4 9 7.8l3 2.1 3-2.1 3.4 1.6-.5 10.4H6.1z" />
      <path d="M9 7.8 6.4 13.4M15 7.8l2.6 5.6" />
      <circle className="text-brand" cx="12" cy="12.4" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

/* 02 · Long-Term Stability — continuous time + steady waveform */
function IconStability() {
  return (
    <svg {...ICON}>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M7.4 12c1.5-2.4 3-2.4 4.6 0s3.1 2.4 4.6 0" className="text-brand" />
      <path d="M12 7.6V12" opacity="0.5" />
    </svg>
  )
}

/* 03 · Full-Body Motion — skeleton with joint nodes */
function IconFullBody() {
  return (
    <svg {...ICON}>
      <circle cx="12" cy="4.4" r="1.9" />
      <path d="M12 6.4v6.4M9.2 8.6h5.6M9.2 8.6 7 13.2l.5 3.6M14.8 8.6l2.2 4.6-.5 3.6M12 12.8 9.6 17.8 9 21.3M12 12.8l2.4 5 0.6 3.5" />
      <circle className="text-brand" cx="9.2" cy="8.6" r="1" fill="currentColor" stroke="none" />
      <circle className="text-brand" cx="14.8" cy="8.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

/* 04 · Comfort & Design — garment cut */
function IconComfort() {
  return (
    <svg {...ICON}>
      <path d="M9.2 3.6 12 5.6l2.8-2 4.4 3.1-1.6 3.5-1.5-.8V20.4H7.9V9.4l-1.5.8L4.8 6.7z" />
      <path d="M9.2 3.6c.9 1.4 1.9 2.1 2.8 2.1s1.9-.7 2.8-2.1" className="text-brand" />
    </svg>
  )
}

/* 05 · Washable — droplet over a water line */
function IconWashable() {
  return (
    <svg {...ICON}>
      <path d="M12 3.4c0 0-4.4 4.9-4.4 8.4a4.4 4.4 0 0 0 8.8 0C16.4 8.3 12 3.4 12 3.4z" />
      <path d="M4.6 19.6c1.6-1.5 3.2-1.5 4.7 0s3.1 1.5 4.7 0 3.1-1.5 4.7 0" className="text-brand" />
    </svg>
  )
}

const FEATURES = [
  {
    Icon: IconNaturalWear,
    name: 'Natural Wear',
    zh: '无感化',
    copy: 'Designed to move with the body, without getting in the way.',
  },
  {
    Icon: IconStability,
    name: 'Long-Term Stability',
    zh: '长时间稳定',
    copy: 'Stable motion capture for extended real-world activities.',
  },
  {
    Icon: IconFullBody,
    name: 'Full-Body Motion',
    zh: '全身捕捉',
    copy: 'Capturing coordinated movement across the entire body.',
  },
  {
    Icon: IconComfort,
    name: 'Comfort & Design',
    zh: '美观舒适',
    copy: 'Designed for comfort, fit, and everyday wear.',
  },
  {
    Icon: IconWashable,
    name: 'Washable',
    zh: '可水洗',
    copy: 'Built for easy care and repeated everyday use.',
  },
]

export default function MotionZeroFeatures() {
  return (
    <section className="m0-features bg-black">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-[820px] text-center">
          <p className="m0-features-lead">
            Motion-0 is designed to capture human movement naturally, comfortably, and reliably — enabling
            stable full-body motion capture in the real world.
          </p>
        </Reveal>

        <div className="m0-features-grid">
          {FEATURES.map(({ Icon, name, zh, copy }, i) => (
            <Reveal key={name} delay={Math.min(i, 4)} className="m0-feature group">
              <span className="m0-feature-icon">
                <Icon />
              </span>
              <h3 className="m0-feature-name">{name}</h3>
              <span className="m0-feature-zh">{zh}</span>
              <p className="m0-feature-copy">{copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
