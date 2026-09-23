import Reveal from '../ui/Reveal'
import CtaLink from '../ui/CtaLink'

/* ── Home Contact — short gateway block; the real inquiry content
   lives on /contact. No invented email / phone / address. */

export default function ContactSection() {
  return (
    <section className="relative bg-paper2 py-[85px] md:py-[107px]">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <Reveal className="text-xs font-mono uppercase tracking-[0.3em] text-mute">Contact</Reveal>
        <Reveal as="h2" delay={1} className="mt-4 font-black tracking-tight leading-[1.2] text-[clamp(1.25rem,4vw,3rem)] text-ink">
          Contact
        </Reveal>
        <Reveal delay={2} className="mt-6">
          <p className="max-w-xl text-base leading-relaxed text-ink/70">
            Interested in our products or solutions? Business inquiries are welcome.
          </p>
        </Reveal>

        <Reveal delay={3} className="mt-12 md:mt-16">
          <CtaLink to="/contact">Contact Us</CtaLink>
        </Reveal>
      </div>
    </section>
  )
}
