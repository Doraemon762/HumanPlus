import Reveal from '../ui/Reveal'

/* ── Contact (采购咨询) — structure only. NO email / phone / address /
   WeChat / registration info: those get filled in from real company
   material. The CTA points at #contact for now instead of a made-up
   mailto. */

export default function ContactSection() {
  return (
    <section className="relative py-[85px] md:py-[107px]">
      <div id="contact" className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="rounded-[16px] border border-black/10 bg-paper2 px-6 py-12 md:px-16 md:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <Reveal className="text-xs font-mono uppercase tracking-[0.3em] text-mute">Contact</Reveal>
              <Reveal
                as="h2"
                delay={1}
                className="mt-4 font-black tracking-tight leading-[1.2] text-[clamp(1.25rem,4vw,3rem)] text-ink"
              >
                Business Inquiries
              </Reveal>
              <Reveal delay={2} className="mt-6">
                <p className="max-w-xl text-base leading-relaxed text-ink/70">
                  Interested in our products or solutions? Get in touch with us.
                </p>
              </Reveal>
              <Reveal delay={3} className="mt-10">
                <a
                  href="#contact"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#0140CC]"
                >
                  Contact Us
                  <span aria-hidden="true">→</span>
                </a>
              </Reveal>
            </div>

            {/* Reserved panel for real contact details */}
            <Reveal
              delay={3}
              className="flex min-h-[180px] items-center justify-center rounded-[16px] border border-dashed border-black/15"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-ink/25">
                Contact details placeholder
              </span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
