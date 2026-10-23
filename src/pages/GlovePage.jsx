import Reveal from '../components/ui/Reveal'
import './GlovePage.css'

const versions = [6, 11]
const specifications = [
  ['Sensors', 'cpu', ['6 IMUs', 'Nine-axis inertial sensors'], ['11 IMUs', 'Nine-axis inertial sensors']],
  ['Sampling rate', 'clock', ['45 Hz', 'Default sampling rate, adjustable'], ['30 Hz', 'Default sampling rate, adjustable']],
  ['Data output', 'data', ['Acceleration & quaternion', 'Three-axis acceleration and orientation output'], ['Acceleration & quaternion', 'Three-axis acceleration and orientation output']],
  ['Wireless communication', 'wifi', ['2.4 GHz Wi-Fi', 'Real-time data transmission over UDP'], ['2.4 GHz Wi-Fi', 'Real-time data transmission over UDP']],
  ['Time synchronization', 'sync', ['≤ 20 ms', 'NTP synchronization'], ['≤ 20 ms', 'NTP synchronization']],
  ['Operating range', 'range', ['20 m', 'Indoor operating range'], ['20 m', 'Indoor operating range']],
  ['Power & battery life', 'battery', ['≥ 2.5 hours', 'Battery life at 30 Hz · 3.7 V'], ['≥ 2 hours', 'Battery life at 30 Hz · 3.7 V']],
  ['Module dimensions', 'size', ['33 × 30 mm', 'Back of hand', 'Fingertip: 9 × 12 mm'], ['33 × 30 mm', 'Back of hand', 'Fingertip: 9 × 12 mm', 'Interfinger: 10 × 14 mm']],
]
const capabilities = [
  ['Standardized data output', 'UDP packets include global timestamps, device IDs, sequence numbers and node poses. The protocol is transparent, with a customizable data format.', 'data'],
  ['Rapid deployment & synchronization', 'Connect through a standard Wi-Fi router without a dedicated receiver. Multiple devices share a unified time reference for synchronized capture.', 'sync'],
  ['Bimanual & multi-user capture', 'Capture both hands and multiple users simultaneously on one local network, with straightforward integration into data collection, algorithm training and application systems.', 'users'],
]
function Icon({ type }) {
  const paths = {
    cpu: <><rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></>,
    battery: <><rect x="2" y="6" width="18" height="12" rx="2"/><path d="M22 10v4M6 9v6m4-6v6m4-6v6"/></>,
    wifi: <><path d="M2 8a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0m-11 4a5 5 0 0 1 8 0"/><circle cx="12" cy="20" r="1"/></>,
    sync: <><path d="M20 8a8 8 0 0 0-14-3L3 8m0-5v5h5m-4 8a8 8 0 0 0 14 3l3-3m0 5v-5h-5"/><path d="M12 7v5l3 2"/></>,
    data: <><rect x="3" y="3" width="18" height="18" rx="3"/><path d="m7 9 3 3-3 3m6 0h4M3 7h18"/></>,
    range: <path d="M3 8v8m18-8v8M3 12h18m-4-4 4 4-4 4M7 8l-4 4 4 4"/>,
    size: <><rect x="2" y="7" width="20" height="10" rx="2"/><path d="M6 7v5m4-5v3m4-3v5m4-5v3"/></>,
    users: <><circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3m1-17a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 4v3"/></>,
    rotation: <><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="4" ry="10"/><path d="m18 8 4 4-4 2"/></>,
    vertices: <><path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"/><circle cx="12" cy="12" r="2"/></>,
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>
}
export default function GlovePage() {
  return <div className="glove-page">
    <header className="glove-heading"><Reveal><h1>Glove</h1><h2>Hand motion<br />In every detail</h2><p className="glove-intro">Glove with 6 IMUs and Glove Pro with 11 IMUs. Capture hand movement in real time over Wi-Fi.</p><a className="glove-order" href="#/contact">Request a Quote ↗</a></Reveal><div className="glove-hero-art"><img src="images/products/glove-pro.png" alt="Glove Pro with 11 inertial sensors" fetchPriority="high" /></div></header>
    <section className="glove-accuracy" aria-labelledby="glove-accuracy-title"><h2 id="glove-accuracy-title">6-IMU hand pose reconstruction accuracy</h2><div className="glove-accuracy-grid">{[
      ['4.8°', 'Mean rotation error', 'Mean geodesic SO(3) error across 16 hand joints.', 'rotation'],
      ['3.26 mm', 'MPJPE', '21-joint error computed with MANO forward kinematics after fixing the root.', 'size'],
      ['3.15 mm', 'MPVPE', '778-vertex error computed with MANO forward kinematics after fixing the root.', 'vertices'],
    ].map(([value, label, detail, icon]) => <div key={label}><Icon type={icon}/><strong>{value}</strong><h3>{label}</h3><p>{detail}</p></div>)}</div></section>
    <section id="glove-compare" className="glove-comparison" aria-label="Compare Glove configurations">
      <div className="glove-models">{versions.map(count => <Reveal key={count} className="glove-model">
        <div className="glove-model-image"><img src={count === 11 ? 'images/products/glove-pro.png' : 'images/products/glove-6imu.png'} alt={`${count === 11 ? 'Glove Pro' : 'Glove'} with ${count} inertial sensors`} /></div>
        <h2>{count === 11 ? 'Glove Pro' : 'Glove'}</h2><p className="glove-config-label">{count}-IMU configuration</p><a className="glove-order" href="#/contact">Request a Quote ↗</a>
      </Reveal>)}</div>
      <div className="glove-feature-comparison">{specifications.map(([label, icon, ...values]) => <div className="glove-feature-row" key={label}>{values.map(([value, ...details], index) => <div className="glove-spec-item" key={index} aria-label={`${versions[index]}-IMU ${label}`}><Icon type={icon}/><h3>{value}</h3><p className="glove-spec-detail">{details.join(' · ')}</p></div>)}</div>)}</div>
    </section>
    <section className="glove-capabilities" aria-labelledby="glove-capabilities-title"><h2 id="glove-capabilities-title">Core capabilities</h2><div className="glove-capabilities-grid">{capabilities.map(([title, body, icon], index) => <Reveal key={title}><Icon type={icon}/><span className="glove-capability-number">0{index + 1}</span><h3>{title}</h3><p>{body}</p></Reveal>)}</div></section>
  </div>
}
