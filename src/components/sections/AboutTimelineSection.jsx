import './AboutTimelineSection.css'
import ScrollExpand from '../ui/ScrollExpand'
import ConcaveCarousel from '../ui/ConcaveCarousel'

const PHASES = [
  {
    years: '2016 – 2023',
    heading: 'Sensing Human Movement',
    question: 'How did natural interaction become wearable motion sensing?',
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
    heading: 'Soft Sensing for Smart Clothing',
    question: 'How can motion capture work in everyday clothing?',
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
    heading: 'Human Data for Robot Learning',
    question: 'How can human life become data for robots?',
    projects: [
      { year: '2026', role: 'MILESTONE', title: 'CLOTHO: Canonicalizing IMUs from Loose Inertial Garments for Accurate Human Motion Tracking', venue: 'SIGGRAPH Asia · ACM TOG', href: 'https://clotho-mocap.github.io/', image: 'images/research/story/phase-04-clotho.png' },
      { year: '2026', role: 'METHOD', title: 'Improving Sparse IMU-based Motion Capture with Motion Label Smoothing', venue: 'AAAI', href: 'https://www.humanplus.xyz/aaai2026-mzr', image: 'images/research/papers/3.png' },
      { year: '2026', role: 'ROBOT LEARNING', title: 'Distinguishing Imitation Error from Intrinsic Motion Learning Difficulty', venue: 'ICML', href: 'https://www.humanplus.xyz/icml2026-mzr', image: 'images/research/story/phase-04-imitation.png' },
      { year: '2026', role: 'DATASET', title: 'HUMANPLUS-1000', venue: '1000 hour real-world behavior dataset', href: 'https://humanplus-ai.github.io/HumanPlus1000.github.io/', image: 'images/research/humanplus-1000-bg.jpg', datasetCard: true },
    ],
  },
]

export default function AboutTimelineSection() {
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
        topOffset={72}
        verticalAlign="center"
        mediaZoom={1.025}
        scrollDistance={0.9}
        holdDistance={0.52}
        title={(
          <div className="about-timeline-intro-copy">
            <h2 id="about-timeline-title">
              <span>From Motion Capture</span>
              <span>to Life Capture</span>
            </h2>
            <p>A decade of research has brought human sensing beyond the lab, from natural interaction and wearable motion capture to real-world human data.</p>
          </div>
        )}
      >
        <p className="about-timeline-video-caption">Life becomes the data source.</p>
      </ScrollExpand>

      <div className="research-carousel-section">
        {PHASES.map((phase) => (
          <article className="research-carousel-group" key={phase.years}>
            <header className="research-carousel-group-heading">
              <p>RESEARCH / {phase.years}</p>
              <h3>{phase.heading}</h3>
            </header>
            <ConcaveCarousel
              ariaLabel={`${phase.question} papers`}
              items={phase.projects.map((project) => ({
                src: project.image,
                alt: project.title,
                title: project.title,
                subtitle: `${project.year} · ${project.venue}`,
                links: project.links || (project.href ? [{
                  label: project.href.includes('doi.org') || project.href.includes('openaccess.') || project.href.includes('dl.acm.org') ? 'paper' : 'project',
                  href: project.href,
                }] : []),
              }))}
            />
          </article>
        ))}
      </div>

    </section>
  )
}
