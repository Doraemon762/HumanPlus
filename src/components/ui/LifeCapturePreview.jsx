import {translate, useSiteLanguage} from '../../i18n'
import { useEffect, useRef, useState } from 'react'
import './LifeCapturePreview.css'
import DeferredVideo from './DeferredVideo'

export default function LifeCapturePreview() {
  useSiteLanguage()
  const [progress, setProgress] = useState(0)
  const track = useRef(null)
  const video = useRef(null)
  useEffect(() => {
    let frame = 0
    let playbackTimer = 0
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const update = () => {
      frame = 0
      const box = track.current.getBoundingClientRect()
      const p = reduced ? 1 : Math.max(0, Math.min(1, (innerHeight - box.top - 100) / (innerHeight * .65)))
      setProgress(p)
      const rawExpansion = reduced ? 0 : Math.max(0, Math.min(1, (72 - box.top) / (innerHeight * .7)))
      const expansion = rawExpansion * rawExpansion * (3 - 2 * rawExpansion)
      const height = innerHeight - 72
      const width = Math.min(1050, innerWidth * .9, Math.max(180, height - 210) * 16 / 9)
      track.current.style.setProperty('--expand', expansion)
      track.current.style.setProperty('--media-width', `${width + (innerWidth - width) * expansion}px`)
      track.current.style.setProperty('--media-height', `${width * 9 / 16 + (height - width * 9 / 16) * expansion}px`)
      track.current.style.setProperty('--media-top', `${(height - width * 9 / 16 + 150) / 2 * (1 - expansion)}px`)
      clearTimeout(playbackTimer)
      if (box.bottom > 72 && box.top < innerHeight && p > .95) playbackTimer = setTimeout(() => {
        if (!video.current) return
        video.current.muted = true
        video.current.play().catch(() => {})
      }, 600)
      else video.current.pause()
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    const timer = setTimeout(update, 80)
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    return () => { clearTimeout(timer); clearTimeout(playbackTimer); removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(frame) }
  }, [])
  const eased = 1 - Math.pow(1 - progress, 3)
  return <section ref={track} className="life-preview life-preview--float" style={{ '--entrance': eased }} aria-label={translate("Life capture")}>
    <div className="life-preview-stage">
      <header className="life-preview-copy"><h2>{translate("Life capture")}</h2><p>{translate("Experience how human motion and real-world interaction data can empower embodied intelligence and robot learning.")}</p></header>
      <div className={`life-preview-media ${progress > .95 ? 'is-entered' : ''}`}>
        <DeferredVideo ref={video} src="media/dataset-showcase/life-capture-compatible.mp4" poster="media/dataset-showcase/life-capture.webp" muted loop playsInline controls={false} controlsList="nodownload noremoteplayback" disablePictureInPicture disableRemotePlayback onContextMenu={(event) => event.preventDefault()} aria-label={translate("Life capture dataset video")} />
      </div>
    </div>
  </section>
}
