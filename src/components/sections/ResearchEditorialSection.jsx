import publications from '../../data/publications.json'
import { useEffect, useRef } from 'react'
import './ResearchEditorialSection.css'

const mediaRoot = 'media/research-20261013/'
const paperDetails = {
  'Computational Design of Wiring': {
    venue: 'SIGGRAPH Asia (ACM TOG)',
    abstract: 'We formulate smart-clothing wiring layout design as a deformation-weighted Steiner tree problem, achieving a 77% reduction in wire strain energy over baseline designs.',
  },
  'Loose Inertial Poser:': {
    venue: 'CVPR',
    abstract: 'We introduce Loose Inertial Poser, a novel motion capture solution with high wearing comfort, achieving high-quality real-time pose estimation on loose-wear garments by integrating four IMUs into a jacket.',
  },
  'Transformer IMU Calibrator:': {
    venue: 'ACM TOG (SIGGRAPH)',
    abstract: 'We propose the first dynamic on-body IMU calibration method for inertial motion capture, achieving implicit calibration and long-term accurate tracking without static assumptions.',
  },
  'FIP:': {
    venue: 'CHI',
    abstract: 'We introduce Flexible Inertial Poser (FIP), a motion capture system on daily garments with flex and inertial sensors, achieving a 19.5% angular error improvement over SOTA IMU approaches.',
  },
  'CLOTHO:': {
    venue: 'SIGGRAPH Asia (ACM TOG)',
    abstract: 'We introduce CLOTHO, an IMU canonicalization framework for garment-based inertial motion capture, achieving state-of-the-art accuracy, zero-shot generalization to unseen garments, and robust long-term tracking.',
  },
  'Improving Sparse IMU-based': {
    venue: 'AAAI',
    abstract: 'We propose motion label smoothing, a novel regularization method for sparse IMU-based motion capture, achieving consistent accuracy gains across four real-world IMU datasets.',
  },
}
const groups = [
  {
    title: 'Sensing Human Movement',
    image: `${mediaRoot}wiring-left-2023.png`,
    papers: [
      { match: 'Computational Design of Wiring', image: `${mediaRoot}wiring-right-2023.png` },
    ],
  },
  {
    title: 'Soft Sensing for Smart Clothing',
    image: 'images/research/clothing-20261012/loose-poser.png',
    papers: [
      { match: 'Loose Inertial Poser:', video: `${mediaRoot}lip-2024.mp4`, image: 'images/research/clothing-20261012/loose-poser.png' },
      { match: 'Transformer IMU Calibrator:', video: `${mediaRoot}tic-2025.mp4`, image: 'images/research/clothing-20261012/tic.png' },
      { match: 'FIP:', video: `${mediaRoot}fip-2025.mp4`, image: 'images/research/clothing-20261012/fip.jpeg' },
    ],
  },
  {
    title: 'Human Data for Robot Learning',
    image: `${mediaRoot}smart-clothing-left.png`,
    papers: [
      { match: 'CLOTHO:', video: `${mediaRoot}clotho-2026.mp4`, image: 'images/research/clothing-20261012/clotho.png' },
      { match: 'Improving Sparse IMU-based', video: `${mediaRoot}label-smoothing-2026.mp4`, image: 'images/research/clothing-20261012/label-smoothing.png' },
    ],
  },
]

function EditorialVideo({ src, poster }) {
  const ref = useRef(null)
  useEffect(() => {
    const video = ref.current
    let visible = false
    const play = () => {
      if (visible && !document.hidden) video.play().catch(() => {})
    }
    const load = () => {
      if (!video.getAttribute('src')) { video.src = src; video.load() }
    }
    const preloadObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { load(); preloadObserver.disconnect() }
    }, { rootMargin: '400px 0px' })
    preloadObserver.observe(video)
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) {
        load()
        play()
      } else video.pause()
    }, { threshold: 0.05 })
    const onVisibility = () => document.hidden ? video.pause() : play()
    video.addEventListener('canplay', play)
    video.addEventListener('loadeddata', play)
    document.addEventListener('visibilitychange', onVisibility)
    observer.observe(video)
    return () => {
      observer.disconnect()
      preloadObserver.disconnect()
      video.pause()
      video.removeEventListener('canplay', play)
      video.removeEventListener('loadeddata', play)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [src])
  return <video ref={ref} poster={poster} autoPlay muted playsInline loop preload="auto" disablePictureInPicture />
}

export default function ResearchEditorialSection() {
  return (
    <section className="research-editorial" aria-label="Research in focus">
      {groups.map((group) => (
        <div className="research-editorial-group" key={group.title}>
          <aside className="research-editorial-left">
            <img src={group.image} alt={group.title} loading="lazy" decoding="async" />
            <h2>{group.title}</h2>
          </aside>
          <div className="research-editorial-papers">
            {group.papers.map((media) => {
              const paper = publications.find((item) => item.title.startsWith(media.match))
              const details = paperDetails[media.match]
              return (
                <article className="research-editorial-paper" key={paper.title}>
                  <div className="research-editorial-media">
                    {media.video
                      ? <EditorialVideo src={media.video.replace('.mp4', '.web.mp4')} poster={media.video.replace('.mp4', '.poster.webp')} />
                      : <img src={media.image} alt="" loading="lazy" decoding="async" />}
                  </div>
                  <div className="research-editorial-copy">
                    <p className="research-editorial-year"><span>{paper.year}</span><span>{details.venue}</span><span className="research-editorial-level">CCF-A</span></p>
                    <h3>{media.match === 'Computational Design of Wiring'
                      ? <><span className="research-editorial-title-line">Computational Design of Wiring Layout</span><span className="research-editorial-title-line">on Tight Suits with Minimal Motion Resistance</span></>
                      : paper.title}</h3>
                    <p className="research-editorial-abstract">{details.abstract}</p>
                    <a href={paper.href} target="_blank" rel="noopener noreferrer">Paper <span aria-hidden="true">↗</span></a>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      ))}
    </section>
  )
}
