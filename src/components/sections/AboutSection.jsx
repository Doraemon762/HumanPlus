import Reveal from '../ui/Reveal'

/* ── About / company introduction ────────────────────────────────
   Brand-first module: slogan → key visual. No body copy, no logo
   lockup — the image carries the section and the layout stays simple.

   The section is a full screen (`min-h-screen`) because the Hero ⇄
   About hand-off snaps a whole viewport at a time; the content column
   is centred vertically inside it.

   Type notes:
   - `font-bold` does nothing for the display face (Chrome won't
     synthesise bold for this TTF — 300/400/700 render identically).
   - The display face's LATIN glyphs are upright (measured: vertical
     stems skew 0°); `font-style: italic` would oblique ~12–14°.
   - The Slogan is intentionally set to `font-normal` with NO
     text-stroke and NO skew/italic. Weight and emphasis come from the
     large clamp() size, generous line-height and the centred layout —
     not from bold or slant. This also keeps the line crisp when the
     browser auto-translates it (no bold+oblique overlap to blur glyphs).

   Slogan:
   - Flat brand blue (`text-brand` #5A9CFC) on the light gradient. No
     glow, no backdrop, no text-stroke, no skew. `font-normal` only. */

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center bg-[linear-gradient(180deg,#FFFFFF_0%,#F4F8FE_28%,#DCE9FD_52%,#B4CFFB_76%,#5A9CFC_100%)] py-[85px] md:py-[107px]"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        {/* ── Slogan ──────────────────────────────────────────────
            Flat brand blue on the light gradient. No glow, no backdrop,
            no text-stroke, no skew/italic — `font-normal` only. Emphasis
            comes from size, line-height and the centred layout. */}
        <Reveal
          as="h2"
          className="text-center font-display text-[clamp(1.8rem,4.6vw,3.4rem)] font-normal leading-[1.18] tracking-[0.02em] text-brand"
        >
          <span className="block">
            Capturing Human Data at Scale
          </span>
          <span className="block">
            to Advance Embodied Intelligence
          </span>
        </Reveal>

        {/* ── Key visual ──────────────────────────────────────────
            85% of the content column — enlarged per brief (80–90%
            band). Native aspect ratio preserved: h-auto + max-h guard,
            no object-fit crop. Small 14px radius keeps it a clean
            visual plate rather than a rounded card. */}
        <Reveal delay={2} className="mt-[clamp(2rem,5vh,3.5rem)] flex justify-center">
          <img
            src="images/about/brand-visual.jpg"
            alt="HumanPlus — human motion data capture in a real-world environment"
            className="h-auto w-[85%] max-h-[88vh] rounded-[14px] ring-1 ring-black/5 shadow-[0_36px_90px_-30px_rgba(17,45,90,0.45)]"
          />
        </Reveal>
      </div>
    </section>
  )
}
