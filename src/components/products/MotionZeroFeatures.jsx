const ASSET = 'images/motion-0/bento'
const VIDEO = 'videos/motion-0'

function GlassCard({ className = '', children }) {
  return <article className={`m0-bento-card ${className}`}>{children}</article>
}

export default function MotionZeroFeatures() {
  return (
    <section id="m0-features" className="m0-features m0-bento-section font-sans" aria-label="Motion-0 product features">
      <div className="m0-bento">
        <div className="m0-mobile-page m0-mobile-page-one">
          <GlassCard className="m0-bento-brand">
            <div className="m0-bento-copy">
              <h2 className="m0-gradient-text m0-brand-name">Motion-0</h2>
              <span className="m0-brand-rule" aria-hidden="true" />
              <h3>Wear to capture</h3>
            </div>
            <div className="m0-wear-frame">
              <video
                className="m0-wear-set"
                src={`${VIDEO}/wear-to-capture.mp4`}
                poster={`${VIDEO}/wear-to-capture-poster.jpg`}
                aria-label="Motion-0 wear-to-capture demonstration"
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
            <img
              className="m0-battery-cells"
              src={`${ASSET}/battery-cells.png`}
              alt="Motion-0 battery modules"
            />
            <div className="m0-battery-visual" aria-hidden="true">
              <img src={`${ASSET}/battery-beige-hd.png`} alt="" />
              <img src={`${ASSET}/battery-blue-hd.png`} alt="" />
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
              <img className="m0-sensor-outfit" src={`${ASSET}/sensor-outfit.png`} alt="Motion-0 jacket and trousers" />
            </div>
          </GlassCard>
        </div>

        <div className="m0-mobile-page m0-mobile-page-two">
          <article className="m0-bento-photo">
            <img src={`${ASSET}/kitchen-figma.png`} alt="Motion-0 capture in a kitchen" />
          </article>

          <GlassCard className="m0-bento-accuracy">
            <div className="m0-bento-copy">
              <p className="m0-gradient-text m0-metric">&lt;1CM</p>
              <h3>Tracking Accuracy</h3>
              <p className="m0-description">Full-body tracking<br />For teleoperation</p>
            </div>
            <div className="m0-accuracy-pics">
              <span className="m0-accuracy-note">采数据照片+smpl图</span>
              <img src={`${ASSET}/tracking-person.jpg`} alt="Human motion capture" />
              <img src={`${ASSET}/tracking-robot.jpg`} alt="Robot reproducing the captured motion" />
            </div>
          </GlassCard>

          <GlassCard className="m0-bento-wash">
            <div className="m0-bento-copy">
              <p className="m0-gradient-text m0-wash-title">Waterproof</p>
              <h3>Washable</h3>
              <p className="m0-description">Easy to wear<br />Easy to maintain</p>
            </div>
            <div className="m0-fabric-pics">
              <img src={`${ASSET}/fabric-beige.jpg`} alt="Beige washable fabric" />
              <img src={`${ASSET}/fabric-blue.jpg`} alt="Blue washable fabric" />
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
