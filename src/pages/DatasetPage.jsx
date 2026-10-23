import { useEffect, useRef, useState } from 'react'
import './DatasetPage.css'
import ScrollExpand from '../components/ui/ScrollExpand'
import LifeCapturePreview from '../components/ui/LifeCapturePreview'

const DATASET_URL = 'https://humanplus-ai.github.io/HumanPlus1000.github.io/'
const mediaRoot = 'media/dataset-showcase/'

function Metrics({ active }) {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (!active) return
    let frame
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      if (reduced) { setProgress(1); return }
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min(1, (now - start) / 1800)
        setProgress(1 - Math.pow(1 - t, 3))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    observer.observe(ref.current)
    return () => { observer.disconnect(); cancelAnimationFrame(frame) }
  }, [active])
  return <dl ref={ref} className="dataset-metrics">{[[1000, 'Hours'], [100, 'Locations'], [500, 'Tasks'], [200, 'People']].map(([value, label]) => (
    <div key={label}><dt>{label}</dt><dd aria-label={`${value}+`}><span className="dataset-count" aria-hidden="true">{Math.round(value * progress)}</span><span aria-hidden="true">+</span></dd></div>
  ))}</dl>
}

function Sample({ name, label, active = true, poster = name }) {
  const videoName = name === 'life-capture' ? 'life-capture-compatible' : name
  const ref = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(active)
  useEffect(() => { if (active) setLoaded(true) }, [active])
  useEffect(() => {
    const video = ref.current
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || !active) video.pause()
      else if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) { video.muted = true; video.play().catch(() => {}) }
    }, { threshold: 0.2 })
    observer.observe(video)
    return () => { observer.disconnect(); video.pause() }
  }, [active, loaded])
  const play = () => {
    const video = ref.current
    if (!video.getAttribute('src')) video.src = `${mediaRoot}${videoName}.mp4`
    setFailed(false)
    video.play().catch(() => setFailed(true))
  }
  const pause = () => { ref.current.pause(); setPlaying(false) }
  return (
    <figure className="dataset-sample">
      <video ref={ref} src={loaded ? `${mediaRoot}${videoName}.mp4` : undefined} poster={`${mediaRoot}${poster}.webp`} muted loop playsInline controls={false} controlsList="nodownload noremoteplayback" disablePictureInPicture disableRemotePlayback onContextMenu={(event) => event.preventDefault()} preload="metadata" role="button" tabIndex={active ? 0 : -1} aria-label={`${playing ? 'Pause' : 'Play'} ${label}`} aria-pressed={playing} onClick={() => playing ? pause() : play()} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); playing ? pause() : play() } }} onPlay={() => { setPlaying(true); setFailed(false) }} onPause={() => setPlaying(false)} onError={() => setFailed(true)} />
      <figcaption>{label}</figcaption>
      {failed && <p className="dataset-video-error" role="status">Unable to play this video. Please refresh to try again.</p>}
    </figure>
  )
}

function LifeCapture() {
  return <ScrollExpand className="dataset-life-intro" src={`${mediaRoot}life-capture-compatible.mp4`} poster={`${mediaRoot}life-capture.webp`} startWidth={39} startHeight={43} startRadius={28} startRight={2.8} startShiftX={18} topOffset={72} mediaZoom={1.025} scrollDistance={0.9} holdDistance={0.52} title={<div className="dataset-life-copy"><h2>Life capture</h2><p>Experience how human motion and real-world interaction data can empower embodied intelligence and robot learning.</p></div>} />
}

