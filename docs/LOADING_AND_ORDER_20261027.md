# Loading and product order update

- Hardware overview no longer mounts CapturePerformanceScroll. Weave alone keeps
  the Fast / Stable / Comfortable and endurance sequence.
- Weave workflow capabilities immediately precede MotionZeroSpecs.
- Pulse workflow capabilities follow its demo and immediately precede specs.
- Glove capabilities follow the model comparison and immediately precede the
  detailed specification comparison.
- App routes share cached import functions. After the active hero is loaded and
  the browser is idle, routes, product hero images and video posters are warmed
  sequentially. Hover/focus starts likely route loading early. Background work
  pauses in hidden tabs, cancels on route change, and respects Save-Data.
- Multi-megabyte videos are not all downloaded in the background. DeferredVideo
  now prepares them 800px ahead of the viewport and plays only when visible.
- Catalogue read-v2 previews are 960px WebP quality 82. The 16 Chinese/English
  preview images total 1,276,944 bytes versus 2,629,370 before (51.4% less).
  Normal reading warms previews sequentially, never full-resolution sheets.
- ZoomPage displays the cached preview immediately, fetching the unchanged
  full-resolution sheet on demand and swapping it only when ready.
- The public catalogue address remains https://humanplusai.cn/catalog/.

Checks: check-page-order.mjs, check-catalog-preload.mjs,
check-catalog-bilingual.mjs, check-catalog-covers.mjs, check-media.cjs,
check-catalog-official.mjs, and a production build/static-browser review.
Byte savings are measured; no universal network-speed improvement is claimed.
