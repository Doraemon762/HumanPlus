import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
test('reader reserves toolbar space and does not reveal controls on every body movement',()=>{
 const css=fs.readFileSync('src/catalog/catalog.css','utf8')
 const reader=fs.readFileSync('src/catalog/CatalogReader.jsx','utf8')
 assert.match(css,/inset:var\(--catalog-top\) 0 var\(--catalog-bottom\)/)
 assert.match(css,/--catalog-top:56px;--catalog-bottom:58px/)
 assert.match(reader,/el.addEventListener\('pointerleave',leave\)/)
 assert.doesNotMatch(reader,/el.addEventListener\('pointermove',reveal\)/)
})
test('catalogue uses small static previews and unchanged full-resolution zoom assets',()=>{
 const manifest=JSON.parse(fs.readFileSync('public/media/catalog/manifest.json','utf8'))
 let previews=0,originals=0
 assert.equal(manifest.pages.length,8)
 for(const p of manifest.pages){
  const original=fs.readFileSync(`private/catalog/${p.file}`)
  const full=fs.readFileSync(`public${p.full}`)
  assert.deepEqual(full,original)
  originals+=original.length;previews+=fs.statSync(`public${p.preview}`).size
 }
 assert.ok(previews<originals*.2)
 const reader=fs.readFileSync('src/catalog/CatalogReader.jsx','utf8')
 assert.doesNotMatch(reader,/fetch\('\/api\/catalog/)
 assert.match(reader,/Math.abs\(i-page\)<=3/)
 assert.match(reader,/manifest.pages\[page\].full/)
})
