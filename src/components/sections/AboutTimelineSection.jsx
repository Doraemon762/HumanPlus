import {translate, useSiteLanguage} from '../../i18n'
import { useEffect, useRef, useState } from 'react'
import './AboutTimelineSection.css'
import ScrollExpand from '../ui/ScrollExpand'
import StrokeText from '../ui/StrokeText'
import DeferredVideo from '../ui/DeferredVideo'

const PHASES = [
  {
    "years": "2016 – 2023",
    "index": "01",
    "question": "Sensing Human Movement",
    "summary": "HUMANPLUS moved from understanding gaze and foot gestures in virtual environments to sensing the body directly with flexible on-body systems. Natural movement became continuous, repeatable data.",
    "system": [
      "Natural interaction",
      "Soft sensor",
      "On-body"
    ],
    "visual": {
      "primary": "media/research-20261013/wiring-left-2023.png",
      "secondary": "images/research/clothing-20261012/wiring.png",
      "caption": "From natural interaction to sensing that moves with the body."
    },
    "projects": [
      {
        "year": "2023",
        "title": "Computational Design of Wiring Layout on Tight Suits with Minimal Motion Resistance",
        "venue": "SIGGRAPH Asia 2023 (ACM TOG)",
        "href": "https://arxiv.org/abs/2309.10226",
        "links": [
          {
            "label": "paper",
            "href": "https://arxiv.org/abs/2309.10226"
          }
        ],
        "image": "media/research-20261013/wiring-right-2023.png",
        "role": "MILESTONE"
      }
    ]
  },
  {
    "years": "2024 – 2025",
    "index": "03",
    "question": "Soft Sensing for Smart Clothing",
    "summary": "The system left the ideal conditions of the lab. It learned to handle loose garments, changing sensor positions, different body shapes and long-term drift.",
    "system": [
      "Daily garment",
      "Sparse IMU",
      "Long-term"
    ],
    "visual": {
      "primary": "images/research/clothing-20261012/loose-poser.png",
      "secondary": "images/research/clothing-20261012/fip.jpeg",
      "caption": "Motion capture left the lab suit and entered daily clothing."
    },
    "projects": [
      {
        "year": "2024",
        "title": "Loose Inertial Poser: Motion Capture with IMU-attached Loose-Wear Jacket",
        "venue": "CVPR 2024",
        "href": "https://openaccess.thecvf.com/content/CVPR2024/papers/Zuo_Loose_Inertial_Poser_Motion_Capture_with_IMU-attached_Loose-Wear_Jacket_CVPR_2024_paper.pdf",
        "links": [
          {
            "label": "paper",
            "href": "https://openaccess.thecvf.com/content/CVPR2024/papers/Zuo_Loose_Inertial_Poser_Motion_Capture_with_IMU-attached_Loose-Wear_Jacket_CVPR_2024_paper.pdf"
          }
        ],
        "image": "images/research/clothing-20261012/loose-poser.png",
        "video": "media/research-20261013/lip-2024.mp4",
        "role": "MILESTONE"
      },
      {
        "year": "2025",
        "title": "Transformer IMU Calibrator: Dynamic On-body IMU Calibration for Inertial Motion Capture",
        "venue": "ACM TOG (SIGGRAPH 2025)",
        "href": "https://arxiv.org/abs/2506.10580",
        "links": [
          {
            "label": "paper",
            "href": "https://arxiv.org/abs/2506.10580"
          }
        ],
        "image": "images/research/clothing-20261012/tic.png",
        "video": "media/research-20261013/tic-2025.mp4",
        "role": "MILESTONE"
      },
      {
        "year": "2025",
        "title": "FIP: Endowing Robust Motion Capture on Daily Garment by Fusing Flex and Inertial Sensors",
        "venue": "CHI 2025",
        "href": "https://arxiv.org/abs/2502.15058",
        "links": [
          {
            "label": "paper",
            "href": "https://arxiv.org/abs/2502.15058"
          }
        ],
        "image": "images/research/clothing-20261012/fip.jpeg",
        "video": "media/research-20261013/fip-2025.mp4",
        "role": "MILESTONE"
      }
    ]
  },
  {
    "years": "2026",
    "index": "04",
    "question": "Human Data for Robot Learning",
    "summary": "Motion capture becomes Life Capture: egocentric vision, whole-body motion and physical interaction are recorded together as scalable learning data for embodied intelligence.",
    "system": [
      "Ego vision",
      "Whole-body motion",
      "Interaction"
    ],
    "visual": {
      "primary": "media/research-20261013/clotho-left-2026.png",
      "secondary": "images/research/clothing-20261012/label-smoothing.png",
      "caption": "From accurate capture to learnable behavior."
    },
    "projects": [
      {
        "year": "2026",
        "title": "CLOTHO: Canonicalizing IMUs from Loose Inertial Garments for Accurate Human Motion Tracking",
        "venue": "SIGGRAPH Asia 2026（ACM TOG）",
        "href": "https://clotho-mocap.github.io/",
        "links": [
          {
            "label": "project",
            "href": "https://clotho-mocap.github.io/"
          }
        ],
        "image": "images/research/clothing-20261012/clotho.png",
        "video": "media/research-20261013/clotho-2026.mp4",
        "role": "MILESTONE"
      },
      {
        "year": "2026",
        "title": "Improving Sparse IMU-based Motion Capture with Motion Label Smoothing",
        "venue": "AAAI 2026",
        "href": "https://arxiv.org/abs/2511.22288",
        "links": [
          {
            "label": "paper",
            "href": "https://arxiv.org/abs/2511.22288"
          }
        ],
        "image": "images/research/clothing-20261012/label-smoothing.png",
        "video": "media/research-20261013/label-smoothing-2026.mp4",
        "role": "MILESTONE"
      }
    ]
  }
]

