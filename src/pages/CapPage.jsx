import Reveal from '../components/ui/Reveal'
import '../components/products/StrapZeroHero.css'
import './CapPage.css'

const specifications = [
  ['Sensor', '6-axis IMU'],
  ['Sampling rate', '30 Hz by default, adjustable'],
  ['Data output', 'Quaternions and video'],
  ['Video format', 'MKV'],
  ['Video resolution', '3840 × 1200 at 30 fps'],
  ['Field of view', 'H: 135° · V: 98° · D: 175°'],
  ['Interface', 'USB 3.0 High Speed'],
  ['Shutter', 'Global shutter'],
  ['Camera dimensions', '94 × 30 × 33 mm'],
  ['Accelerometer range', '±16 g / ±2 g'],
  ['Gyroscope range', '±15.625 dps / ±2000 dps'],
]

export default function CapPage() {
  return <div className="cap-page pulse-page">
    <section className="pulse-hero cap-hero">
      <Reveal><h1>CAP</h1><p className="pulse-lead">See naturally<br />Capture in sync</p><p className="pulse-sub">Stereo vision and inertial sensing.<br />First-person capture, made wearable.</p><a className="pulse-contact" href="#/contact">Request a Quote ↗</a></Reveal>
      <img src="images/products/cap.png" alt="HumanPlus CAP with integrated stereo cameras" fetchPriority="high" />
    </section>
    <section className="pulse-feature cap-vision">
      <div className="cap-vision-art" aria-hidden="true"><svg viewBox="0 0 500 400" fill="none"><path d="M165 240 30 55h290L165 240Zm170 0L190 55h280L335 240Z" fill="currentColor" opacity=".045"/><path d="M165 240 30 55m135 185L320 55M335 240 190 55m145 185L470 55" stroke="currentColor" opacity=".18"/><rect x="105" y="220" width="290" height="80" rx="28" stroke="currentColor" strokeWidth="3"/><circle cx="165" cy="260" r="22" stroke="currentColor" strokeWidth="3"/><circle cx="335" cy="260" r="22" stroke="currentColor" strokeWidth="3"/><circle cx="165" cy="260" r="8" fill="currentColor" opacity=".4"/><circle cx="335" cy="260" r="8" fill="currentColor" opacity=".4"/></svg><span>STEREO VISION</span></div>
      <Reveal><h2>Two cameras<br />One perspective</h2><p>Capture synchronized first-person video with stereo vision and a global shutter, supporting 3D reconstruction and wearable sensing research.</p><div className="cap-inline-metrics"><div><strong>30 <small>fps</small></strong><span>3840 × 1200 video</span></div><div><strong>135<small>°</small></strong><span>Horizontal field of view</span></div></div></Reveal>
    </section>
    <section className="pulse-feature pulse-feature--battery cap-inertial">
      <Reveal><h2><em>6<span> axes</span></em><br /><span className="pulse-feature-line">Head movement, in sync</span></h2><p>A six-axis IMU captures head orientation alongside first-person video. Record movement while walking, running and turning for pose estimation and human motion research.</p></Reveal>
      <div className="cap-feature-art"><img src="images/products/cap.png" alt="CAP combines head-mounted stereo cameras with inertial sensing" loading="lazy" /></div>
    </section>
    <section className="pulse-data cap-capabilities">
      <Reveal><h2>Ready for everyday capture</h2></Reveal>
      <div className="pulse-data-grid">{[
        ['Everyday wear', 'An adjustable ergonomic fit supports comfortable, stable wear during everyday movement.', 'users'],
        ['Rapid deployment', 'A straightforward setup and USB 3.0 interface simplify the capture workflow.', 'hard-drive-upload'],
        ['Real-time recording', 'Record first-person video and head movement in real time, with quaternion and video output.', 'hard-drive-upload'],
      ].map(([title, detail, icon], index) => <Reveal key={title}><div className="pulse-feature-icon-row"><img className="pulse-feature-icon" src={`images/icons/manual/${icon}.svg`} alt="" aria-hidden="true"/><span>0{index + 1}</span></div><h3>{title}</h3><p>{detail}</p></Reveal>)}</div>
    </section>
    <section className="pulse-specs cap-specifications"><Reveal as="h2">Technical specifications</Reveal><dl>{specifications.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><a className="pulse-contact" href="#/contact">Request a Quote ↗</a></section>
  </div>
}
