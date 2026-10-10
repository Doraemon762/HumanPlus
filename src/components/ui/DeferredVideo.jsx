import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import manifest from '../../data/media-manifest.json'
import { imageSource, mediaKey } from './OptimizedImage'

const DeferredVideo = forwardRef(function DeferredVideo({ src, poster, priority = false, enabled = true, autoPlay = false, preload: _preload, muted = false, ...props }, forwardedRef) {
  const videoRef = useRef(null)
  const [seen, setSeen] = useState(priority)
  useImperativeHandle(forwardedRef, () => videoRef.current)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = muted
  }, [muted])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !enabled) {
      video?.pause()
      return
    }
    let visible = priority
    let resume = autoPlay
    let loaded = false
    const media = manifest.videos[mediaKey(src)]
    const selected = media?.[window.matchMedia('(max-width: 767px)').matches ? 'mobile' : 'desktop']?.src || src
    const play = () => {
      if (visible && !document.hidden && autoPlay && resume) video.play()?.catch(() => {})
    }
    const load = () => {
      if (loaded) return
      loaded = true
      setSeen(true)
      // Withhold src entirely: autoplay can override preload="none".
      if (video.getAttribute('src') !== selected) {
        video.src = selected
        video.load()
      }
    }
    const pause = () => {
      if (video.readyState >= 2) resume = !video.paused
      video.pause()
    }
    const onVisibility = () => {
      if (document.hidden) pause()
      else play()
    }
    const onError = () => {
      if (selected !== src && video.getAttribute('src') !== src) {
        video.src = src
        video.load()
        play()
      }
    }
    video.addEventListener('loadeddata', play)
    video.addEventListener('error', onError)
    document.addEventListener('visibilitychange', onVisibility)
    if (priority) { load(); play() }
    const observer = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio > 0
      if (visible) { load(); play() }
      else pause()
    }, { threshold: [0, 0.05] }) : null
    if (observer) observer.observe(video)
    else { visible = true; load(); play() }
    return () => {
      observer?.disconnect()
      video.removeEventListener('loadeddata', play)
      video.removeEventListener('error', onError)
      document.removeEventListener('visibilitychange', onVisibility)
      video.pause()
    }
  }, [src, priority, enabled, autoPlay])

  const resolvedPoster = poster ? imageSource(poster) : manifest.videos[mediaKey(src)]?.poster
  return <video {...props} ref={videoRef} poster={seen ? resolvedPoster : undefined} muted={muted} playsInline preload="none" />
})

export default DeferredVideo
