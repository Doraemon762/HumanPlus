import { useEffect, useRef } from 'react'
import './AboutLogoGate.css'
import { markMask, wordMask } from './aboutBinaryMasks'

function BinaryBrand() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let disposed = false, visible = true, timer, cells = [], width = 0, height = 0, last = 0
    const hash = n => { const v = Math.sin(n * 12.9898 + 78.233) * 43758.5453; return v - Math.floor(v) }
    const draw = (time = performance.now()) => {
      ctx.clearRect(0, 0, width, height)
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#535b65'
      cells.forEach(cell => {
        if (!reduced.matches && time > cell.next) {
          cell.previous = cell.digit
          cell.digit = 1 - cell.digit
          cell.start = time
          cell.next = time + 6500 + hash(cell.id * 31 + time) * 9500
        }
        const progress = reduced.matches ? 1 : Math.min(1, Math.max(0, (time-cell.start)/450))
        ctx.save()
        ctx.beginPath()
        ctx.rect(cell.x-cell.pitchX/2, cell.y-cell.pitchY/2, cell.pitchX, cell.pitchY)
        ctx.clip()
        ctx.globalAlpha = cell.background ? cell.coverage * .042 : cell.coverage * .56
        ctx.font = `400 ${cell.size}px Consolas, ui-monospace, monospace`
        if (progress < 1) ctx.fillText(String(cell.previous), cell.x, cell.y-cell.direction*progress*cell.pitchY)
        ctx.fillText(String(cell.digit), cell.x, cell.y+cell.direction*(1-progress)*cell.pitchY)
        ctx.restore()
      })
      ctx.globalAlpha = 1
    }
    const images = [markMask, wordMask].map(src => new Promise((resolve, reject) => {
      const image = new Image(); image.onload = () => resolve(image)
      image.onerror = reject
      image.src = src
    }))
    let observer
    Promise.all(images).then(masks => {
      if (disposed) return
      const rebuild = () => {
        width = canvas.getBoundingClientRect().width
        if (width < 1) return
        height = width * 1.08
        const dpr = Math.min(2, window.devicePixelRatio || 1)
        canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr)
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); cells = []
        const markW = width * .73, markH = markW * masks[0].height / masks[0].width
        const wordW = width * .97, wordH = wordW * masks[1].height / masks[1].width
        const top = (height - markH - wordH - width * .075) / 2
        const regions = [
          { image: masks[0], x: (width-markW)/2, y: top, w: markW, h: markH, step: width/52 },
          { image: masks[1], x: (width-wordW)/2, y: top+markH+width*.075, w: wordW, h: wordH, step: width/52 }
        ]
        regions.forEach((region, regionIndex) => {
          const sample = document.createElement('canvas'), sc = sample.getContext('2d', { willReadFrequently: true })
          sample.width = Math.ceil(region.w * 2); sample.height = Math.ceil(region.h * 2)
          sc.drawImage(region.image, 0, 0, sample.width, sample.height)
          const pixels = sc.getImageData(0, 0, sample.width, sample.height).data
          const cols = Math.floor(region.w / region.step), rows = Math.floor(region.h / region.step)
          if (regionIndex === 1) {
            // Follow each original italic stroke, with at least two digit columns.
            // No mask dilation or overlapping redraws: the glyphs stay crisp.
            const pitchX = region.step * .68, pitchY = region.h/rows
            for (let row=0; row<rows; row++) {
              const py=(row+.5)*pitchY, scanY=Math.min(sample.height-1,Math.floor(py*2))
              let start=-1
              for (let column=0; column<=sample.width; column++) {
                const filled=column<sample.width && pixels[(scanY*sample.width+column)*4+3]>128
                if (filled && start<0) start=column
                if (!filled && start>=0) {
                  const left=start/2, right=column/2, span=right-left
                  const count=Math.max(2,Math.round(span/pitchX))
                  const centre=(left+right)/2
                  for (let n=0; n<count; n++) {
                    const id=cells.length
                    cells.push({x:region.x+centre+(n-(count-1)/2)*pitchX,y:region.y+py,
                      size:region.step*.90,coverage:1,id,pitchX,pitchY,
                      digit:hash(id*19)>.5?1:0,previous:0,start:-1000,
                      next:performance.now()+1800+hash(id*7)*14000,direction:1})
                  }
                  start=-1
                }
              }
            }
            return
          }
          // Place each run along the original sloping stroke instead of
          // rounding it to a fixed rectangular column grid.
          const pitchX = region.w/cols, pitchY = region.h/rows
          for (let row=0; row<rows; row++) {
            const py=(row+.5)*pitchY
            const scanY=Math.min(sample.height-1,Math.floor(py*2))
            let start=-1
            for (let column=0; column<=sample.width; column++) {
              const filled=column<sample.width && pixels[(scanY*sample.width+column)*4+3]>128
              if (filled && start<0) start=column
              if (!filled && start>=0) {
                const left=start/2, right=column/2, span=right-left
                const count=Math.max(1,Math.round(span/pitchX))
                // Distribute centres within each scanline: their diagonal shift
                // follows the mask, including the rounded shoulders.
                const spacing=Math.min(pitchX,span/count)
                const centre=(left+right)/2
                for (let n=0; n<count; n++) {
                  const id=cells.length
                  const px=centre+(n-(count-1)/2)*spacing
                  // Feather only silhouette boundary cells using the source mask.
                  // This preserves the original bar while softening its sampled corners.
                  let inside=0
                  for (const dy of [-.38,0,.38]) for (const dx of [-.38,0,.38]) {
                    const sx=Math.floor((px+dx*pitchX)*2),sy=Math.floor((py+dy*pitchY)*2)
                    if (sx>=0&&sx<sample.width&&sy>=0&&sy<sample.height&&pixels[(sy*sample.width+sx)*4+3]>128) inside++
                  }
                  const edgeCoverage=Math.min(1,inside/7)
                  cells.push({x:region.x+px,y:region.y+py,
                    size:region.step*.90*Math.min(1,span/pitchX),
                    coverage:Math.min(1,span/pitchX)*edgeCoverage,id,pitchX,pitchY,
                    digit:hash(id*19)>.5?1:0,previous:0,start:-1000,
                    next:performance.now()+1800+hash(id*7)*14000,direction:1})
                }
                start=-1
              }
            }
          }
        })
        // Keep the sampled logo and wordmark intact. Add a separate quiet field
        // only in the empty space, as in Contact, with a soft fade at its edges.
        const foreground = [...cells], pitch = width/52
        for (let y=pitch/2; y<height; y+=pitch) for (let x=pitch/2; x<width; x+=pitch) {
          if (foreground.some(cell => Math.abs(cell.x-x)<pitch*.75 && Math.abs(cell.y-y)<pitch*.75)) continue
          const edge = Math.max(0,Math.min(1,x/(width*.12),(width-x)/(width*.12),y/(height*.1),(height-y)/(height*.1)))
          const id = cells.length
          cells.push({x,y,size:pitch*.90,pitchX:pitch,pitchY:pitch,
            coverage:edge,background:true,id,digit:hash(id*19)>.5?1:0,previous:0,
            start:-1000,next:performance.now()+1800+hash(id*7)*14000,direction:1})
        }
        draw()
        canvas.style.opacity = '1'
        canvas.previousElementSibling.style.visibility = 'hidden'
      }
      observer = new ResizeObserver(rebuild); observer.observe(canvas); rebuild()
      const tick = time => {
        if (visible && !document.hidden && time-last > 33) { draw(time); last=time }
        timer=requestAnimationFrame(tick)
      }
      timer=requestAnimationFrame(tick)
    }).catch(() => { /* The embedded static lockup remains visible if canvas fails. */ })
    const intersection = new IntersectionObserver(entries => { visible = entries[0].isIntersecting })
    intersection.observe(canvas)
    return () => { disposed = true; cancelAnimationFrame(timer); observer?.disconnect(); intersection.disconnect() }
  }, [])
  return <div className="about-binary-lockup">
    <div className="about-binary-fallback" aria-hidden="true"><img src={markMask} alt="" /><img src={wordMask} alt="" /></div>
    <canvas ref={ref} className="about-binary-brand" role="img" aria-label="HumanPlus logo and wordmark formed from animated binary digits" />
  </div>
}

export default function AboutLogoGate({ children }) {
  return <section className="about-gate">
    <div className="company-about-panel about-gate__stage">
      <div className="about-gate__content">{children}</div>
      <div className="about-gate__mark"><BinaryBrand /></div>
    </div>
  </section>
}

