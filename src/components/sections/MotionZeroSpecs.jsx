import {translate, useSiteLanguage} from '../../i18n'
import OptimizedImage from '../ui/OptimizedImage'
import './MotionZeroSpecs.css'

/* Motion-0 · Device Specifications
   Editorial spec sheet. Six rows, exact copy as supplied — no invented
   parameters. Quiet hover only. Sits below the Performance Test module. */

// Chinese specifications transcribed from 产品手册V4_中文版.pdf, page 3.
const ZH_SPECS = ['11 路 9 轴 IMU', '默认 66.7 Hz，可调', '实时 BVH 流', '2.4 GHz BLE 通信；NTP ≤ 20 ms', '室内 7 m', '≥ 8 小时']
const SPECS = [
  { key: 'Configuration', value: '11-IMU' },
  { key: 'Sampling Rate', value: '30 Hz (Default)' },
  { key: 'Data Output', value: '3-Axis Acceleration, Quaternion' },
  { key: 'Communication & Synchronization', value: '2.4 GHz Wi-Fi / UDP; NTP ≤ 20 ms' },
  { key: 'Effective Range', value: 'Up to 20 m (Indoor)' },
  { key: 'Battery Life', value: 'Up to 8 h' },
]

export default function MotionZeroSpecs() {
  const language = useSiteLanguage()
  return (
    <section id="m0-specs" className="mzs-section" aria-label={translate("Weave specifications")}>
      <div className="mzs-inner">
        <h2 className="mzs-title">{translate("Technical specifications")}</h2>

        <div className="mzs-content">
          <div className="mzs-table">
            <div className="mzs-rowhead">
              <span>{language === 'zh' ? '项目' : 'Item'}</span>
              <span>{language === 'zh' ? '规格' : 'Details'}</span>
            </div>

            {SPECS.map((row, index) => (
              <div className="mzs-row" key={row.key}>
                <span className="mzs-key">{translate(row.key)}</span>
                <span className="mzs-val">{language === 'zh' ? ZH_SPECS[index] : row.key === 'Communication & Synchronization' ? <>2.4 GHz Wi-Fi / UDP;<br />NTP ≤ 20 ms</> : translate(row.value)}</span>
              </div>
            ))}
          </div>

          <figure className="mzs-visual">
            <OptimizedImage
              src="images/motion-0/weave-garment-set.png"
              alt={translate("HumanPlus Weave jacket and trousers")}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
