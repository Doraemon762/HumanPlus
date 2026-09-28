/* ── Hero ─────────────────────────────────────────────────────────
   Full-screen video first screen.
   - 100vw × 100vh, object-fit: cover, no black bars.
   - Muted autoplay loop (playsInline for mobile autoplay).
   - Poster frame for instant first paint before the video buffers.
   - Lower-left editorial copy in the display face (庞门正道标题体).
   - CTA: capsule slider — a recessed frosted track that a brand-blue
     thumb sweeps across on hover, neumorphic rim + sheen.
   - Readability: layered text-shadow + very soft bottom-left scrim
     (no opaque card, no full-screen overlay). */

export default function HeroSection() {
  return (
    <section id="hero" className="relative h-[100vh] w-full overflow-hidden bg-black">
      <video
        className="pointer-events-none absolute inset-0 block h-full w-full object-cover"
        src="videos/home/hero-laundry.mp4"
        poster="videos/home/hero-laundry-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Soft bottom-left scrim — keeps copy readable without a hard card */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

      {/* Lower-left content: headline + CTA */}
      <div className="absolute z-10 w-[min(92%,1180px)] left-[clamp(1.5rem,5vw,5rem)] bottom-[clamp(2.25rem,9vh,7rem)]">
        {/* Headline + CTA read as ONE visual block: line 1 is pure copy,
            line 2 is a flex row whose tail the capsule rides on. */}
        <h1
          className="font-display font-light leading-[1.28] text-white"
          style={{
            fontSize: 'clamp(1.9rem, 4.4vw, 4rem)',
            letterSpacing: '0.055em',
            textShadow:
              '0 2px 26px rgba(0,0,0,.55), 0 1px 4px rgba(0,0,0,.65)',
          }}
        >
          {/* Line 1 — never wraps on desktop; the break is authored,
              not accidental, so the two-line rhythm stays identical at
              every width. */}
          <span className="block md:whitespace-nowrap">
            The Future of Intelligence Begins
          </span>

          {/* Line 2 — copy + CTA on one baseline, centred on each other.
              flex-wrap lets the capsule drop to its own line on narrow
              screens instead of forcing horizontal overflow. */}
          <span className="mt-[clamp(0.1rem,0.7vh,0.5rem)] flex flex-wrap items-center gap-x-[clamp(0.9rem,1.8vw,1.75rem)] gap-y-4">
            <span>With What We Wear</span>

            {/* ── Glass capsule CTA ───────────────────────────────────
                A single pale-blue translucent pane, not a plastic slab:
                - body    : low-saturation ice-white → haze-blue → sky-blue
                - rim     : hairline translucent white, brightest top-left
                - depth   : inset top highlight + inset bottom blue-grey
                - float   : wide, diffuse, NEVER black drop shadow
                - hover   : one soft specular band sweeps across the glass
                Aspect ratio lands at 2.7–3.0 : 1 across breakpoints. */}
            <a
              href="#/hardware/motion-0"
              aria-label="Motion-0"
              className="group relative inline-flex h-[42px] w-[min(42vw,158px)] shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/40 font-display backdrop-blur-[6px] transition-all duration-500 hover:-translate-y-0.5 md:h-[48px] md:w-[clamp(168px,14vw,186px)]"
              style={{
                /* Two stacked fills:
                   1. a faint blue-grey bloom behind the label — buys the
                      white glyph enough separation over bright video frames
                      without resorting to a text-shadow;
                   2. the pane itself: ice-white → haze blue → pale sky.
                   Blue is weighted up on purpose: over video the pane reads
                   neutral grey unless the blue channel carries real alpha. */
                background:
                  'radial-gradient(64% 88% at 50% 52%, rgba(58,94,142,0.33) 0%, rgba(58,94,142,0) 74%),' +
                  'linear-gradient(105deg, rgba(255,255,255,0.42) 0%, rgba(203,222,247,0.44) 38%, rgba(163,199,244,0.56) 72%, rgba(146,189,242,0.64) 100%)',
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.72),' + // top refraction
                  'inset 1px 0 0 rgba(255,255,255,0.40),' + // left refraction
                  'inset 0 10px 14px -12px rgba(255,255,255,0.55),' + // upper inner glow
                  'inset 0 -10px 16px -12px rgba(96,130,175,0.55),' + // lower glass depth
                  '0 20px 44px -20px rgba(35,60,95,0.45),' + // diffuse float
                  '0 3px 10px -4px rgba(35,60,95,0.20)',
                /* Inherited from <h1> — capsule copy stays shadow-free. */
                textShadow: 'none',
                letterSpacing: 'normal',
              }}
            >
              {/* Upper refraction band — the lit top edge of the pane */}
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/45 via-white/10 to-transparent"
                aria-hidden="true"
              />

              {/* Soft refraction hotspot drifting off the upper-left */}
              <span
                className="pointer-events-none absolute left-[14%] top-[12%] h-5 w-16 rounded-full bg-white/45 opacity-70 blur-[10px]"
                aria-hidden="true"
              />

              {/* Specular sweep — the only motion on hover; a single band
                  of light gliding across the glass, never a fill */}
              <span
                className="pointer-events-none absolute -inset-y-4 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-all duration-[900ms] ease-out group-hover:left-[130%] group-hover:opacity-100"
                aria-hidden="true"
              />

              {/* Label — thin weight, open tracking, translucent white.
                  The 1px blue-grey wash is a legibility floor, not a
                  highlight: the video behind the glass swings from dark to
                  bright frame to frame, so contrast can't be tuned against
                  any single frame. Soft and low-contrast on purpose. */}
              <span
                className="relative z-10 text-[0.95rem] font-bold font-display tracking-[0.09em] text-white/90 transition-colors duration-500 group-hover:text-white md:text-[1rem] [-webkit-text-stroke:0.6px_currentColor]"
                style={{ textShadow: '0 1px 2px rgba(28,54,92,0.38)' }}
              >
                Motion-0
              </span>
            </a>
          </span>
        </h1>
      </div>
    </section>
  )
}
