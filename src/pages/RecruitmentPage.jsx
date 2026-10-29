import {translate, useSiteLanguage} from '../i18n'
import { useRef, useState } from 'react'
import Reveal from '../components/ui/Reveal'
import './InquiryPages.css'
import './RecruitmentPage.css'
import {MapPin} from 'lucide-react'

const EMAIL = 'info@humanplus.xyz'

/* ── Career / Recruitment ───────────────────────────────────────────
   Existing editorial hero followed by workplace information. A quiet, editorial hero that mirrors
   the site's existing visual language (paper bg, ink/ink-70 text scale,
   brand pill CTA) and respects the "lots of whitespace" brief. */

export default function RecruitmentPage() {
  useSiteLanguage()
  const [copied, setCopied] = useState(false)
  const resetTimerRef = useRef(null)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      const input = document.createElement('textarea')
      input.value = EMAIL
      input.style.position = 'fixed'
      input.style.opacity = '0'
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      input.remove()
    }

    setCopied(true)
    window.clearTimeout(resetTimerRef.current)
    resetTimerRef.current = window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <>
    <section className="careers-editorial flex min-h-screen flex-col items-center justify-center bg-paper px-6 pt-24 pb-16 lg:px-10">
      <div className="careers-editorial-inner w-full max-w-[720px] text-center">
        {/* Title — large, bold, plain (no stroke / shadow / effect). */}
        <Reveal
          as="h1"
          className="font-black leading-[1.02] tracking-tight text-ink text-[clamp(3rem,9vw,6rem)]"
        >{translate("Join us")}<span className="ml-[0.12em]">{translate("!")}</span>
        </Reveal>

        {/* A single concise introduction below the title. */}
        <Reveal delay={1} className="careers-intro mx-auto">
          <p>{translate("We welcome full-time professionals and interns to join us and explore what’s next in embodied intelligence.")}</p>
        </Reveal>

        {/* Email entry — copies the address and confirms success in place. */}
        <Reveal
          as="button"
          type="button"
          onClick={copyEmail}
          delay={2}
          aria-label={translate(copied ? 'Email address copied' : 'Copy email address')}
          className="mt-12 inline-flex min-w-[19.5rem] max-w-full items-center justify-center rounded-full bg-brand px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          {translate(copied ? 'Copied!' : EMAIL)}
        </Reveal>
      </div>
    </section>
    <section className="careers-workplace" aria-labelledby="workplace-title">
      <div className="careers-workplace-inner">
        <h2 id="workplace-title">{translate("Where we work. What we build.")}</h2>
        <div className="careers-workplace-grid">
          <article className="careers-location-card">
            <span className="careers-location-icon"><MapPin aria-hidden="true" size={22}/></span>
            <p className="careers-location-label">{translate("Our locations")}</p>
            <h3>{translate("Xiamen & Shanghai")}</h3>
            <p className="careers-location-country">{translate("China")}</p>
            <div className="careers-asia-map" role="img" aria-label={translate("East Asia map showing Xiamen and Shanghai")}>
              <img src="images/careers/asia-map.svg" alt="" loading="lazy" />
              <span className="careers-map-pin careers-map-pin--shanghai"><i/><span>{translate("Shanghai")}</span></span>
              <span className="careers-map-pin careers-map-pin--xiamen"><i/><span>{translate("Xiamen")}</span></span>
            </div>
          </article>
          <div className="careers-opportunity-grid">
            {[
              ['Research grounded in real life', 'Explore human motion, wearable sensing and embodied intelligence through real-world questions.'],
              ['From hardware to human data', 'Work across wearable devices, motion capture and multimodal data, connecting research with practical systems.'],
              ['Find your way to contribute', 'Join us as a full-time professional or an intern, and bring your perspective to a growing team.'],
              ['Take on meaningful challenges', 'Help turn natural human movement into data that advances embodied intelligence and robot learning.'],
            ].map(([title, copy]) => <article className="careers-opportunity-card" key={title}><h3>{translate(title)}</h3><p>{translate(copy)}</p></article>)}
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
