import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import './MvvSection.css'

const Prism = lazy(() => import('../ui/Prism'))
const SideRays = lazy(() => import('../ui/SideRays'))

const ITEMS = [
  {
    id: 'mission',
    letter: 'M',
    name: 'Mission',
    statement: 'Making Everyday Human Behavior the Foundation of Embodied Intelligence.',
  },
  {
    id: 'vision',
    letter: 'V',
    name: 'Vision',
    statement: 'Robots That Learn from Human Experience, Understand the World, and Act Autonomously.',
  },
  {
    id: 'values',
    letter: 'V',
    name: 'Values',
    statement: 'Exploration · Innovation · Openness · Pragmatism',
  },
]

export default function MvvSection() {
  const [activeId, setActiveId] = useState('mission')
  const [prismReady, setPrismReady] = useState(false)
  const sectionRef = useRef(null)
  const active = ITEMS.find((item) => item.id === activeId) ?? ITEMS[0]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPrismReady(true)
        observer.disconnect()
      }
    }, { rootMargin: '520px 0px' })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="mvv-section" aria-labelledby="mvv-title">
      {prismReady && (
        <Suspense fallback={null}>
          <SideRays
            className="mvv-side-rays"
            speed={1.15}
            intensity={1.9}
            spread={2.05}
            opacity={0.82}
            blend={0.62}
            falloff={1.18}
          />
        </Suspense>
      )}
      <div className="mvv-shell">
        <div className="mvv-copy" aria-live="polite">
          <div key={active.id} className="mvv-copy-inner">
            <h2 id="mvv-title">
              <span>OUR</span>
              <strong>{active.name}</strong>
            </h2>
            <p>{active.statement}</p>
          </div>
        </div>

        <div className="mvv-visual">
          <div className="mvv-prism-stage">
            <div className="mvv-prism-glow" aria-hidden="true" />
            <div className="mvv-prism-canvas">
              {prismReady && (
                <Suspense fallback={null}>
                  <Prism height={2.3} baseWidth={3.45} scale={1.92} glow={0.92} noise={0} timeScale={0.38} />
                </Suspense>
              )}
            </div>
            {ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`mvv-label mvv-label--${item.id}${activeId === item.id ? ' is-active' : ''}`}
                aria-pressed={activeId === item.id}
                onClick={() => setActiveId(item.id)}
              >
                <span className="mvv-label-letter">{item.letter}</span>
                <span className="mvv-label-name">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
