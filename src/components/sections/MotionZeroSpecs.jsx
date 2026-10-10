import OptimizedImage from '../ui/OptimizedImage'
import './MotionZeroSpecs.css'

/* Motion-0 · Device Specifications
   Editorial spec sheet. Six rows, exact copy as supplied — no invented
   parameters. Quiet hover only. Sits below the Performance Test module. */

const SPECS = [
  { key: 'Configuration', value: '11-IMU' },
  { key: 'Sampling Rate', value: '30 Hz (Default)' },
  { key: 'Data Output', value: '3-Axis Acceleration, Quaternion' },
  { key: 'Communication & Synchronization', value: '2.4 GHz Wi-Fi / UDP; NTP ≤ 20 ms' },
  { key: 'Effective Range', value: 'Up to 20 m (Indoor)' },
  { key: 'Battery Life', value: 'Up to 10 h' },
]

export default function MotionZeroSpecs() {
  return (
    <section id="m0-specs" className="mzs-section" aria-label="Weave specifications">
      <div className="mzs-inner">
        <h2 className="mzs-title">Specification</h2>

        <div className="mzs-content">
          <div className="mzs-table">
            <div className="mzs-rowhead">
              <span>Specification</span>
              <span>Details</span>
            </div>

            {SPECS.map((row) => (
              <div className="mzs-row" key={row.key}>
                <span className="mzs-key">{row.key}</span>
                <span className="mzs-val">{row.value}</span>
              </div>
            ))}
          </div>

          <figure className="mzs-visual">
            <OptimizedImage
              src="images/motion-0/weave-garment-set.png"
              alt="HumanPlus Weave jacket and trousers"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
