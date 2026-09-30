import './AboutTimelineSection.css'

const PHASES = [
  {
    years: '2016–2019',
    index: '01',
    question: 'How can machines understand natural human behavior?',
    summary: 'HUMANPLUS began with gaze, hand and foot gestures, and interaction in virtual environments—learning how people communicate intention through natural movement.',
    system: ['GAZE', 'GESTURE', 'INTERACTION'],
    projects: [
      { year: '2017', title: 'Gaze-informed Mid-air Gesture Control', venue: 'International Journal of Human-Computer Studies' },
      { year: '2019', title: 'Fast Classification of Foot Gestures', venue: 'ISMAR' },
    ],
  },
  {
    years: '2020–2023',
    index: '02',
    question: 'How can flexible sensing become part of clothing?',
    summary: 'The work moved from understanding isolated gestures to sensing the body continuously. Soft sensors, wiring and displacement became one connected wearable-system problem.',
    system: ['SOFT SENSOR', 'ON-BODY', 'REPEATABLE'],
    projects: [
      { year: '2020', title: 'Sensocks: 3D Foot Reconstruction with Soft Stretchable Sensors', venue: 'CHI' },
      { year: '2020', title: '3D Upper Body Reconstruction with Sparse Soft Sensors', venue: 'Soft Robotics' },
      { year: '2023', title: 'DisPad: Robust Joint-Motion Tracking under Fabric Sensor Displacement', venue: 'IMWUT', href: 'https://www.humanplus.xyz/imwut2023xw' },
      { year: '2023', title: 'Self-Adaptive Motion Tracking against On-body Displacement', venue: 'NeurIPS', href: 'https://www.humanplus.xyz/neurips-2023' },
      { year: '2023', title: 'Computational Design of Wiring Layout on Tight Suits', venue: 'SIGGRAPH Asia', href: 'https://www.humanplus.xyz/siggraph-asia-2023' },
    ],
  },
  {
    years: '2024–2025',
    index: '03',
    question: 'How can motion capture work in everyday clothing?',
    summary: 'The system left the ideal conditions of the lab. It learned to handle loose garments, changing sensor positions, different body shapes and long-term drift.',
    system: ['DAILY GARMENT', 'SPARSE IMU', 'LONG-TERM'],
    projects: [
      { year: '2024', title: 'Loose Inertial Poser', venue: 'CVPR', href: 'https://www.humanplus.xyz/cvpr2024-zcx' },
      { year: '2024', title: 'Accurate and Steady Inertial Pose Estimation', venue: 'NeurIPS', href: 'https://www.humanplus.xyz/neurips2024-wyh' },
      { year: '2024', title: 'SATPose: Spatial-aware Ground Tactility', venue: 'ACM Multimedia', href: 'https://www.humanplus.xyz/mm2024-zls' },
      { year: '2025', title: 'FIP: Robust Motion Capture on Daily Garment', venue: 'CHI', href: 'https://www.humanplus.xyz/chi2025-zrn' },
      { year: '2025', title: 'Transformer IMU Calibrator', venue: 'SIGGRAPH · Best Paper', href: 'https://www.humanplus.xyz/siggraph-2025-zcx' },
      { year: '2025', title: 'Shape-aware Inertial Poser', venue: 'SIGGRAPH Asia', href: 'https://www.humanplus.xyz/siggraph-asia-2025-yl' },
      { year: '2025', title: 'ToF-IP: Time-of-Flight Enhanced Sparse Inertial Poser', venue: 'NeurIPS', href: 'https://www.humanplus.xyz/neurips2025-yy' },
    ],
  },
  {
    years: '2026 →',
    index: '04',
    question: 'How can human life become data for robots?',
    summary: 'Motion capture becomes Life Capture: egocentric vision, whole-body motion and physical interaction are recorded together as scalable learning data for embodied intelligence.',
    system: ['EGO VISION', 'WHOLE-BODY MOTION', 'INTERACTION'],
    projects: [
      { year: '2026', title: 'CLOTHO: Canonicalizing IMUs from Loose Garments', venue: 'SIGGRAPH Asia', href: 'https://orca.cardiff.ac.uk/id/eprint/189362/' },
      { year: '2026', title: 'Motion Label Smoothing for Sparse IMU Capture', venue: 'AAAI', href: 'https://www.humanplus.xyz/aaai2026-mzr' },
      { year: '2026', title: 'Imitation Error vs. Intrinsic Motion Learning Difficulty', venue: 'ICML', href: 'https://www.humanplus.xyz/icml2026-mzr' },
      { year: '2026', title: 'Motion-0 + Head-mounted Device', venue: 'HUMANPLUS' },
      { year: '2026', title: 'HUMANPLUS-1000', venue: '1,000-hour real-world behavior dataset', href: 'https://humanplus-ai.github.io/HumanPlus1000.github.io/' },
    ],
  },
]

function ProjectRow({ project }) {
  const content = (
    <>
      <span className="about-timeline-project-year">{project.year}</span>
      <span className="about-timeline-project-copy">
        <strong>{project.title}</strong>
        <small>{project.venue}</small>
      </span>
      {project.href && <span className="about-timeline-project-arrow" aria-hidden="true">↗</span>}
    </>
  )

  return project.href ? (
    <a className="about-timeline-project" href={project.href} target="_blank" rel="noreferrer">{content}</a>
  ) : (
    <div className="about-timeline-project">{content}</div>
  )
}

export default function AboutTimelineSection() {
  return (
    <section className="about-timeline" aria-labelledby="about-timeline-title">
      <header className="about-timeline-intro">
        <p className="about-timeline-eyebrow">OUR EVOLUTION</p>
        <h2 id="about-timeline-title">How did Motion Capture become Life Capture?</h2>
        <p className="about-timeline-lede">A decade of research moved human sensing out of controlled experiments and into the clothes, work and life people already live.</p>
      </header>

      <div className="about-timeline-phases">
        {PHASES.map((phase) => (
          <article className="about-timeline-phase" key={phase.years}>
            <div className="about-timeline-sticky">
              <div className="about-timeline-orbit" aria-hidden="true">
                <span>{phase.index}</span>
                <i />
                <b />
              </div>
              <p className="about-timeline-years">{phase.years}</p>
              <div className="about-timeline-system">
                {phase.system.map((label, index) => <span key={label} style={{ '--system-index': index }}>{label}</span>)}
              </div>
            </div>

            <div className="about-timeline-content">
              <h3>{phase.question}</h3>
              <p className="about-timeline-summary">{phase.summary}</p>
              <div className="about-timeline-projects">
                {phase.projects.map((project) => <ProjectRow project={project} key={`${project.year}-${project.title}`} />)}
              </div>
            </div>
          </article>
        ))}
      </div>

      <footer className="about-timeline-outro">
        <p>Human behavior is more than motion.</p>
        <h2>Life becomes the data source.</h2>
        <span>Human → Data → Robot</span>
      </footer>
    </section>
  )
}
