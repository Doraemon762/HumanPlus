import {translate, useSiteLanguage} from '../../i18n'
import { HardDriveUpload, Wifi, Users } from 'lucide-react'
import OptimizedImage from '../ui/OptimizedImage'
import Reveal from '../ui/Reveal'
import DeferredVideo from '../ui/DeferredVideo'
import { toHref } from '../../hooks/useHashRoute'
import './StrapZeroHero.css'
import PulseExploded from './PulseExploded'

const image = 'images/products/pulse-strap-new.png'
const specs = [
  ['Sensors', '17 × 9-axis IMUs'], ['Default sampling rate', '60 Hz'], ['Output', 'Real-time BVH stream'],
  ['Sensor dimensions', '38 × 28 × 17 mm'], ['Connectivity', '2.4 GHz Wi-Fi / UDP'],
  ['Synchronization', 'LAN time synchronization; UTC timestamp output'], ['Indoor operating distance', '6 m'],
  ['Battery life', '8 h'], ['Charging port', 'USB Type-C'], ['Accelerometer range', '±8 g'], ['Gyroscope range', '±2000°/s'],
]

export default function StrapZeroHero() {
  useSiteLanguage()
  return <div className="pulse-page">
    <section className="pulse-hero">
      <Reveal><h1>{translate("Pulse")}</h1><p className="pulse-lead">{translate("Move naturally.")}<br />{translate("Capture completely.")}</p><p className="pulse-sub">{translate("17 synchronized IMUs. Real-time human motion.")}</p><a className="pulse-contact" href={toHref('/contact')}>{translate("Contact Us ↗")}</a></Reveal>
      <OptimizedImage sizes="(max-width: 767px) 90vw, 55vw" src={image} alt={translate("Pulse IMU sensor on its wearable strap")} fetchPriority="high" />
    </section>
    <PulseExploded />
    <section className="pulse-feature pulse-feature--endurance">
      <div className="pulse-dial"><svg viewBox="0 0 500 500" aria-hidden="true">{translate(Array.from({length: 41}, (_, i) => { const angle = (-150 + i * 7.5) * Math.PI / 180; const r = i % 5 === 0 ? 212 : 225; return <line key={i} x1={250 + r * Math.sin(angle)} y1={250 - r * Math.cos(angle)} x2={250 + 240 * Math.sin(angle)} y2={250 - 240 * Math.cos(angle)} /> }))}</svg><span className="pulse-dial-number">{translate("8")}<span className="pulse-dial-unit">{translate("h")}</span></span><OptimizedImage sizes="(max-width: 767px) 90vw, 55vw" src={image} alt={translate("Pulse wearable sensor with eight-hour battery life")} loading="lazy" /></div>
      <Reveal><h2>{translate("8-hour battery life")}<br /><span className="pulse-feature-line">{translate("Keep the motion going")}</span></h2><p>{translate("Eight hours of battery life for extended capture sessions. Recharge through USB Type-C and return to recording with a lightweight, wearable setup.")}</p></Reveal>
    </section>
    <section className="pulse-feature pulse-feature--battery pulse-feature--body">
      <Reveal><h2><em>{translate("17")}<span>{translate(" IMUs")}</span></em><br /><span className="pulse-feature-line">{translate("One connected body")}</span></h2><p>{translate("Capture whole-body movement with 17 nine-axis inertial sensors. Time synchronization keeps the sensors aligned, turning natural movement into a continuous motion stream.")}</p></Reveal><div className="pulse-body-art"><OptimizedImage sizes="(max-width: 767px) 90vw, 55vw" src="images/products/pulse-body-front-back.png" alt={translate("Front and rear views of the Pulse full-body IMU strap configuration")} loading="lazy" /></div>
    </section>
    <section className="pulse-demo-space"><Reveal><h2>{translate("Pulse in motion")}</h2></Reveal><div className="pulse-demo-video"><DeferredVideo src="media/optimized-current/pulse-demo-20261026.desktop.mp4" poster="media/optimized-current/pulse-demo-20261026.jpg" autoPlay muted loop playsInline controls aria-label={translate("Pulse motion capture demonstration")} /></div></section>
    <section className="pulse-data"><Reveal><h2>{translate("Live motion")}<br />{translate("Straight to your workflow")}</h2></Reveal><div className="pulse-data-grid">{[
      ['Real-time BVH', 'Stream motion data through UDP in a standardized BVH workflow.'],
      ['Wi-Fi, simplified', 'Connect through a standard 2.4 GHz Wi-Fi router. No dedicated receiver is required.'],
      ['Multi-user capture', 'Record multiple users on the same local network, with synchronized sensing for each wearer.'],
    ].map(([title, copy], index) => <Reveal key={title}><div className="pulse-feature-icon-row">{translate([<HardDriveUpload key="output"/>, <Wifi key="wifi"/>, <Users key="users"/>][index])}</div><h3>{translate(title)}</h3><p>{translate(copy)}</p></Reveal>)}</div></section>
    <section className="pulse-specs pulse-specs--with-art"><Reveal as="h2">{translate("Technical specifications")}</Reveal><div className="pulse-specs-layout"><div><dl>{specs.map(([key, value]) => <div key={key}><dt>{translate(key)}</dt><dd>{translate(value)}</dd></div>)}</dl><a className="pulse-contact" href={toHref('/contact')}>{translate("Contact Us ↗")}</a></div><figure className="pulse-specs-art"><OptimizedImage sizes="(max-width: 767px) 90vw, 55vw" src={image} alt={translate("Pulse IMU sensor and wearable strap")} loading="lazy" /></figure></div></section>
  </div>
}
