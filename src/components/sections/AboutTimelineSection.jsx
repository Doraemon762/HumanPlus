import { useEffect, useRef, useState } from 'react'
import './AboutTimelineSection.css'
import ScrollExpand from '../ui/ScrollExpand'
import StrokeText from '../ui/StrokeText'

const PHASES = [
  {
    years: '2016 – 2023',
    index: '01',
    question: 'How did natural interaction become wearable motion sensing?',
    summary: 'HUMANPLUS moved from understanding gaze and foot gestures in virtual environments to sensing the body directly with flexible on-body systems. Natural movement became continuous, repeatable data.',
    system: ['Natural interaction', 'Soft sensor', 'On-body'],
    visual: {
      primary: 'images/research/story/phase-02-overview-full.png',
      secondary: 'images/research/papers/27.jpg',
      caption: 'From natural interaction to sensing that moves with the body.',
    },
    projects: [
      { year: '2017', role: 'FOUNDATION', title: 'Understanding the impact of multimodal interaction using gaze informed mid-air gesture control in 3D virtual objects manipulation', venue: 'International Journal of Human-Computer Studies', href: 'https://doi.org/10.1016/j.ijhcs.2017.04.002', image: 'images/research/story/phase-01-gaze.png' },
      { year: '2019', role: 'FOUNDATION', title: 'Accurate and Fast Classification of Foot Gestures for Virtual Locomotion', venue: 'ISMAR', href: 'https://doi.org/10.1109/ISMAR.2019.000-6', image: 'images/research/papers/29.webp' },
      { year: '2020', role: 'MILESTONE', title: 'Sensock: 3D Foot Reconstruction with Flexible Sensors', venue: 'CHI', href: 'https://junconglin.github.io/', image: 'images/research/story/phase-02-sensocks.png' },
      { year: '2020', role: 'MILESTONE', title: '3D Upper Body Reconstruction with Sparse Soft Sensors', venue: 'Soft Robotics', href: 'https://doi.org/10.1089/soro.2019.0187', image: 'images/research/papers/27.jpg' },
      { year: '2023', role: 'MILESTONE', title: 'DisPad: Flexible On-Body Displacement of Fabric Sensors for Robust Joint-Motion Tracking', venue: 'IMWUT', href: 'https://www.humanplus.xyz/imwut2023xw', image: 'images/research/story/phase-02-dispad.png' },
      { year: '2023', role: 'MILESTONE', title: 'Computational Design of Wiring Layout on Tight Suits with Minimal Motion Resistance', venue: 'SIGGRAPH Asia', href: 'https://www.humanplus.xyz/siggraph-asia-2023', image: 'images/research/papers/19.png' },
    ],
  },
  {
    years: '2024 – 2025',
    index: '03',
    question: 'How can motion capture work in everyday clothing?',
    summary: 'The system left the ideal conditions of the lab. It learned to handle loose garments, changing sensor positions, different body shapes and long-term drift.',
    system: ['Daily garment', 'Sparse IMU', 'Long-term'],
    visual: {
      primary: 'images/research/story/phase-03-loose-jacket.png',
      secondary: 'images/research/story/phase-03-moda.png',
      caption: 'Motion capture left the lab suit and entered daily clothing.',
    },
    projects: [
      {
        year: '2024', role: 'TURNING POINT', title: 'Loose Inertial Poser: Motion Capture with IMU-attached Loose-Wear Jacket', venue: 'CVPR', image: 'images/research/story/phase-03-loose-jacket.png',
        links: [
          { label: 'project', href: 'https://www.humanplus.xyz/cvpr2024-zcx' },
          { label: 'paper', href: 'https://ieeexplore.ieee.org/document/10657915' },
          { label: 'github', href: 'https://github.com/ZuoCX1996/Loose-Inertial-Poser' },
        ],
      },
      { year: '2024', role: 'METHOD', title: 'SuDA: Support-based Domain Adaptation for Sim2Real Hinge Joint Tracking with Flexible Sensors', venue: 'ICML', href: 'https://icml.cc/virtual/2024/poster/34585', image: 'images/research/papers/12.png' },
      { year: '2024', role: 'MILESTONE', title: 'Accurate and Steady Inertial Pose Estimation through Sequence Structure Learning and Modulation', venue: 'NeurIPS', href: 'https://www.humanplus.xyz/neurips2024-wyh', image: 'images/research/papers/10.png' },
      { year: '2024', role: 'SUPPORTING', title: 'SATPose: Improving Monocular 3D Pose Estimation with Spatial-aware Ground Tactility', venue: 'ACM Multimedia', href: 'https://www.humanplus.xyz/mm2024-zls', image: 'images/research/papers/11.png' },
      { year: '2025', role: 'MILESTONE', title: 'FIP: Endowing Robust Motion Capture on Daily Garment by Fusing Flex and Inertial Sensors', venue: 'CHI', href: 'https://www.humanplus.xyz/chi2025-zrn', image: 'images/research/papers/7.png' },
      {
        year: '2025', role: 'BEST PAPER', title: 'Transformer IMU Calibrator: Dynamic On-body IMU Calibration for Inertial Motion Capture', venue: 'SIGGRAPH', image: 'images/research/papers/6.png', wideTitle: true,
        links: [
          { label: 'project', href: 'https://www.humanplus.xyz/siggraph-2025-zcx' },
          { label: 'paper', href: 'https://arxiv.org/pdf/2506.10580v1' },
          { label: 'github', href: 'https://github.com/ZuoCX1996/TIC' },
        ],
      },
      { year: '2025', role: 'MILESTONE', title: 'Shape-aware Inertial Poser: Motion Tracking for Humans with Diverse Shapes Using Sparse Inertial Sensors', venue: 'SIGGRAPH Asia', href: 'https://www.humanplus.xyz/siggraph-asia-2025-yl', image: 'images/research/papers/5.png' },
      { year: '2025', role: 'MILESTONE', title: 'ToF-IP: Time-of-Flight Enhanced Sparse Inertial Poser for Real-time Human Motion Capture', venue: 'NeurIPS', href: 'https://www.humanplus.xyz/neurips2025-yy', image: 'images/research/papers/4.png' },
      { year: '2025', role: 'METHOD', title: 'MODA: Motion-drift augmentation for inertial human motion analysis', venue: 'CVPR', href: 'https://openaccess.thecvf.com/content/CVPR2025/html/Wu_MODA_Motion-Drift_Augmentation_for_Inertial_Human_Motion_Analysis_CVPR_2025_paper.html', image: 'images/research/story/phase-03-moda.png' },
    ],
  },
  {
    years: '2026',
    index: '04',
    question: 'How can human life become data for robots?',
    summary: 'Motion capture becomes Life Capture: egocentric vision, whole-body motion and physical interaction are recorded together as scalable learning data for embodied intelligence.',
    system: ['Ego vision', 'Whole-body motion', 'Interaction'],
    visual: {
      primary: 'images/research/story/phase-04-clotho.png',
      secondary: 'images/research/story/phase-04-imitation.png',
      caption: 'From accurate capture to learnable behavior.',
    },
    projects: [
      { year: '2026', role: 'MILESTONE', title: 'CLOTHO: Canonicalizing IMUs from Loose Inertial Garments for Accurate Human Motion Tracking', venue: 'SIGGRAPH Asia · ACM TOG', href: 'https://clotho-mocap.github.io/', image: 'images/research/story/phase-04-clotho.png' },
      { year: '2026', role: 'METHOD', title: 'Improving Sparse IMU-based Motion Capture with Motion Label Smoothing', venue: 'AAAI', href: 'https://www.humanplus.xyz/aaai2026-mzr', image: 'images/research/papers/3.png' },
      { year: '2026', role: 'ROBOT LEARNING', title: 'Distinguishing Imitation Error from Intrinsic Motion Learning Difficulty', venue: 'ICML', href: 'https://www.humanplus.xyz/icml2026-mzr', image: 'images/research/story/phase-04-imitation.png' },
      { year: '2026', role: 'DATASET', title: 'HUMANPLUS-1000', venue: '1000 hour real-world behavior dataset', href: 'https://humanplus-ai.github.io/HumanPlus1000.github.io/', image: 'images/research/humanplus-1000-bg.jpg', datasetCard: true },
    ],
  },
]