function ResourceIcon({ type }) {
  if (type === 'project') return <img className="dataset-project-icon" src="images/logo/logo.png" alt="" aria-hidden="true" />
  if (type === 'huggingface') return <img className="dataset-brand-icon" src={`${mediaRoot}huggingface.svg`} alt="" aria-hidden="true" />
  if (type === 'license') return <span className="dataset-cc-icon" aria-hidden="true">cc</span>
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{type === 'github'
    ? <path fill="currentColor" stroke="none" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.84c.85 0 1.71.11 2.51.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    : type === 'license' ? <><circle cx="12" cy="12" r="9" /><path d="M10 9a3 3 0 1 0 0 6m7-6a3 3 0 1 0 0 6" /></>
    : <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01m0 7 2 2-2 2m4-4h3" /></>}</svg>
}

function Resources() {
  const resources = [
    { type: 'project', title: 'Project Page', detail: 'Explore the dataset', href: DATASET_URL },
    { type: 'github', title: 'GitHub', detail: 'Code & visualization tools', href: 'https://github.com/humanplus-ai/humanplus-1000' },
    { type: 'huggingface', title: 'Hugging Face', detail: 'Access the data', href: 'https://huggingface.co/datasets/humanplus-ai/humanplus-1000' },
  ]
  return <section className="dataset-resources-screen" aria-labelledby="dataset-resources-title">
    <div className="dataset-resources-inner">
      <header className="dataset-resources-heading"><h2 id="dataset-resources-title">Explore the dataset</h2></header>
      <nav className="dataset-resources" aria-label="Dataset resources">{resources.map((item) => <a className={`dataset-resource-card dataset-resource-card--${item.type}`} key={item.type} href={item.href} target="_blank" rel="noopener noreferrer"><div className="dataset-resource-top"><span className="dataset-resource-icon"><ResourceIcon type={item.type} /></span><span className="dataset-resource-arrow" aria-hidden="true">↗</span></div><span className="dataset-resource-copy"><strong>{item.title}</strong><small>{item.detail}</small></span></a>)}</nav>
    </div>
  </section>
}

function VisualizationGallery() {
  const [active, setActive] = useState(0)
  const touchX = useRef(null)
  const samples = Array.from({ length: 9 }, (_, index) => index === 0 ? 'synchronized' : `gallery-${String(index + 1).padStart(2, '0')}`)
  const move = (step) => setActive((value) => Math.max(0, Math.min(samples.length - 1, value + step)))
  return <section className="dataset-gallery" aria-labelledby="dataset-gallery-title" aria-roledescription="carousel">
    <div className="dataset-section-heading"><h2 id="dataset-gallery-title">Visualization</h2><p>Reconstructing human motion and behavior from multimodal data.</p></div>
    <div className="dataset-gallery-window" onTouchStart={(event) => { touchX.current = event.touches[0].clientX }} onTouchEnd={(event) => { const delta = event.changedTouches[0].clientX - touchX.current; if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1) }}>
      <div className="dataset-gallery-track" style={{ transform: `translateX(calc(${active} * -1 * (100% + 20px)))` }}>
        {samples.map((name, index) => <div className="dataset-gallery-card" key={name} aria-hidden={active !== index} inert={active !== index ? '' : undefined}><Sample name={name} poster={`gallery-0${index + 1}`} label={`Reconstruction sample ${index + 1}`} active={active === index} /></div>)}
      </div>
    </div>
    <div className="dataset-gallery-controls"><div className="dataset-gallery-dots" aria-label="Choose visualization">{samples.map((_, index) => <button key={index} className={index === active ? 'is-active' : ''} onClick={() => setActive(index)} aria-label={`Show visualization ${index + 1}`} aria-current={index === active ? 'true' : undefined} />)}</div><div className="dataset-gallery-arrows"><button onClick={() => move(-1)} disabled={active === 0} aria-label="Previous visualization">‹</button><button onClick={() => move(1)} disabled={active === samples.length - 1} aria-label="Next visualization">›</button></div></div>
  </section>
}

export default function DatasetPage() {
  const heroRef = useRef(null)
  const [revealed, setRevealed] = useState(false)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setRevealed(true); return }
    const reveal = () => {
      if (window.scrollY > heroRef.current.offsetTop + 40) {
        setRevealed(true)
        window.removeEventListener('scroll', reveal)
      }
    }
    window.addEventListener('scroll', reveal, { passive: true })
    const onFocus = (event) => { if (event.key === 'Tab') setRevealed(true) }
    window.addEventListener('keydown', onFocus)
    reveal()
    return () => { window.removeEventListener('scroll', reveal); window.removeEventListener('keydown', onFocus) }
  }, [])
  return (
    <div className="dataset-showcase">
      <div className="dataset-hero-scroll" ref={heroRef}>
      <section className={`dataset-cover ${revealed ? 'is-revealed' : ''}`} aria-label="HumanPlus-1000 dataset" style={{ backgroundImage: `url('${mediaRoot}hero-cover.webp')` }}>
        <div className="dataset-intro" aria-hidden={!revealed} inert={revealed ? undefined : ''}>
          <h1 id="dataset-title">HumanPlus<span>-1000</span></h1>
          <h2>A Large-Scale Human Dataset for Whole-Body Intelligence</h2>
          <p className="dataset-description">From the Real World to World-Human Models,<br />Building a Continuously Evolving Data Flywheel</p>
          <Metrics active={revealed} />
        </div>
      </section>
      </div>
      <LifeCapturePreview />
      <section className="dataset-preview-section" aria-label="Dataset samples and resources">
        <VisualizationGallery />
      </section>
      <Resources />
    </div>
  )
}
