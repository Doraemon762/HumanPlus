/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* ── Light-theme surfaces (flipped from HumanPlus-1000's ink scale) ── */
        paper: '#FFFFFF',    // page background — the site's single base colour
        paper2: '#FAFAFA',   // alternate section background (very light grey)
        panel: '#F5F5F6',    // media-frame gradient start
        panel2: '#ECEDEF',   // media-frame gradient end

        /* ── Text scale ── */
        ink: '#111111',      // primary text (near-black)
        mute: '#767676',     // secondary text / labels / kickers

        /* ── Brand blue — the site's single blue ──────────────────
           #5A9CFC is the official HumanPlus brand blue (also the
           secondary blue of the company logo, and the same family as
           the HumanPlus-1000 highlight #589BF9).
           Every blue in the UI points at these tokens — components
           must never hard-code a hex. */
        brand: '#5A9CFC',
        /* Hover / active step — the brief asks for ONE brand blue
           (#5A9CFC), so this token equals `brand`; interaction feedback
           now comes from the CTA's arrow slide + subtle shadow, not a
           second hue. */
        brandDeep: '#5A9CFC',
        brandLight: '#5A9CFC',               // dark-surface kicker; same blue by definition
        brandSoft: 'rgba(90,156,252,0.08)',  // hover tint wash
        brandLine: 'rgba(90,156,252,0.55)',  // hover border / stroke

        /* Hairlines — semantic flip of the dark theme's white/xx borders */
        line: 'rgba(17,17,17,0.08)',
        lineStrong: 'rgba(17,17,17,0.14)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        /* Editorial display face — resolves to the project's default
           sans-serif (Inter) stack. The bespoke "庞门正道标题体" face was
           removed; `font-display` callers now use the standard sans. */
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