function ProjectRow({ project, projectRef, stackIndex }) {
  useSiteLanguage()
  const links = project.links || (project.href ? [{ label: project.href.includes('doi.org') || project.href.includes('openaccess.') || project.href.includes('dl.acm.org') ? 'paper' : 'project', href: project.href }] : [])

  return (
    <div
      className={`about-timeline-project ${project.image ? 'has-image' : ''} ${project.wideTitle ? 'has-wide-title' : ''} ${project.datasetCard ? 'is-dataset-card' : ''}`}
      ref={projectRef}
      data-timeline-year={project.year}
      data-stack-index={stackIndex}
      style={{ '--stack-index': stackIndex, '--last-stack-index': Math.max(stackIndex - 1, 0) }}
    >
      <span className={`about-timeline-project-media ${project.image ? 'has-image' : ''}`} aria-hidden="true">
        {translate(project.video
          ? <DeferredVideo src={project.video} poster={project.image} autoPlay muted loop disablePictureInPicture />
          : project.image ? <img src={project.image} alt={translate("")} loading="lazy" decoding="async" /> : <span>{translate("IMAGE")}</span>)}
      </span>
      <span className="about-timeline-project-copy">
        <strong>{translate(project.title)}</strong>
        <span className="about-timeline-project-meta">
          <b>{translate(project.year)}{translate(" · ")}{translate(project.venue.replace(new RegExp(`\\s*${project.year}`, 'g'), '').trim())}</b>
        </span>
      </span>
      <span className="about-timeline-project-links">
        {links.map((link) => (
          <a className="about-timeline-project-link" href={link.href} target="_blank" rel="noreferrer" key={`${link.label}-${link.href}`}>
            {translate(link.label.toLowerCase())} <span aria-hidden="true">{translate("↗")}</span>
          </a>
        ))}
      </span>
    </div>
  )
}

