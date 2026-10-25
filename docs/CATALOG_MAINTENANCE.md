# Shared catalogue maintenance

The reader and corporate website share the HumanPlus GitHub repository. Vercel
hosts the production deployment at `/catalog`; it is not an editor. No access
key is required and the public navigation has no catalogue link.

To update the PDF, run `scripts/update-catalog.py <PDF>` from the repository.
Use the Python environment with pypdfium2, pypdf and Pillow. Set
`MEDIA_TOOLS_DIR` to a Node package directory containing sharp before running.
The update script renders original lossless pages, then automatically invokes
`scripts/optimize-catalog.mjs` to generate versioned 1440px reading previews,
unchanged full-resolution zoom pages, and a static page manifest.

Run `node --test scripts/catalog.test.mjs scripts/catalog-loading.test.mjs` and
`npm run build`; commit the generated `private/catalog` and `public/media/catalog`
assets together with any reader changes, then push to main. Vercel automatically
deploys from that repository. The shared URL stays the same.

Versioned assets can be cached for a year; a changed PDF produces a new version
directory. The manifest revalidates so returning readers receive the new PDF.
Robots directives discourage indexing; this is not private or access-controlled.
