import { useEffect, useRef, useState } from 'react'
import Reveal from '../components/ui/Reveal'
import ParticleLogo from '../components/ui/ParticleLogo'
import StrokeText from '../components/ui/StrokeText'
import AboutTimelineSection from '../components/sections/AboutTimelineSection'
import MvvSection from '../components/sections/MvvSection'
import '../styles/research-dark.css'

const COMPANY_INTRO = [
  'Humanplus builds scalable Life Capture infrastructure for embodied intelligence. Our motion-capture garments, lightweight head-mounted devices, and proprietary algorithms capture egocentric vision, full-body motion, and real-world human interaction without disrupting natural work.',
  'By synchronizing, reconstructing, and processing these multimodal signals for model training, we turn everyday work and life into real-world data that robots can understand and learn from.',
]

export default function ResearchPage() {
  const [aboutIntroComplete, setAboutIntroComplete] = useState(false)
  const researchSection = useRef(null)

  useEffect(() => {
    document.documentElement.classList.add('research-snap-active')
    let animationFrame = 0

    const updateSurface = () => {
      const section = researchSection.current
      const lightProgress = section
        ? Math.min(Math.max((window.innerHeight - section.getBoundingClientRect().top) / Math.max(1, window.innerHeight - 64), 0), 1)
        : 0
      if (section) section.style.setProperty('--research-light-progress', lightProgress.toFixed(4))
      document.documentElement.classList.toggle(
        'research-light-nav',
        lightProgress >= 0.58,
      )
    }

    const requestUpdate = () => {
      cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(updateSurface)
    }

    updateSurface()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      document.documentElement.classList.remove('research-snap-active')
      document.documentElement.classList.remove('research-light-nav')
    }
  }, [])

  return (
    <div className="company-research-page">
      <section className="company-about-panel relative overflow-hidden px-6 pb-24 pt-28 md:px-10 md:pb-32 md:pt-36">
        <div className="company-about-glow" aria-hidden="true" />
        <ParticleLogo onReveal={() => setAboutIntroComplete(true)} />
        <div className={`company-about-content relative z-10 mx-auto max-w-7xl ${aboutIntroComplete ? 'is-visible' : ''}`}>
          <Reveal>
            <h1 className="research-about-title mt-5 max-w-7xl">
              <span className="research-about-label">About</span>{' '}
              <StrokeText
                text="HUMANPLUS"
                strokeColor="#5a9cfc"
                strokeWidth={1.35}
                fillMode="none"
                animated={false}
                fontSize={128}
                fontWeight={650}
                letterSpacing={-6}
                paddingRatio={0.025}
                className="research-about-stroke-word"
              />
            </h1>
          </Reveal>
          <div className="company-about-copy mt-12 space-y-7 md:mt-20 md:space-y-8">
            {COMPANY_INTRO.map((paragraph, index) => (
              <Reveal key={paragraph} delay={index + 1}>
                <p className="w-full text-base leading-[1.85] text-ink/68 md:text-lg">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <div ref={researchSection} className="research-light-surface">
        <MvvSection />
        <AboutTimelineSection />
      </div>
    </div>
  )
}
