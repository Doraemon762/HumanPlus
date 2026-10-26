# Official-site catalogue (2026-10-26)

Canonical customer link: https://humanplusai.cn/catalog/

The catalogue is a real static directory in the same GitHub Pages deployment as
the corporate website. It is not linked from the website navigation, has no
access key, and has noindex metadata and targeted robots exclusions. Anyone with
the address can read it; it is not confidential access control.

`npm run build` first builds the corporate site, then builds the reader to
`dist/catalog/index.html` with `/catalog/`-prefixed JS/CSS. Shared catalogue media
remain at `/media/catalog/`. The Pages workflow uploads the entire `dist/`.
Both website and catalogue publish from `Doraemon762/HumanPlus` main.

Update PDF assets via `scripts/update-catalog.py` and `scripts/optimize-catalog.mjs`;
the reader is in `src/catalog/`, with the single-page entry in `catalog-only/`.
Run `node scripts/check-catalog-covers.mjs`, `node scripts/check-media.cjs`, and
`npm run build` before publishing. Check the actual `/catalog/` directory on a
static server, not only Vite's development fallback.

Vercel Git auto-deployments are disabled in the root `vercel.json`. Do not run
Vercel CLI or deploy the repository to a partner account. The previous independent
`shaozi2333/humanplus-catalog` deployment remains a legacy fallback and is not
updated by this workflow. It has not been deleted. The former independent-hosting
handoff ZIP and standalone docs predate this migration; use this document instead
for the production publishing route.
