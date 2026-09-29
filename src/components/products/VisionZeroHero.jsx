import Reveal from '../ui/Reveal'
import CtaLink from '../ui/CtaLink'

/* Vision-0 hero — light, high-end hardware layout: 45% product copy on
   the left, 55% product visual on the right, floating in a soft grey
   media frame. The headband image is a wide horizontal composition, so
   the media frame is widened and given extra horizontal breathing room
   to let the stereo cameras and headband shape dominate the viewport. */
export default function VisionZeroHero({ product }) {
  const image = product.image || 'images/products/vision-0.jpg'

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-white to-[#F5F5F5] pt-16 font-sans">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-12 px-6 pb-16 pt-10 lg:grid-cols-[45fr_55fr] lg:gap-10 lg:px-10">
        {/* ── Left: kicker → name → intro → CTA ── */}
        <div className="relative z-[1] -translate-y-2 lg:-translate-y-4">
          <Reveal
            as="p"
            className="text-xs font-mono uppercase tracking-[0.3em] text-mute"
          >
            Hardware
          </Reveal>

          <Reveal
            as="h1"
            delay={1}
            className="mt-5 font-black leading-[1.05] tracking-tight text-ink text-[clamp(2.5rem,5vw,4.25rem)]"
          >
            {product.name}
          </Reveal>

          <Reveal delay={2} className="mt-6 max-w-md">
            <p className="text-[clamp(1rem,1.4vw,1.25rem)] leading-relaxed text-ink/70">
              {product.description}
            </p>
          </Reveal>

          <Reveal delay={3} className="mt-10">
            <CtaLink to="/contact" variant="primary">
              Explore Vision-0
            </CtaLink>
          </Reveal>
        </div>

        {/* ── Right: the headband, centred in a wide soft grey media frame ── */}
        <div className="relative z-[1] flex items-center justify-center lg:justify-end">
          <Reveal delay={2} className="relative w-full max-w-[640px] lg:max-w-[760px]">
            <div className="overflow-hidden rounded-[24px] bg-gradient-to-b from-panel to-panel2 p-10 shadow-[0_30px_80px_-24px_rgba(17,17,17,0.22)] lg:p-14">
              <img
                src={image}
                alt={`${product.name} wearable stereo vision headband`}
                className="h-auto w-full select-none object-contain"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
