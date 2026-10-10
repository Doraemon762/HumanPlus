import { useRef, useState } from 'react'
import Reveal from '../components/ui/Reveal'

const EMAIL = 'info@humanplus.xyz'

/* ── Career / Recruitment ───────────────────────────────────────────
   Single, centered module only — no job listings, no direction cards,
   no company intro, no benefits. A quiet, editorial hero that mirrors
   the site's existing visual language (paper bg, ink/ink-70 text scale,
   brand pill CTA) and respects the "lots of whitespace" brief. */

export default function RecruitmentPage() {
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
    <section className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 pt-24 pb-16 lg:px-10">
      <div className="w-full max-w-[720px] text-center">
        {/* Title — large, bold, plain (no stroke / shadow / effect). */}
        <Reveal
          as="h1"
          className="font-black leading-[1.02] tracking-tight text-ink text-[clamp(3rem,9vw,6rem)]"
        >
          Join us<span className="ml-[0.12em]">!</span>
        </Reveal>

        {/* Intro — 2 short lines, dark grey (not pure black), comfy line-height,
            capped at ~680px so it never stretches too wide on desktop. */}
        <Reveal delay={1} className="mx-auto mt-8 max-w-[680px]">
          <p className="text-[clamp(1.05rem,1.8vw,1.3rem)] leading-relaxed text-ink/70">
            Capturing Human Data at Scale to Advance Embodied Intelligence.
          </p>
          <p className="mt-5 text-[clamp(1.05rem,1.8vw,1.3rem)] leading-relaxed text-ink/70">
            We welcome full-time professionals and interns to join us and explore what’s next in
            embodied intelligence.
          </p>
        </Reveal>

        {/* Email entry — copies the address and confirms success in place. */}
        <Reveal
          as="button"
          type="button"
          onClick={copyEmail}
          delay={2}
          aria-label={copied ? 'Email address copied' : 'Copy email address'}
          className="mt-12 inline-flex min-w-[19.5rem] max-w-full items-center justify-center rounded-full bg-brand px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          {copied ? 'Copied!' : EMAIL}
        </Reveal>
      </div>
    </section>
  )
}