export default function AboutTimelineSection({ showTimeline = true }) {
  useSiteLanguage()
  const projectNodes = useRef([])
  const activeYearRef = useRef('2023')
  const [activeYear, setActiveYear] = useState('2023')
  const [timelineStarted, setTimelineStarted] = useState(false)

  useEffect(() => {
    if (!showTimeline) return
    let frame = 0
    const updateYear = () => {
      frame = 0
      if (window.matchMedia('(max-width: 767px)').matches) {
        projectNodes.current.forEach((node) => {
          if (!node) return
          node.classList.remove('is-covered')
          node.parentElement.style.removeProperty('--stack-card-height')
        })
        return
      }
      let visibleYear = activeYearRef.current
      let hasVisibleCard = false
      let settledYear = null

      projectNodes.current.forEach((node, index, nodes) => {
        if (!node) return
        const list = node.parentElement
        const stackIndex = Number(node.dataset.stackIndex || 0)
        const isLastCard = node === list.lastElementChild
        const header = list.parentElement?.querySelector('.about-timeline-content-header')
        const stackOffset = isLastCard
          ? Math.min(Math.max(stackIndex - 1, 0), 5) * 6
          : Math.min(stackIndex, 5) * 6
        const maximumOffset = Math.min(list.children.length - 1, 5) * 6
        const headingTop = header ? Number.parseFloat(getComputedStyle(header).top) : 75
        const desiredBase = headingTop + (header?.offsetHeight || 80) + 24
        const tallestCard = Array.from(list.children).reduce(
          (height, card) => Math.max(height, card.offsetHeight),
          0,
        )
        list.style.setProperty('--stack-card-height', `${tallestCard}px`)
        const viewportBaseLimit = Math.max(96, window.innerHeight - tallestCard - 22 - maximumOffset)
        const stackBase = Math.min(desiredBase, viewportBaseLimit)
        const stickyTop = stackBase + stackOffset
        list.style.setProperty('--stack-top', `${stackBase}px`)
        const documentTop = list.getBoundingClientRect().top + window.scrollY + node.offsetTop
        const next = nodes[index + 1]
        const sameListNext = next?.parentElement === list ? next : null
        const nextTop = sameListNext
          ? list.getBoundingClientRect().top + window.scrollY + sameListNext.offsetTop
          : documentTop
        const start = documentTop - stickyTop
        const progress = sameListNext
          ? Math.min(Math.max((window.scrollY - start) / Math.max(1, nextTop - documentTop), 0), 1)
          : 0
        node.style.setProperty('--stack-progress', progress.toFixed(4))
        if (sameListNext) {
          const nextStackIndex = Number(sameListNext.dataset.stackIndex || 0)
          const nextIsLastCard = sameListNext === list.lastElementChild
          const nextStackOffset = nextIsLastCard
            ? Math.min(Math.max(nextStackIndex - 1, 0), 5) * 6
            : Math.min(nextStackIndex, 5) * 6
          const nextRestingTop = stackBase + nextStackOffset
          const nextRect = sameListNext.getBoundingClientRect()
          const nextHasSettled = nextRect.top <= nextRestingTop + 3
          node.classList.toggle('is-covered', nextHasSettled)
        } else {
          node.classList.remove('is-covered')
        }

        const rect = node.getBoundingClientRect()
        if (rect.top <= stickyTop + 24 && rect.bottom > stickyTop) {
          settledYear = node.dataset.timelineYear
        }
        if (rect.top <= window.innerHeight * 0.88 && rect.bottom > 76) hasVisibleCard = true
      })

      if (settledYear) {
        visibleYear = settledYear
      } else {
        let lastCompletedPhase = -1
        document.querySelectorAll('.about-timeline-phase').forEach((phase, phaseIndex) => {
          if (phase.getBoundingClientRect().bottom <= window.innerHeight * 0.92) {
            lastCompletedPhase = phaseIndex
          }
        })
        visibleYear = lastCompletedPhase >= 0
          ? PHASES[lastCompletedPhase].projects.at(-1).year
          : PHASES[0].projects[0].year
      }

      document.querySelectorAll('.about-timeline-phase').forEach((phase) => {
        const cards = phase.querySelectorAll('.about-timeline-project')
        const firstCard = cards[0]
        const lastCard = cards[cards.length - 1]
        if (!firstCard || !lastCard) return
        const list = lastCard.parentElement
        const stackBase = Number.parseFloat(getComputedStyle(list).getPropertyValue('--stack-top')) || 0
        // Earlier grid rows can release before the final card has settled.
        // Only the final card's own sticky release may move the phase heading
        // and left column out of view. The card itself is never transformed.
        const lastOffset = Math.min(Math.max(Number(lastCard.dataset.stackIndex || 0) - 1, 0), 5) * 6
        const exitShift = Math.min(0, lastCard.getBoundingClientRect().top - stackBase - lastOffset)
        const sticky = phase.querySelector('.about-timeline-sticky')
        const header = phase.querySelector('.about-timeline-content-header')
        if (!sticky || !header) return
        const stickyBaseTop = Number.parseFloat(getComputedStyle(sticky).top) || 0
        const headerBaseTop = Number.parseFloat(getComputedStyle(header).top) || 0
        const phaseRect = phase.getBoundingClientRect()
        const content = header.parentElement
        const contentRect = content.getBoundingClientRect()
        // Read the browser's real sticky position, removing our previous
        // correction. Reconstructing it from container height misses grid
        // boundaries, padding and margins and can release the left side early.
        const stickyNormalTop = phaseRect.top
        const headerNormalTop = contentRect.top + Number.parseFloat(getComputedStyle(content).paddingTop)
        const previousStickyShift = Number.parseFloat(phase.style.getPropertyValue('--phase-sticky-shift')) || 0
        const previousHeaderShift = Number.parseFloat(phase.style.getPropertyValue('--phase-header-shift')) || 0
        const naturalStickyTop = sticky.getBoundingClientRect().top - previousStickyShift
        const naturalHeaderTop = header.getBoundingClientRect().top - previousHeaderShift
        // A sticky element only needs correcting once it has reached its own
        // sticky offset. A phase that has not been scrolled into view yet still
        // sits below the viewport (naturalTop > baseTop); forcing it up to
        // baseTop would teleport it on top of the phase currently being read.
        const resolveShift = (baseTop, naturalTop, normalTop) =>
          normalTop > baseTop + 1 ? 0 : baseTop + exitShift - naturalTop
        // Once the final card reaches its resting position, the complete phase
        // (Research block, How… header and card stack) leaves as one unit.
        const stickyShift = resolveShift(stickyBaseTop, naturalStickyTop, stickyNormalTop)
        const headerShift = resolveShift(headerBaseTop, naturalHeaderTop, headerNormalTop)
        phase.style.setProperty('--phase-sticky-shift', `${stickyShift.toFixed(2)}px`)
        phase.style.setProperty('--phase-header-shift', `${headerShift.toFixed(2)}px`)
        if (phase === phase.parentElement.lastElementChild) {
          phase.parentElement.style.setProperty('--timeline-exit-shift', `${exitShift.toFixed(2)}px`)
        }
      })
      activeYearRef.current = visibleYear
      // Once the rail has appeared, keep it visible through the final 2026
      // handoff. Its sticky container will carry it upward with the page.
      setTimelineStarted((started) => started || hasVisibleCard)
      setActiveYear(visibleYear)
    }
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateYear)
    }

    updateYear()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [showTimeline])

  let projectIndex = 0

  return (
    <section className="about-timeline" aria-labelledby="about-timeline-title">
      <ScrollExpand
        className="about-timeline-intro"
        stackOnNarrow
        src="videos/research/kitchen-vlog.mp4"
        poster="images/motion-0/kitchen-wide.jpg"
        startWidth={39}
        startHeight={43}
        startRadius={26}
        startRight={2.8}
        startBottom={0}
        startShiftX={18}
        topOffset={72}
        verticalAlign="center"
        mediaZoom={1.025}
        scrollDistance={0.9}
        holdDistance={0.52}
        title={(
          <div className="about-timeline-intro-copy">
            <h2 id="about-timeline-title">
              <span>{translate("From Motion Capture")}</span>
              <span>{translate("to Life Capture")}</span>
            </h2>
            <p>{translate("A decade of research has brought human sensing beyond the lab, from natural interaction and wearable motion capture to real-world human data.")}</p>
          </div>
        )}
      >
        <p className="about-timeline-video-caption">{translate("Life becomes the data source.")}</p>
      </ScrollExpand>

      {showTimeline && <div className="about-timeline-phases">
        <div className="about-timeline-centerline" aria-hidden="true" />
        <div className="about-timeline-rail" aria-hidden="true">
          <div className={`about-timeline-active-year ${timelineStarted ? 'is-visible' : ''}`}>
            <span>{translate(activeYear)}</span>
            <i />
          </div>
        </div>
        {PHASES.map((phase) => (
          <article className="about-timeline-phase" key={phase.years}>
            <div className="about-timeline-sticky">
              <StrokeText
                text={translate("Research")}
                strokeColor="#5a9cfc"
                fillColor="#5a9cfc"
                strokeWidth={1.4}
                drawDuration={1.2}
                fillDelay={0.08}
                stagger={0.045}
                trigger="scroll"
                fillMode="none"
                fontSize={72}
                fontWeight={720}
                letterSpacing={-2.5}
                animated={false}
                className="about-timeline-research"
              />
              <strong className="about-timeline-years">{translate(phase.years)}</strong>
              <div className={`about-timeline-phase-media ${phase.visual.fit === 'cover' ? 'is-cover' : ''}`} aria-hidden="true">
                <img src={phase.visual.primary} alt={translate("")} loading="eager" decoding="async" />
              </div>
              <p className="about-timeline-visual-caption">{translate(phase.visual.caption)}</p>
              <div className="about-timeline-system">
                {phase.system.map((label, index) => <span key={label} style={{ '--system-index': index }}>{translate(label)}</span>)}
              </div>
            </div>

            <div className="about-timeline-content">
              <div className="about-timeline-content-header">
                <h3>{translate(phase.question)}</h3>
              </div>
              <div className="about-timeline-projects">
                {phase.projects.map((project, phaseProjectIndex) => {
                  const currentIndex = projectIndex
                  projectIndex += 1
                  return (
                    <ProjectRow
                      project={project}
                      stackIndex={phaseProjectIndex}
                      key={`${project.year}-${project.title}`}
                      projectRef={(node) => { projectNodes.current[currentIndex] = node }}
                    />
                  )
                })}
              </div>
            </div>
          </article>
        ))}
      </div>}

    </section>
  )
}
