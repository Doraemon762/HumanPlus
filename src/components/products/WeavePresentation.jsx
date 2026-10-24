import Reveal from '../ui/Reveal'
import DeferredVideo from '../ui/DeferredVideo'
import OptimizedImage from '../ui/OptimizedImage'
import { Bluetooth, HardDriveUpload, Users } from 'lucide-react'
import './WeavePresentation.css'
import CapturePerformanceScroll from '../sections/CapturePerformanceScroll'

const root = 'images/motion-0/bento/'
function Picture({ src, alt }) {
  return <OptimizedImage src={src} alt={alt} loading="lazy" decoding="async" />
}
export default function WeavePresentation() {
  return <>
    <section id="m0-hero" className="weave-screen weave-launch">
      <Reveal><h1>Weave</h1><h2>Capture motion<br />Wear naturally</h2><p>Garment-based full-body motion capture for human data and robot learning.</p><a href="#/contact">Request a Quote ↗</a></Reveal>
      <div className="weave-art"><Picture src="images/motion-0/weave-garment-set.png" alt="Weave capture jacket and trousers" /></div>
    </section>
    <CapturePerformanceScroll />
    <section id="m0-features" className="weave-screen weave-sensors">
      <div className="weave-art"><Picture src="images/motion-0/weave-mannequin-front.png" alt="Mannequin wearing the Weave 11-IMU jacket and trousers" /></div>
      <Reveal><span className="weave-number">11 <small>IMUs</small></span><h2>Full-body sensing</h2><p>11 nine-axis inertial sensors capture whole-body movement.</p></Reveal>
    </section>
    <section className="weave-screen weave-accuracy">
      <Reveal><span className="weave-number">&lt; 2 <small>cm</small></span><h2>Pose accuracy</h2><p>Less than 2 cm pose error for high-accuracy motion reconstruction.</p></Reveal>
      <div className="weave-pair"><Picture src={root + 'tracking-person.jpg'} alt="Human motion capture" /><Picture src={root + 'tracking-robot.jpg'} alt="Robot reproducing captured movement" /></div>
    </section>
    <section className="weave-screen weave-capabilities">
      <Reveal><h2>Ready for your workflow</h2></Reveal>
      <div className="weave-capabilities-grid">{[
        [HardDriveUpload, 'Standardized data output', 'Real-time BVH streaming with visualization support.'],
        [Bluetooth, 'Rapid deployment and synchronization', 'Connect over Bluetooth without a dedicated receiver. The jacket and trousers share a unified time reference.'],
        [Users, 'Multi-user capture', 'Capture multiple users simultaneously in the same space.'],
      ].map(([Icon, title, description], index) => <Reveal key={title}><div className="weave-capability-marker"><Icon aria-hidden="true"/><span>0{index + 1}</span></div><h3>{title}</h3><p>{description}</p></Reveal>)}</div>
    </section>
    <section className="weave-screen weave-care">
      <div className="weave-art"><Picture src="images/motion-0/weave-garment-set.png" alt="Loose-fitting Weave jacket and trousers for comfortable extended wear" /></div>
      <Reveal><h2>Comfortable to wear</h2><p>A loose-fitting garment designed for extended wear.</p></Reveal>
    </section>
    <section className="weave-screen weave-wash">
      <Reveal><h2>Easy to wash</h2><p>Washable for straightforward everyday care and cleaning.</p></Reveal>
      <div className="weave-pair"><Picture src={root + 'fabric-beige.jpg'} alt="Weave beige fabric detail" /><Picture src={root + 'fabric-blue.jpg'} alt="Weave blue fabric detail" /></div>
    </section>
    <section id="weave-teleoperation" className="weave-screen weave-teleoperation">
      <Reveal><h2>Built for robot<br />teleoperation</h2><p>Use captured human movement to teleoperate robots.</p></Reveal>
      <div className="weave-film"><DeferredVideo src="videos/motion-0/wear-to-capture.mp4" poster="videos/motion-0/wear-to-capture-poster.jpg" autoPlay muted loop playsInline disablePictureInPicture aria-label="Weave robot teleoperation demonstration" /></div>
    </section>
  </>
}
