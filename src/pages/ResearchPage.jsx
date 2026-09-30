import { useEffect, useRef, useState } from 'react'
import Reveal from '../components/ui/Reveal'
import ParticleLogo from '../components/ui/ParticleLogo'
import BorderGlow from '../components/ui/BorderGlow'
import { research } from '../data/research'
import '../styles/research-dark.css'

const COMPANY_INTRO = [
  'HUMANPLUS is building scalable Life Capture infrastructure for embodied intelligence. With self-developed motion-capture garments, lightweight head-mounted devices, and proprietary algorithms, HUMANPLUS continuously captures egocentric vision, full-body motion, and human interactions with the real world, without disrupting how people naturally work.',
  'Through multimodal synchronization, motion reconstruction, data processing, and model training, HUMANPLUS turns naturally occurring human behavior into data that robots can understand and learn from. In this way, everyday work and life become a continuously growing source of real-world training data for embodied intelligence.',
]

const yearOf = (item) => Number(item.venue.match(/\b20\d{2}\b/)?.[0] || 0)
const timeline = [...research].sort((a, b) => yearOf(b) - yearOf(a))

export default function ResearchPage() {
  const [activeYear, setActiveYear] = useState(yearOf(timeline[0]))
  const [aboutIntroComplete, setAboutIntroComplete] = useState(false)
  const timelineItems = useRef([])
  const timelineTrack = useRef(null)
  const timelineSlider = useRef(null)
  const timelineProgress = useRef(null)

  useEffect(() => {
    timeline.forEach(({ image }) => {
      const preloader = new Image()
      preloader.decoding = 'async'
      preloader.src = image
    })
  }, [])

  useEffect(() => {
    document.documentElement.classList.add('research-snap-active')
    let animationFrame = 0

    const updateTimeline = () => {
      const track = timelineTrack.current
      const nodes = timelineItems.current.filter(Boolean)
      if (!track || !nodes.length) return

      const nodeAnchor = window.innerWidth < 768 ? 16 : 42
      const anchors = nodes.map((node) => node.offsetTop + nodeAnchor - 21)
      const trackPageTop = track.getBoundingClientRect().top + window.scrollY
      const viewportGuide = Math.min(window.innerHeight * 0.38, 360)
      const desiredTop = window.scrollY + viewportGuide - trackPageTop
      const nextTop = Math.min(Math.max(desiredTop, anchors[0]), anchors[anchors.length - 1])
      if (timelineSlider.current) timelineSlider.current.style.top = `${nextTop}px`
      if (timelineProgress.current) timelineProgress.current.style.height = `${Math.max(0, nextTop + 7)}px`

      const closestIndex = anchors.reduce(
        (closest, anchor, index) => (
          Math.abs(anchor - nextTop) < Math.abs(anchors[closest] - nextTop) ? index : closest
        ),
        0,
      )
      setActiveYear(yearOf(timeline[closestIndex]))
    }

    const requestUpdate = () => {
      cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(updateTimeline)
    }

    updateTimeline()
    const resizeObserver = new ResizeObserver(requestUpdate)
    timelineItems.current.filter(Boolean).forEach((node) => resizeObserver.observe(node))
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      document.documentElement.classList.remove('research-snap-active')
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
              <span className="research-about-stroke-word" aria-label="HUMANPLUS">HUMANPLUS</span>
            </h1>
          </Reveal>
          <div className="company-about-copy mt-12 space-y-7 md:mt-20 md:space-y-8">
            {COMPANY_INTRO.map((paragraph, index) => (
              <Reveal key={paragraph} delay={index + 1}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="research-timeline" className="research-timeline-section px-6 pb-24 pt-10 md:px-10 md:pb-32 md:pt-10">
        <div className="mx-auto max-w-7xl">
          <Reveal className="research-page-header">
            <h2 className="research-blue-white-fill text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-none tracking-[-0.045em]">Research</h2>
          </Reveal>

          <div ref={timelineTrack} className="research-timeline mt-6">
            <span ref={timelineProgress} className="research-timeline-progress" aria-hidden="true" />
            <div ref={timelineSlider} className="research-timeline-slider" aria-live="polite">
              <span key={activeYear} className="research-timeline-slider-year">{activeYear}</span>
              <span className="research-timeline-slider-dot" aria-hidden="true" />
            </div>

            {timeline.map((item, index) => {
              const year = yearOf(item)
              const imageOnLeft = index % 2 === 0
              return (
                <div key={item.id} className={`research-timeline-item ${index === 0 ? 'is-first' : ''}`} data-year={year} ref={(node) => { timelineItems.current[index] = node }}>
                  <Reveal delay={index}>
                    <article className="research-timeline-card">
                      <div className={`research-timeline-media ${imageOnLeft ? '' : 'md:order-2'}`}>
                        <img src={item.image} alt={item.title} loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index < 2 ? 'high' : 'auto'} decoding="async" />
                      </div>
                      <div className={`research-timeline-copy ${imageOnLeft ? '' : 'md:order-1'}`}>
                        <span className="research-venue">{item.venue}</span>
                        {item.highlight && <p className="research-highlight">★ {item.highlight}</p>}
                        <h3>{item.title}</h3>
                        <p className="research-description">{item.description}</p>
                        <div className="research-links">
                          {item.links.map((link) => (
                            <BorderGlow as="a" key={link.label} href={link.href} target="_blank" rel="noreferrer" className="research-link-button group" edgeSensitivity={18} glowColor="214 100 78" backgroundColor="#0d121a" borderRadius={999} glowRadius={10} glowIntensity={0.58} coneSpread={9} colors={['#5a9cfc', '#ffffff', '#91bff8']}>
                              {link.label}<span aria-hidden="true" className="research-link-arrow">↗</span>
                            </BorderGlow>
                          ))}
                        </div>
                      </div>
                    </article>
                  </Reveal>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
