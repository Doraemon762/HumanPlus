import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
const manifest=JSON.parse(fs.readFileSync('src/data/media-manifest.json','utf8'))
test('CAP has small responsive assets and an eager first image',()=>{
 const image=manifest.images['images/products/cap.png']
 assert.ok(image.variants.find(v=>v.width===960).bytes<100000)
 const source=fs.readFileSync('src/pages/CapPage.jsx','utf8')
 assert.match(source,/<OptimizedImage[^>]+fetchPriority="high"/)
 assert.doesNotMatch(source,/<img src="images\/products\/cap.png"/)
})
test('entry does not block rendering on Google Fonts or preload the unrelated home poster',()=>{
 const html=fs.readFileSync('index.html','utf8')
 assert.doesNotMatch(html,/fonts\.googleapis\.com|fonts\.gstatic\.com|hero-laundry-poster/)
 assert.match(fs.readFileSync('src/styles/index.css','utf8'),/inter-latin-variable\.woff2/)
})
test('slow-network hero is fast-start and smaller than the regular version',()=>{
 for(const name of ['videos/home/hero-laundry.mp4','videos/robotics/robotics-laundry.mp4','videos/demo/human-demo-1-1080.mp4']){
  const entry=manifest.videos[name]
  assert.ok(entry.slow.bytes<entry.desktop.bytes)
  const bytes=fs.readFileSync(`public/${entry.slow.src}`)
  assert.equal(bytes.length,entry.slow.bytes)
  assert.ok(bytes.indexOf(Buffer.from('moov'))<bytes.indexOf(Buffer.from('mdat')))
 }
})
