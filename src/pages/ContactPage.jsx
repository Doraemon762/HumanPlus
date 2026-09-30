import Reveal from '../components/ui/Reveal'
import ContactForm from '../components/contact/ContactForm'
import useContactSnap from '../hooks/useContactSnap'

/* ── Static copy for the "How Can We Help?" band ───────────────────
   Pure orientation copy — no links, no navigation, no child pages. */
const HELP = [
  {
    id: '01',
    title: 'PRODUCT & PURCHASE',
    desc: 'Product inquiries, purchasing, specifications, and deployment needs.',
  },
  {
    id: '02',
    title: 'RESEARCH COLLABORATION',
    desc: 'Academic research, embodied intelligence, and collaborative research projects.',
  },
  {
    id: '03',
    title: 'DATA COLLECTION',
    desc: 'Human data collection, multimodal data, and project-based collaboration.',
  },
]

/* Full-screen section sequence for the snap hand-off. Module-level
   constant so the hook does not re-run on every render. */
const CONTACT_IDS = ['contact-hero', 'contact-help', 'contact-form']

/* Smooth-scroll to the inquiry form. Uses an element id (not a hash
   route) so it never fights the hash router, and the global
   scroll-padding-top keeps it clear of the 64px navbar. */
function scrollToForm() {
  const el = document.getElementById('contact-form')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* Local scroll CTA — mirrors CtaLink's pill geometry but fires an
   in-page scroll instead of a route change. Kept here (not in the
   shared ui/ set) so only Contact is touched. */
function ScrollButton({ arrow = '→', children, className = '' }) {
  return (
    <button
      type="button"
      onClick={scrollToForm}
      className={`group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brandDeep focus-visible:ring-1 focus-visible:ring-brandLine ${className}`}
    >
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-[3px]">
        {arrow}
      </span>
    </button>
  )
}

export default function ContactPage() {
  // One screen per module — same full-page hand-off feel as Home /
  // Motion-0, but section-inner-scroll aware so the form stays usable.
  useContactSnap({ duration: 1000, ids: CONTACT_IDS, topOffset: 0 })

  return (
    <>
      {/* ── Hero ── */}
      <section
        id="contact-hero"
        className="relative flex h-screen flex-col overflow-hidden bg-paper"
      >
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(90,156,252,0.12),transparent_70%)] blur-3xl"
          aria-hidden="true"
        />
        <div className="relative m-auto w-full max-w-7xl px-6 pb-16 pt-24 lg:px-10">
          <Reveal as="p" className="text-xs font-mono uppercase tracking-[0.3em] text-mute">
            Contact
          </Reveal>
          <Reveal
            as="h1"
            delay={1}
            className="mt-5 font-black leading-[1.04] tracking-tight text-ink text-[clamp(2.75rem,7vw,5.5rem)]"
          >
            Let’s Talk.
          </Reveal>
          <Reveal delay={2} className="mt-7 max-w-2xl">
            <p className="text-[clamp(1.05rem,1.6vw,1.35rem)] leading-relaxed text-ink/70">
              Whether you're exploring our products, building a data collection project, or looking
              for a research collaboration, we'd love to hear from you.
            </p>
          </Reveal>
          <Reveal delay={3} className="mt-10">
            <ScrollButton arrow="↓">Get in Touch</ScrollButton>
          </Reveal>
        </div>
      </section>

      {/* ── How Can We Help? ── */}
      <section
        id="contact-help"
        className="relative flex h-screen flex-col overflow-hidden border-t border-line bg-paper2"
      >
        <div className="relative m-auto w-full max-w-7xl px-6 pb-16 pt-24 lg:px-10">
          <Reveal
            as="h2"
            className="font-black tracking-tight text-ink text-[clamp(1.75rem,4vw,3rem)]"
          >
            How Can We Help?
          </Reveal>
          <div className="mt-12 divide-y divide-line">
            {HELP.map((item, i) => (
              <Reveal key={item.id} delay={i} className="group">
                <div className="flex flex-col gap-2 py-9 transition-colors md:flex-row md:items-baseline md:gap-12">
                  <span className="w-10 font-mono text-sm text-mute transition-colors group-hover:text-brand">
                    {item.id}
                  </span>
                  <h3 className="w-full font-semibold tracking-tight text-ink text-lg transition-colors group-hover:text-brand md:w-72 md:flex-none md:text-xl">
                    {item.title}
                  </h3>
                  <p className="max-w-xl leading-relaxed text-ink/70">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tell Us What You Need (form) ── */}
      <section
        id="contact-form"
        className="relative flex h-screen flex-col overflow-y-auto bg-paper scroll-mt-24"
      >
        <div className="m-auto w-full max-w-3xl px-6 pb-16 pt-24 lg:px-10">
          <Reveal
            as="h2"
            className="font-black tracking-tight text-ink text-[clamp(1.75rem,4vw,3rem)]"
          >
            Tell Us What You Need
          </Reveal>
          <Reveal delay={1} className="mt-12">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}
