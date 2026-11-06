import { useEffect, useRef } from 'react'
import './AboutLogoGate.css'

const clamp = value => Math.max(0, Math.min(1, value))
const smooth = value => { const t = clamp(value); return t * t * (3 - 2 * t) }

export default function AboutLogoGate({ children }) {
  const root = useRef(null)
  useEffect(() => {
    const node = root.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const update = () => {
      frame = 0
      const rect = node.getBoundingClientRect()
      const stage = node.querySelector('.about-gate__stage')
      const distance = Math.max(1, rect.height - stage.offsetHeight)
      const progress = reduced.matches ? 1 : clamp(-rect.top / distance)
      const assembly = smooth((progress - .04) / .66)
      node.style.setProperty('--gate-separation', 1 - assembly)
      node.style.setProperty('--gate-mark-opacity', smooth((progress - .015) / .16))
      node.style.setProperty('--gate-mark-visibility', progress > .015 ? 'visible' : 'hidden')
      node.style.setProperty('--gate-cue-opacity', 1 - smooth(progress / .18))
    }
    const request = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = new ResizeObserver(request)
    observer.observe(node)
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    reduced.addEventListener('change', request)
    update()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      reduced.removeEventListener('change', request)
    }
  }, [])
  return <section className="about-gate" ref={root}>
    <div className="company-about-panel about-gate__stage">
      <div className="about-gate__content">{children}</div>
      <div className="about-gate__mark" aria-hidden="true">
        <svg viewBox="0 0 1281 1109" fill="none">
          <path className="about-gate__piece about-gate__piece--left" d="M640 0 750 190Q772 228 750 267L283 1073Q262 1109 220 1109H0Z" />
          <path className="about-gate__piece about-gate__piece--right" d="M805 284 1119 828H900Q859 828 838 792L696 546Q674 508 696 470Z" />
          <path className="about-gate__piece about-gate__piece--bottom" d="M329 1109 437 922Q460 882 502 882H1100Q1144 882 1166 920L1281 1109Z" />
        </svg>
      </div>
      <div className="about-gate__cue" aria-hidden="true"><span>HumanPlus</span><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 4v16m-6-6 6 6 6-6" stroke="currentColor" strokeWidth="1.3" /></svg></div>
    </div>
  </section>
}
