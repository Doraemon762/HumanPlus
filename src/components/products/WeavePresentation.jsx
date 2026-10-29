import {translate, useSiteLanguage} from '../../i18n'
import Reveal from '../ui/Reveal'
import DeferredVideo from '../ui/DeferredVideo'
import OptimizedImage from '../ui/OptimizedImage'
import { Bluetooth, HardDriveUpload, Users } from 'lucide-react'
import './WeavePresentation.css'
import CapturePerformanceScroll from '../sections/CapturePerformanceScroll'

const root = 'images/motion-0/bento/'
function Picture({ src, alt, priority=false }) {
  useSiteLanguage()
  return <OptimizedImage src={src} alt={translate(alt)} fetchPriority={priority?'high':undefined} loading={priority?'eager':'lazy'} decoding="async" />
}
export default function WeavePresentation() {
  useSiteLanguage()
  return <>
    <section id="m0-hero" className="weave-screen weave-launch">
      <Reveal><h1>{translate("Weave")}</h1><h2>{translate("Capture motion")}<br />{translate("Wear naturally")}</h2><p>{translate("Garment-based full-body motion capture for human data and robot learning.")}</p><a href="#/contact">{translate("Contact Us ↗")}</a></Reveal>
      <div className="weave-art"><Picture priority src="images/motion-0/weave-garment-set.png" alt={translate("Weave capture jacket and trousers")} /></div>
    </section>
    <CapturePerformanceScroll />
    <section id="m0-features" className="weave-screen weave-sensors">
      <div className="weave-art"><Picture src="images/motion-0/weave-mannequin-front.png" alt={translate("Mannequin wearing the Weave 11-IMU jacket and trousers")} /></div>
      <Reveal><span className="weave-number">{translate("11 ")}<small>{translate("IMUs")}</small></span><h2>{translate("Full-body sensing")}</h2><p>{translate("11 nine-axis inertial sensors capture whole-body movement.")}</p></Reveal>
    </section>
    <section className="weave-screen weave-accuracy">
      <Reveal><span className="weave-number">{translate("< 2 ")}<small>{translate("cm")}</small></span><h2>{translate("Pose accuracy")}</h2><p>{translate("Less than 2 cm pose error for high-accuracy motion reconstruction.")}</p></Reveal>
      <div className="weave-pair"><Picture src={root + 'tracking-person.jpg'} alt={translate("Human motion capture")} /><Picture src={root + 'tracking-robot.jpg'} alt={translate("Robot reproducing captured movement")} /></div>
    </section>
    <section className="weave-screen weave-care">
      <div className="weave-art"><Picture src="images/motion-0/weave-garment-set.png" alt={translate("Loose-fitting Weave jacket and trousers for comfortable extended wear")} /></div>
      <Reveal><h2>{translate("Comfortable to wear")}</h2><p>{translate("A loose-fitting garment designed for extended wear.")}</p></Reveal>
    </section>
    <section className="weave-screen weave-wash">
      <Reveal><h2>{translate("Easy to wash")}</h2><p>{translate("Washable for straightforward everyday care and cleaning.")}</p></Reveal>
      <div className="weave-pair"><Picture src={root + 'fabric-beige.jpg'} alt={translate("Weave beige fabric detail")} /><Picture src={root + 'fabric-blue.jpg'} alt={translate("Weave blue fabric detail")} /></div>
    </section>
    <section id="weave-teleoperation" className="weave-screen weave-teleoperation">
      <Reveal><h2>{translate("Can be used for")}<br />{translate("robot teleoperation")}</h2><p>{translate("Use captured human movement to teleoperate robots.")}</p></Reveal>
      <div className="weave-film"><DeferredVideo src="videos/motion-0/wear-to-capture.mp4" poster="videos/motion-0/wear-to-capture-poster.jpg" autoPlay muted loop playsInline disablePictureInPicture aria-label={translate("Weave robot teleoperation demonstration")} /></div>
    </section>
    <section className="weave-screen weave-capabilities">
      <Reveal><h2>{translate("Ready for your workflow")}</h2></Reveal>
      <div className="weave-capabilities-grid">{[
        [HardDriveUpload, 'Standardized data output', 'Real-time BVH streaming with visualization support.'],
        [Bluetooth, 'Rapid deployment and synchronization', 'Connect over Bluetooth without a dedicated receiver. The jacket and trousers share a unified time reference.'],
        [Users, 'Multi-user capture', 'Capture multiple users simultaneously in the same space.'],
      ].map(([Icon, title, description], index) => <Reveal key={title}><div className="weave-capability-marker"><Icon aria-hidden="true"/></div><h3>{translate(title)}</h3><p>{translate(description)}</p></Reveal>)}</div>
    </section>
  </>
}
