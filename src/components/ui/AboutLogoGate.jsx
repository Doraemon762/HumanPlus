import { useEffect, useRef } from 'react'
import './AboutLogoGate.css'

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
          cell.next = time + 2200 + hash(cell.id * 31 + time) * 4000
        }
        const progress = reduced.matches ? 1 : Math.min(1, Math.max(0, (time-cell.start)/650))
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
    const images = ['mark', 'wordmark'].map(name => new Promise(resolve => {
      const image = new Image(); image.onload = () => resolve(image)
      image.src = `${import.meta.env.BASE_URL}images/about-binary/${name}.png`
    }))
    let observer
    Promise.all(images).then(masks => {
      if (disposed) return
      const rebuild = () => {
        width = canvas.getBoundingClientRect().width
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
        regions.forEach(region => {
          const sample = document.createElement('canvas'), sc = sample.getContext('2d', { willReadFrequently: true })
          sample.width = Math.ceil(region.w * 2); sample.height = Math.ceil(region.h * 2)
          sc.drawImage(region.image, 0, 0, sample.width, sample.height)
          const pixels = sc.getImageData(0, 0, sample.width, sample.height).data
          const cols = Math.floor(region.w / region.step), rows = Math.floor(region.h / region.step)
          for (let y=0; y<rows; y++) for (let x=0; x<cols; x++) {
            const px = (x+.5)*region.w/cols, py = (y+.5)*region.h/rows
            // Measure the whole cell, rather than testing one centre pixel.
            // Boundary glyphs follow the mask's curved contour and fade smoothly.
            let mass = 0, centreX = 0, centreY = 0
            for (let sy=0; sy<5; sy++) for (let sx=0; sx<5; sx++) {
              const ax = (x+(sx+.5)/5)*region.w/cols
              const ay = (y+(sy+.5)/5)*region.h/rows
              const alpha = pixels[(Math.min(sample.height-1,Math.floor(ay*2))*sample.width+Math.min(sample.width-1,Math.floor(ax*2)))*4+3]/255
              mass += alpha; centreX += ax*alpha; centreY += ay*alpha
            }
            const coverage = mass/25
            if (coverage > .28) cells.push({
              x:region.x+px+(centreX/mass-px)*.65,
              y:region.y+py+(centreY/mass-py)*.65,
              size:region.step*.98*(coverage < .75 ? .86 : 1),
              coverage:Math.min(1,coverage*1.5),id:cells.length,
              pitchX:region.w/cols,pitchY:region.h/rows,
              digit:hash(cells.length*19)>.5?1:0,previous:0,
              start:-1000,next:performance.now()+hash(cells.length*7)*5000,
              direction:1
            })
          }
        })
        // Keep the sampled logo and wordmark intact. Add a separate quiet field
        // only in the empty space, as in Contact, with a soft fade at its edges.
        const foreground = [...cells], pitch = width/52
        for (let y=pitch/2; y<height; y+=pitch) for (let x=pitch/2; x<width; x+=pitch) {
          if (foreground.some(cell => Math.abs(cell.x-x)<pitch*.75 && Math.abs(cell.y-y)<pitch*.75)) continue
          const edge = Math.max(0,Math.min(1,x/(width*.12),(width-x)/(width*.12),y/(height*.1),(height-y)/(height*.1)))
          const id = cells.length
          cells.push({x,y,size:pitch*.98,pitchX:pitch,pitchY:pitch,
            coverage:edge,background:true,id,digit:hash(id*19)>.5?1:0,previous:0,
            start:-1000,next:performance.now()+hash(id*7)*5000,direction:1})
        }
        draw()
      }
      observer = new ResizeObserver(rebuild); observer.observe(canvas); rebuild()
      const tick = time => {
        if (visible && !document.hidden && time-last > 33) { draw(time); last=time }
        timer=requestAnimationFrame(tick)
      }
      timer=requestAnimationFrame(tick)
    })
    const intersection = new IntersectionObserver(entries => { visible = entries[0].isIntersecting })
    intersection.observe(canvas)
    return () => { disposed = true; cancelAnimationFrame(timer); observer?.disconnect(); intersection.disconnect() }
  }, [])
  return <canvas ref={ref} className="about-binary-brand" role="img" aria-label="HumanPlus logo and wordmark formed from animated binary digits" />
}

export default function AboutLogoGate({ children }) {
  return <section className="about-gate">
    <div className="company-about-panel about-gate__stage">
      <div className="about-gate__content">{children}</div>
      <div className="about-gate__mark"><BinaryBrand /></div>
    </div>
  </section>
}

