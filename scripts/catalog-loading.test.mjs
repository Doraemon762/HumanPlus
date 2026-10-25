import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
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
