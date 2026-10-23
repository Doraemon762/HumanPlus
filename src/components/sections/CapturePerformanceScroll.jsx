import { useEffect, useRef, useState } from 'react'
import DeferredVideo from '../ui/DeferredVideo'
import './CapturePerformanceScroll.css'

const ease = (a, b, value) => { const p = Math.max(0, Math.min(1, (value - a) / (b - a))); return p * p * (3 - 2 * p) }

export default function CapturePerformanceScroll() {
  const root = useRef(null)
  const video = useRef(null)
  const [playback,setPlayback]=useState({time:0,duration:0,paused:false})
  useEffect(()=>{
    const v=video.current
    const update=()=>setPlayback({time:v.currentTime,duration:v.duration||0,paused:v.paused})
    for(const event of ['timeupdate','loadedmetadata','play','pause'])v.addEventListener(event,update)
    return()=>{for(const event of ['timeupdate','loadedmetadata','play','pause'])v.removeEventListener(event,update)}
  },[])
  useEffect(() => {
    const section = root.current
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const draw = () => {
      frame = 0
      const h = innerHeight - 72
      const progress = reduced.matches ? 1 : Math.max(0, Math.min(1, (72 - section.getBoundingClientRect().top) / (innerHeight * 1.55)))
      const expansion = ease(.22, .85, progress)
      const ratio = video.current?.videoWidth && video.current?.videoHeight ? video.current.videoWidth / video.current.videoHeight : 16 / 9
      const smallWidth = Math.min(innerWidth * .48, h * .45 * ratio)
      // Fit the complete source frame; reserve room for the seek controls.
      const fullWidth = Math.min(innerWidth * .92, (h - 100) * ratio)
      const width = smallWidth + (fullWidth - smallWidth) * expansion
      section.style.setProperty('--capture-width', `${width}px`)
      section.style.setProperty('--capture-height', `${width / ratio}px`)
      section.style.setProperty('--capture-radius', `${28 - 10 * expansion}px`)
      section.style.setProperty('--capture-film-opacity', ease(.13, .3, progress))
      section.style.setProperty('--capture-words-opacity', 1 - ease(.08, .28, progress))
      section.style.setProperty('--capture-copy-opacity', ease(.87, 1, progress))
    }
    const update = () => { if (!frame) frame = requestAnimationFrame(draw) }
    draw()
    addEventListener('scroll', update, { passive: true })
    addEventListener('resize', update)
    video.current?.addEventListener('loadedmetadata', update)
    const media = video.current
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', update); removeEventListener('resize', update); media?.removeEventListener('loadedmetadata', update) }
  }, [])
  return <section ref={root} className="capture-performance-scroll" aria-label="Capture performance">
    <div className="capture-performance-stage">
      <h2 className="capture-performance-words"><span>Fast.</span><span>Stable.</span><span>Comfortable.</span></h2>
      <div className="capture-performance-film"><DeferredVideo ref={video} src="videos/motion-0/stability-test-20261022.mp4" autoPlay muted loop playsInline aria-label="Extended stable motion capture demonstration" /></div>
      <div className="capture-performance-shade" />
      <div className="capture-performance-copy"><h2>8 hours of<br />stable capture</h2><p>Consistent motion tracking throughout extended recording sessions.</p></div>
      <div className="capture-performance-controls"><button aria-label={playback.paused?'Play video':'Pause video'} onClick={()=>{const v=video.current;v.paused?v.play():v.pause()}}>{playback.paused?'▶':'Ⅱ'}</button><input type="range" min="0" max={playback.duration||1} step="0.1" value={playback.time} aria-label="Seek video" onChange={e=>{video.current.currentTime=Number(e.target.value)}}/><button aria-label="Toggle video sound" onClick={()=>{video.current.muted=!video.current.muted}}>♪</button></div>
    </div>
  </section>
}
