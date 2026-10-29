import {translate, useSiteLanguage} from '../../i18n'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react'
import OptimizedImage from '../ui/OptimizedImage'
import { homeResearch } from '../../data/homeResearch'
import './ResearchSection.css'

const summaries = {
  clotho: ['CLOTHO', 'Accurate tracking across garments', 'Canonicalizing garment-mounted IMUs for accurate, long-term human motion tracking.'],
  tic: ['Transformer IMU Calibrator', 'Calibration that moves with you', 'Dynamic on-body calibration for accurate motion capture with sparse inertial sensors.'],
  lip: ['Loose Inertial Poser', 'Motion capture in a jacket', 'Four IMUs, a loose-wear jacket and natural movement.'],
}

function Venue({ paper }) {
  useSiteLanguage()
  return <div className="paper-venue-line"><span>{translate(paper.highlight || paper.venue)}</span>{paper.logo && <OptimizedImage src={paper.logo} alt={translate(`${paper.venue} conference logo`)} />}</div>
}

function PaperDialog({ paper, onClose }) {
  useSiteLanguage()
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true })
    }
  }, [])

  return createPortal(
    <dialog ref={dialogRef} className="paper-dialog" aria-labelledby="paper-dialog-title" data-lenis-prevent onCancel={onClose} onClick={(event) => {
      if (event.target !== event.currentTarget) return
      const bounds = event.currentTarget.getBoundingClientRect()
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose()
    }}>
      <div className="paper-dialog-toolbar"><button className="paper-round-button paper-dialog-close" onClick={onClose} aria-label={translate("Close paper details")} title={translate("Close")}><X size={23} strokeWidth={3} /></button></div>
      <div className="paper-dialog-content">
        <div className="paper-dialog-venue"><Venue paper={paper} /></div>
        <h2 id="paper-dialog-title">{translate(paper.title)}</h2>
        {paper.description && <p className="paper-dialog-description">{translate(paper.description)}</p>}
        <div className="paper-dialog-links">{paper.links.map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{translate(link.label === 'Paper' ? 'Read full paper' : link.label)}<ArrowUpRight size={18} aria-hidden="true" /></a>)}</div>
        {paper.image && <figure className="paper-dialog-image"><OptimizedImage src={paper.image} sizes="(max-width: 767px) 90vw, 1000px" alt={translate(`${summaries[paper.id]?.[0] || paper.title} research overview`)} /></figure>}
      </div>
    </dialog>, document.body,
  )
}

export default function ResearchSection() {
  useSiteLanguage()
  const [selectedPaper, setSelectedPaper] = useState(null)
  const [navigation, setNavigation] = useState({ previous: false, next: false })
  const trackRef = useRef(null)
  const papers = homeResearch

  useEffect(() => {
    const track = trackRef.current
    const update = () => setNavigation({ previous: track.scrollLeft > 2, next: track.scrollLeft < track.scrollWidth - track.clientWidth - 2 })
    const observer = new ResizeObserver(update)
    observer.observe(track)
    track.addEventListener('scroll', update, { passive: true })
    update()
    return () => {
      observer.disconnect()
      track.removeEventListener('scroll', update)
    }
  }, [])

  const move = (direction) => {
    const track = trackRef.current
    const firstCard = track.querySelector('.paper-card')
    const step = firstCard.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap)
    track.scrollBy({ left: direction * step, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }

  return <section id="research" className="home-paper-section" aria-labelledby="home-paper-title">
    <header className="home-paper-heading"><h2 id="home-paper-title">{translate("Research")}</h2><a href="#/research">{translate("Explore our research ")}<ChevronRight size={18} aria-hidden="true" /></a></header>
    <div className="home-paper-track" ref={trackRef} aria-label={translate("Featured research papers")} tabIndex={0} onKeyDown={(event) => {
      if (event.target !== event.currentTarget || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return
      event.preventDefault()
      move(event.key === 'ArrowRight' ? 1 : -1)
    }}>
      {papers.map(paper => <article className="paper-card" key={paper.id}>
        <div className="paper-card-copy"><div className="paper-card-venue"><Venue paper={paper} /></div><h3>{translate(paper.title)}</h3>{summaries[paper.id] && <p className="paper-card-description">{translate(summaries[paper.id][2])}</p>}</div>
        <figure className="paper-card-image">{translate(paper.image
          ? <OptimizedImage src={paper.image} sizes="(max-width: 767px) 85vw, 330px" alt={translate(`${summaries[paper.id]?.[0] || paper.title} research overview`)} />
          : <div className="paper-text-cover" aria-label={translate("Publication reference")}><span>{translate(paper.venue)}</span><strong>{translate(paper.year)}</strong><span>{translate("HumanPlus Research")}</span></div>)}</figure>
        <button className="paper-card-open" onClick={() => setSelectedPaper(paper)} aria-label={translate(`Read more about ${summaries[paper.id]?.[0] || paper.title}`)} aria-haspopup="dialog"><span className="paper-round-button" title={translate("Read more")}><Plus size={23} strokeWidth={3} aria-hidden="true" /></span></button>
      </article>)}
    </div>
    <div className="home-paper-navigation"><button className="paper-round-button" aria-label={translate("Previous research paper")} title={translate("Previous paper")} disabled={!navigation.previous} onClick={() => move(-1)}><ChevronLeft size={26} strokeWidth={3} /></button><button className="paper-round-button" aria-label={translate("Next research paper")} title={translate("Next paper")} disabled={!navigation.next} onClick={() => move(1)}><ChevronRight size={26} strokeWidth={3} /></button></div>
    {selectedPaper && <PaperDialog paper={selectedPaper} onClose={() => setSelectedPaper(null)} />}
  </section>
}
