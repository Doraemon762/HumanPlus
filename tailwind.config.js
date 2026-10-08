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

        /* ── HumanPlus Design System neutral scale (ADDITIVE) ──
           `ink` / `mute` / `brand` / `paper` / `panel` / `line` above
           are intentionally unchanged so existing pages render the same.
           These add the system's explicit gray steps + brand gray. */
        brandGray: '#E5E5E5', // §02 Brand Gray — large light sections / dividers
        gray1: '#666666',     // §03 Gray 1 — secondary text
        gray2: '#999999',     // §03 Gray 2 — auxiliary info
        gray3: '#CCCCCC',     // §03 Gray 3 — hairline / weak border
        inkAlt: '#1D1D1F',    // §03 Ink (system value; `ink` #111 kept for back-compat)
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        /* Editorial display face — resolves to the project's default
           sans-serif (Inter) stack. The bespoke "庞门正道标题体" face was
           removed; `font-display` callers now use the standard sans. */
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      /* ── HumanPlus Design System tokens (ADDITIVE) ──
         Radius / type / motion scales from docs/HUMANPLUS_DESIGN_SYSTEM.md.
         New keys only — no override of Tailwind defaults. */
      borderRadius: {
        control: '10px', // §12 small control
        card: '20px',    // §12 standard card
        media: '28px',   // §12 large media / product image
        pill: '9999px',  // §12 pill
      },
      fontSize: {
        nav: ['13px', '1.2'],                       // §06 Navigation
        caption: ['13px', '1.4'],                   // §06 Caption
        'body-sm': ['14px', '1.5'],                 // §06 Body Small
        'body-lg': ['18px', '1.45'],                // §06 Body Large
        kicker: ['clamp(20px, 2.4vw, 24px)', '1.2'],   // §06 Section Kicker
        heading: ['clamp(36px, 4.5vw, 48px)', '1.1'],  // §06 Section Heading
        display: ['clamp(56px, 7vw, 80px)', '1.03'],   // §06 Display
        hero: ['clamp(72px, 9vw, 96px)', '1.0'],       // §06 Hero Display
      },
      transitionDuration: {
        fast: '150ms',   // §23 hover
        normal: '250ms', // §23 hover
        slow: '500ms',   // §22 motion
      },
    },
  },
  plugins: [],
}
