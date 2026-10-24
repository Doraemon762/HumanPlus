import OptimizedImage from '../ui/OptimizedImage'
import publications from '../../data/publications.json'
import { useEffect, useRef } from 'react'
import './ResearchEditorialSection.css'

const mediaRoot = 'media/research-20261013/'
const paperDetails = {
  'SuDA:': {
    venue: 'ICML',
    abstract: 'We propose SuDA, a support-based domain adaptation method for flexible-sensor motion capture, achieving labeled-data-free Sim2Real transfer with accuracy comparable to supervised learning.',
  },
  'Self-Adaptive Motion': {
    venue: 'NeurIPS',
    abstract: 'We propose a self-adaptive motion tracking network, achieving robust tracking against unknown on-body displacements of flexible sensors via a learnable affine transformation layer.',
  },
  'DisPad:': {
    venue: 'IMWUT',
    abstract: 'We propose DisPad, an elbow-pad prototype with sparse soft sensors for joint-motion tracking, achieving robust tracking across device displacements with a 9.82-degree average error.',
  },
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
    image: `${mediaRoot}mannequin-sensing-proportion-fixed.webp`,
    papers: [
      { match: 'Computational Design of Wiring', image: `${mediaRoot}wiring-right-color-fixed.webp` },
      { match: 'DisPad:', image: `${mediaRoot}dispad-local-new.webp` },
      { match: 'Self-Adaptive Motion', image: `${mediaRoot}self-adaptive-2023.webp` },
    ],
  },
  {
    title: 'Soft Sensing for Smart Clothing',
    image: `${mediaRoot}mannequin-local-trio.webp`,
    papers: [
      { match: 'SuDA:', image: `${mediaRoot}suda-2024-updated.webp` },
      { match: 'Loose Inertial Poser:', video: `${mediaRoot}lip-2024.mp4`, image: 'images/research/clothing-20261012/loose-poser.png' },
      { match: 'Transformer IMU Calibrator:', video: `${mediaRoot}tic-2025.mp4`, image: 'images/research/clothing-20261012/tic.png' },
      { match: 'FIP:', video: `${mediaRoot}fip-2025.mp4`, image: 'images/research/clothing-20261012/fip.jpeg' },
    ],
  },
  {
    title: 'Human Data for Robot Learning',
    image: `${mediaRoot}mannequin-local-robot.webp`,
    papers: [
      { match: 'CLOTHO:', video: `${mediaRoot}clotho-2026.mp4`, image: 'images/research/clothing-20261012/clotho.png' },
      { match: 'robot-box-2026', video: `${mediaRoot}robot-box-2026.mp4`, pending: true },
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
  return <video ref={ref} poster={poster} autoPlay muted playsInline loop preload="metadata" disablePictureInPicture />
}

export default function ResearchEditorialSection() {
  return (
    <section className="research-editorial" aria-label="Research in focus">
      <div className="research-editorial-group research-editorial-origin" id="research-2019">
        <aside className="research-editorial-left">
          <OptimizedImage src={`${mediaRoot}mannequin-2019-glow.webp`} alt="Original smart clothing prototype" loading="lazy" decoding="async" />
          <h2>2019</h2>
        </aside>
        <div className="research-editorial-papers">
          <div className="research-editorial-paper">
            <div className="research-editorial-media">
              <OptimizedImage src={`${mediaRoot}origin-combined-2019-v2.webp`} alt="Original clothing exposed wiring and circuit board details" loading="lazy" decoding="async" />
            </div>
            <div className="research-editorial-copy">
              <p className="research-editorial-year"><span>2019</span><span>Early Prototype</span></p>
              <h3>Mocap Suit Hand-made by Computer Scientist</h3>
              <p className="research-editorial-abstract">With flexible fabric sensors and wiring, this earliest prototype marked the first milestone on the long journey toward unobtrusive motion capture.</p>
            </div>
          </div>
        </div>
      </div>
      {groups.map((group) => (
        <div className="research-editorial-group" key={group.title}>
          <aside className="research-editorial-left">
            {group.additionalImages
              ? <div className="research-editorial-mannequins">{[group.image, ...group.additionalImages].map((src) => <OptimizedImage key={src} src={src} alt={group.title} loading="lazy" decoding="async" />)}</div>
              : <OptimizedImage src={group.image} alt={group.title} loading="lazy" decoding="async" />}
            <h2>{group.title}</h2>
          </aside>
          <div className="research-editorial-papers">
            {group.papers.map((media) => {
              const paper = publications.find((item) => item.title.startsWith(media.match))
              const details = paperDetails[media.match]
              return (
                <article className="research-editorial-paper" key={media.match}>
                  <div className="research-editorial-media">
                    {media.video
                      ? <EditorialVideo src={media.video.replace('.mp4', '.web.mp4')} poster={media.video.replace('.mp4', '.poster.webp')} />
                      : <OptimizedImage src={media.image} alt="" loading="lazy" decoding="async" />}
                  </div>
                  {media.pending ? <div className="research-editorial-copy">
                    <p className="research-editorial-year"><span>2026</span><span>Teleoperation Demo</span></p>
                    <h3>Robot Object Manipulation through Garment-Based IMU Teleoperation</h3>
                    <p className="research-editorial-abstract">We present a framework that translates garment-based inertial motion capture into robot teleoperation, achieving dexterous object manipulation with natural hand-object interaction, seamless generalization across garments, and reliable long-term control.</p>
                  </div> : <div className="research-editorial-copy">
                    <p className="research-editorial-year"><span>{paper.year}</span><span>{details.venue}</span></p>
                    <h3>{media.match === 'Computational Design of Wiring'
                      ? 'Computational Design of Wiring Layout on Tight Suits with Minimal Motion Resistance'
                      : paper.title}</h3>
                    <p className="research-editorial-abstract">{details.abstract}</p>
                    <a href={paper.href} target="_blank" rel="noopener noreferrer">Paper <span aria-hidden="true">↗</span></a>
                  </div>}
                </article>
              )
            })}
          </div>
        </div>
      ))}
    </section>
  )
}