function ProjectRow({ project, projectRef, stackIndex }) {
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
        {project.image ? <img src={project.image} alt="" loading="lazy" decoding="async" /> : <span>IMAGE</span>}
      </span>
      <span className="about-timeline-project-copy">
        <strong>{project.title}</strong>
        <span className="about-timeline-project-meta">
          <b>{project.year} {project.venue}</b>
        </span>
      </span>
      <span className="about-timeline-project-links">
        {links.map((link) => (
          <a className="about-timeline-project-link" href={link.href} target="_blank" rel="noreferrer" key={`${link.label}-${link.href}`}>
            {link.label.toLowerCase()} <span aria-hidden="true">↗</span>
          </a>
        ))}
      </span>
    </div>
  )
}

export default function AboutTimelineSection() {
  const projectNodes = useRef([])
  const activeYearRef = useRef('2017')
  const [activeYear, setActiveYear] = useState('2017')
  const [timelineStarted, setTimelineStarted] = useState(false)

  useEffect(() => {
    let frame = 0
    const updateYear = () => {
      frame = 0
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
        const desiredBase = 75 + (header?.offsetHeight || 230) + 4
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
        // The first card stays exactly at stackBase until the whole sticky stack
        // is released by its container. Reading that displacement avoids the
        // circular/stale state caused by deriving the exit from the last card.
        const exitShift = Math.min(0, firstCard.getBoundingClientRect().top - stackBase)
        const sticky = phase.querySelector('.about-timeline-sticky')
        const header = phase.querySelector('.about-timeline-content-header')
        if (!sticky || !header) return
        const stickyBaseTop = Number.parseFloat(getComputedStyle(sticky).top) || 0
        const headerBaseTop = Number.parseFloat(getComputedStyle(header).top) || 0
        const phaseRect = phase.getBoundingClientRect()
        const content = header.parentElement
        const contentRect = content.getBoundingClientRect()
        // Both sticky columns are the first children of their containers, so
        // their un-stuck positions are the container tops. Do not use
        // offsetTop here: browsers update it while a sticky node is attached.
        const stickyNormalTop = phaseRect.top
        const headerNormalTop = contentRect.top
        const naturalStickyTop = Math.min(
          Math.max(stickyNormalTop, stickyBaseTop),
          phaseRect.bottom - sticky.offsetHeight,
        )
        const naturalHeaderTop = Math.min(
          Math.max(headerNormalTop, headerBaseTop),
          contentRect.bottom - header.offsetHeight,
        )
        // A sticky element only needs correcting once it has reached its own
        // sticky offset. A phase that has not been scrolled into view yet still
        // sits below the viewport (naturalTop > baseTop); forcing it up to
        // baseTop would teleport it on top of the phase currently being read.
        const resolveShift = (baseTop, naturalTop, targetExit = exitShift) =>
          naturalTop > baseTop + 1 ? 0 : baseTop + targetExit - naturalTop
        // Once the final card reaches its resting position, the complete phase
        // (Research block, How… header and card stack) leaves as one unit.
        const stickyShift = resolveShift(stickyBaseTop, naturalStickyTop, exitShift)
        const headerShift = resolveShift(headerBaseTop, naturalHeaderTop, exitShift)
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
  }, [])

  let projectIndex = 0

  return (
    <section className="about-timeline" aria-labelledby="about-timeline-title">
      <ScrollExpand
        className="about-timeline-intro"
        src="videos/research/kitchen-vlog.mp4"
        poster="images/motion-0/kitchen-wide.jpg"
        startWidth={39}
        startHeight={43}
        startRadius={26}
        startRight={2.8}
        startBottom={0}
        startShiftX={18}
        topOffset={64}
        verticalAlign="center"
        mediaZoom={1.025}
        scrollDistance={0.9}
        holdDistance={0.52}
        title={(
          <div className="about-timeline-intro-copy">
            <h2 id="about-timeline-title">
              <span>How did Motion Capture</span>
              <span>become Life Capture?</span>
            </h2>
            <p>A decade of research moved human sensing out of controlled experiments and into the clothes, work and life people already live.</p>
          </div>
        )}
      >
        <p className="about-timeline-video-caption">Life becomes the data source.</p>
      </ScrollExpand>

      <div className="about-timeline-phases">
        <div className="about-timeline-centerline" aria-hidden="true" />
        <div className="about-timeline-rail" aria-hidden="true">
          <div className={`about-timeline-active-year ${timelineStarted ? 'is-visible' : ''}`}>
            <span>{activeYear}</span>
            <i />
          </div>
        </div>
        {PHASES.map((phase) => (
          <article className="about-timeline-phase" key={phase.years}>
            <div className="about-timeline-sticky">
              <StrokeText
                text="Research"
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
              <strong className="about-timeline-years">{phase.years}</strong>
              <div className={`about-timeline-phase-media ${phase.visual.fit === 'cover' ? 'is-cover' : ''}`} aria-hidden="true">
                <img src={phase.visual.primary} alt="" loading="eager" decoding="async" />
              </div>
              <p className="about-timeline-visual-caption">{phase.visual.caption}</p>
              <div className="about-timeline-system">
                {phase.system.map((label, index) => <span key={label} style={{ '--system-index': index }}>{label}</span>)}
              </div>
            </div>

            <div className="about-timeline-content">
              <div className="about-timeline-content-header">
                <h3>{phase.question}</h3>
                <p className="about-timeline-summary">{phase.summary}</p>
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
      </div>
    </section>
  )
}
