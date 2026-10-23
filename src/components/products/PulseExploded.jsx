import { useEffect, useRef } from 'react'

export default function PulseExploded() {
  const track = useRef(null)
  const video = useRef(null)
  useEffect(() => {
    const media = video.current
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let target = 0
    let near = false
    const seek = () => {
      frame = 0
      if (media.readyState < 2 || media.seeking || !Number.isFinite(media.duration)) return
      const time = target * Math.max(0, media.duration - 1 / 24)
      if (Math.abs(media.currentTime - time) > 1 / 48) media.currentTime = time
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(seek) }
    const update = () => {
      const box = track.current.getBoundingClientRect()
      const stage = track.current.querySelector('.pulse-exploded-stage')
      target = reduced.matches ? .5 : Math.max(0, Math.min(1, (72 - box.top) / Math.max(1, box.height - stage.offsetHeight)))
      if (near) schedule()
    }
    const observer = new IntersectionObserver(([entry]) => {
      near = entry.isIntersecting
      if (near && !media.getAttribute('src')) { media.src = 'media/pulse-exploded/imu-exploded.mp4'; media.load() }
      update()
    }, { rootMargin: '500px' })
    observer.observe(track.current)
    media.addEventListener('loadeddata', schedule)
    media.addEventListener('seeked', schedule)
    addEventListener('scroll', update, { passive: true })
    addEventListener('resize', update)
    reduced.addEventListener('change', update)
    update()
    return () => { observer.disconnect(); cancelAnimationFrame(frame); media.removeEventListener('loadeddata', schedule); media.removeEventListener('seeked', schedule); removeEventListener('scroll', update); removeEventListener('resize', update); reduced.removeEventListener('change', update) }
  }, [])
  return <section ref={track} className="pulse-exploded-scroll" aria-label="Inside Pulse: scroll to explore the sensor assembly">
    <div className="pulse-exploded-stage">
      <div className="pulse-exploded-media"><video ref={video} poster="media/pulse-exploded/poster.jpg" muted playsInline preload="auto" controls={false} controlsList="nodownload noremoteplayback" disablePictureInPicture disableRemotePlayback onContextMenu={event => event.preventDefault()} aria-label="Exploded view of the Pulse IMU sensor, controlled by scrolling" /></div>
    </div>
  </section>
}
