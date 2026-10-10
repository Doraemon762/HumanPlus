/* ── Hero ─────────────────────────────────────────────────────────
   Full-screen video first screen.
   - 100vw × 100vh, object-fit: cover, no black bars.
   - Muted autoplay loop (playsInline for mobile autoplay).
   - Poster frame for instant first paint before the video buffers.
   - Lower-left editorial copy in the display face (default sans-serif).
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
          className="leading-[1.28] text-white"
          style={{
            fontFamily: "'Geist Sans', Inter, system-ui, sans-serif",
            fontWeight: 500,
            fontSize: 'clamp(1.9rem, 4.4vw, 3.0rem)',
            letterSpacing: '-0.03em',
          }}
        >
          {/* Line 1 — never wraps on desktop; the break is authored,
              not accidental, so the two-line rhythm stays identical at
              every width. */}
          <span className="block md:whitespace-nowrap">
            
          </span>

          {/* Line 2 — copy + CTA on one baseline, centred on each other.
              flex-wrap lets the capsule drop to its own line on narrow
              screens instead of forcing horizontal overflow. */}
          <span className="mt-[clamp(0.1rem,0.7vh,0.5rem)] flex flex-wrap items-center gap-x-[clamp(0.9rem,1.8vw,1.75rem)] gap-y-4">
            <span>The Future of Intelligence Begins With What We Wear.</span>

            
            <a
            
            >
             
            </a>
          </span>
        </h1>
      </div>
    </section>
  )
}
