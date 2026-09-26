/* ── Clothing detail — full-screen garment image ──────────────────
   A single full-bleed image of the Motion-0 garment, shown at 100vh
   with its native aspect ratio intact (object-contain → no crop, no
   stretch). No title, copy, button, or card — the photo is the
   module. White backdrop keeps the letterbox area consistent with the
   page's white tech style. */

export default function MotionZeroClothing() {
  return (
    <section id="m0-clothing" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white">
      <img
        src={`${import.meta.env.BASE_URL}images/products/clothing-details.png`}
        alt="Motion-0 garment detail"
        loading="lazy"
        className="h-screen w-full select-none object-contain"
      />
    </section>
  )
}
