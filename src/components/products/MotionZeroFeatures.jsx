import DeferredVideo from '../ui/DeferredVideo'
import OptimizedImage from '../ui/OptimizedImage'
const ASSET = 'images/motion-0/bento'
const VIDEO = 'videos/motion-0'

function GlassCard({ className = '', children }) {
  return <article className={`m0-bento-card ${className}`}>{children}</article>
}

export default function MotionZeroFeatures() {
  return (
    <section id="m0-features" className="m0-features m0-bento-section font-sans" aria-label="Weave product features">
      <div className="m0-bento">
        <div className="m0-mobile-page m0-mobile-page-one">
          <GlassCard className="m0-bento-brand">
            <div className="m0-bento-copy">
              <h2 className="m0-gradient-text m0-brand-name">Weave</h2>
              <span className="m0-brand-rule" aria-hidden="true" />
              <h3>Wear to capture</h3>
            </div>
            <div className="m0-wear-frame">
              <DeferredVideo
                className="m0-wear-set"
                src={`${VIDEO}/wear-to-capture.mp4`}
                poster={`${VIDEO}/wear-to-capture-poster.jpg`}
                aria-label="Weave wear-to-capture demonstration"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                disablePictureInPicture
              />
            </div>
          </GlassCard>

          <GlassCard className="m0-bento-battery">
            <div className="m0-bento-copy">
              <p className="m0-gradient-text m0-metric">10 H+</p>
              <h3>Battery life</h3>
              <p className="m0-description">Pocket battery<br />Stable long-term capture</p>
            </div>
            <OptimizedImage
              sizes="(max-width: 767px) 50vw, 20vw"
              className="m0-battery-cells"
              src={`${ASSET}/battery-pack-blue.png`}
              alt="Weave pocket battery pack"
            />
            <div className="m0-battery-visual" aria-hidden="true">
              <OptimizedImage sizes="(max-width: 767px) 25vw, 10vw" src={`${ASSET}/battery-beige-hd.png`} alt="" />
              <OptimizedImage sizes="(max-width: 767px) 25vw, 10vw" src={`${ASSET}/battery-blue-hd.png`} alt="" />
            </div>
          </GlassCard>

          <GlassCard className="m0-bento-sensors">
            <div className="m0-bento-copy">
              <p className="m0-gradient-text m0-metric">11 IMUs</p>
              <h3>
                <span className="m0-sensor-title-desktop">Real-time Motion<br />Streaming</span>
                <span className="m0-sensor-title-mobile">Real-time<br />Motion Streaming</span>
              </h3>
              <p className="m0-description">Live full-body motion<br />for teleoperation</p>
            </div>
            <div className="m0-sensor-visual">
              <OptimizedImage sizes="(max-width: 767px) 50vw, 20vw" className="m0-sensor-outfit" src={`${ASSET}/sensor-outfit.png`} alt="Weave jacket and trousers" />
            </div>
          </GlassCard>
        </div>

        <div className="m0-mobile-page m0-mobile-page-two">
          <article className="m0-bento-photo">
            <OptimizedImage sizes="(max-width: 767px) 100vw, 30vw" src={`${ASSET}/kitchen-figma.png`} alt="Weave capture in a kitchen" />
          </article>

          <GlassCard className="m0-bento-accuracy">
            <div className="m0-bento-copy">
              <p className="m0-gradient-text m0-metric">&lt;1CM</p>
              <h3>Tracking Accuracy</h3>
              <p className="m0-description">Precise full-body tracking<br />Accurate motion reconstruction</p>
            </div>
            <div className="m0-accuracy-pics">
              <OptimizedImage sizes="(max-width: 767px) 40vw, 15vw" src={`${ASSET}/tracking-person.jpg`} alt="Human motion capture" />
              <OptimizedImage sizes="(max-width: 767px) 40vw, 15vw" src={`${ASSET}/tracking-robot.jpg`} alt="Robot reproducing the captured motion" />
            </div>
          </GlassCard>

          <GlassCard className="m0-bento-wash">
            <div className="m0-bento-copy">
              <p className="m0-gradient-text m0-wash-title">Waterproof</p>
              <h3>Washable</h3>
              <p className="m0-description">Easy to wear<br />Easy to maintain</p>
            </div>
            <div className="m0-fabric-pics">
              <OptimizedImage sizes="(max-width: 767px) 40vw, 15vw" src={`${ASSET}/fabric-beige.jpg`} alt="Beige washable fabric" />
              <OptimizedImage sizes="(max-width: 767px) 40vw, 15vw" src={`${ASSET}/fabric-blue.jpg`} alt="Blue washable fabric" />
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
