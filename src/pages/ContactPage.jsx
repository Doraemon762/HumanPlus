import {translate, useSiteLanguage} from '../i18n'
import Reveal from '../components/ui/Reveal'
import ContactForm from '../components/contact/ContactForm'
import DigitLogo from '../components/contact/DigitLogo'
import useContactSnap from '../hooks/useContactSnap'
import './InquiryPages.css'

/* Full-screen section sequence for the snap hand-off. Module-level
   constant so the hook does not re-run on every render. */
const CONTACT_IDS = ['contact-hero', 'contact-form']

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
  useSiteLanguage()
  return (
    <button
      type="button"
      onClick={scrollToForm}
      className={`group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brandDeep focus-visible:ring-1 focus-visible:ring-brandLine ${className}`}
    >
      {translate(children)}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-[3px]">
        {translate(arrow)}
      </span>
    </button>
  )
}

export default function ContactPage() {
  useSiteLanguage()
  // One screen per module — same full-page hand-off feel as Home /
  // Motion-0, but section-inner-scroll aware so the form stays usable.
  useContactSnap({ duration: 1000, ids: CONTACT_IDS, topOffset: 0 })

  return (
    <div className="contact-editorial">
      {/* ── Hero ── */}
      <section
        id="contact-hero"
        className="contact-hero relative flex h-screen flex-col overflow-hidden bg-white"
      >
        <DigitLogo />
        <div className="contact-hero-copy relative m-auto w-full max-w-7xl px-6 pb-16 pt-24 lg:px-10">
          <Reveal
            as="h1"
            delay={1}
            className="font-black leading-[1.04] tracking-tight text-ink text-[clamp(2.75rem,7vw,5.5rem)]"
          >{translate("Let’s talk")}</Reveal>
          <Reveal delay={2} className="mt-7 max-w-2xl">
            <p className="text-[clamp(1.05rem,1.6vw,1.35rem)] leading-relaxed text-ink/70">{translate("Whether you're exploring our products, building a data collection project, or looking for a research collaboration, we'd love to hear from you.")}</p>
          </Reveal>
          <Reveal delay={3} className="mt-10">
            <ScrollButton arrow="↓">{translate("Get in Touch")}</ScrollButton>
          </Reveal>
        </div>
      </section>

      {/* Full-width inquiry form. */}
      <section id="contact-form" className="contact-inquiry-section relative scroll-mt-24">
        <div className="contact-inquiry-layout">
        <div className="contact-form-column">
          <Reveal
            as="h2"
            className="font-black tracking-tight text-ink text-[clamp(1.75rem,4vw,3rem)]"
          >{translate("Tell Us What You Need")}</Reveal>
          <Reveal delay={1} className="mt-12">
            <ContactForm />
          </Reveal>
        </div>
        </div>
      </section>
    </div>
  )
}
