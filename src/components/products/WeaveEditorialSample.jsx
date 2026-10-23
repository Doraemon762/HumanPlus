import OptimizedImage from '../ui/OptimizedImage'
import './WeaveEditorialSample.css'

// Append-only design study. Remove this component to remove the entire sample.
export default function WeaveEditorialSample() {
  return <section className="weave-study" id="weave-editorial-sample" aria-labelledby="weave-study-title">
    <div className="weave-study-label"><span>WEAVE / DESIGN STUDY</span><span>01 — EVERYDAY MOVEMENT</span></div>
    <header className="weave-study-heading">
      <h2 id="weave-study-title">Life moves.<br /><span>Wear it naturally.</span></h2>
      <p>Full-body motion capture, in the familiar form of a garment. Made for the movements that make up everyday life.</p>
    </header>
    <div className="weave-study-scenes">
      <figure className="weave-study-life">
        <OptimizedImage src="images/motion-0/garment-worn.jpg" alt="Weave worn during an everyday activity in the kitchen" loading="lazy" />
        <figcaption><span>01 / IN EVERYDAY LIFE</span><strong>Start with the person.<br />Not the equipment.</strong></figcaption>
      </figure>
      <div className="weave-study-details">
        <figure className="weave-study-fabric">
          <OptimizedImage src="images/motion-0/bento/fabric-blue.jpg" alt="Close-up of the blue Weave fabric and its folds" loading="lazy" />
          <figcaption>02 / THE FABRIC, UP CLOSE</figcaption>
        </figure>
        <div className="weave-study-note"><span>DESIGNED TO BE WORN</span><h3>A garment first</h3><p>A loose-fitting jacket and trousers, designed for extended wear.</p></div>
      </div>
    </div>
    <div className="weave-study-end"><span>CAPTURE MOTION. KEEP LIVING.</span><p>Comfortable to wear.<br />Washable for everyday care.</p></div>
  </section>
}
