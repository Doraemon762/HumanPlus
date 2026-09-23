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

        /* ── Brand blue — extracted from the real Renyi logo ──
           #0148EE is the dominant mark colour (~67% of opaque pixels);
           #5A9CFC is the logo's secondary blue (bottom bar).
           Used sparingly (~10%): nav accents, CTAs, ordinals, hover states. */
        brand: '#0148EE',
        brandLight: '#5A9CFC',
        brandSoft: 'rgba(1,72,238,0.06)',   // hover tint wash (slightly stronger than dark-theme's 0.05 so it reads on white)
        brandLine: 'rgba(1,72,238,0.35)',   // hover border

        /* Hairlines — semantic flip of the dark theme's white/xx borders */
        line: 'rgba(17,17,17,0.08)',
        lineStrong: 'rgba(17,17,17,0.14)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
