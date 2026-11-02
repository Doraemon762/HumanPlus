import fs from 'node:fs'
import assert from 'node:assert/strict'
const manifest=JSON.parse(fs.readFileSync('public/media/catalog/manifest.json','utf8'))
assert.deepEqual(Object.keys(manifest.languages).sort(),['en','zh'])
for(const [lang,edition] of Object.entries(manifest.languages)){
 assert.equal(edition.pages.length,10)
 assert.equal(edition.edition,'V8')
 assert.equal(edition.pages[6].title,'PULSE Pro')
 assert.ok(edition.pages[8].links.length>=3,`${lang}: preserve dataset hyperlinks`)
 assert.match(edition.pages[1].title,/HumanPlus/)
 assert.equal(edition.pages.flatMap(p=>p.links).filter(l=>l.url.includes('/manual-videos/')).length,6)
 for(const page of edition.pages)for(const link of page.links){assert(link.w>0&&link.h>0);assert(link.x>=0&&link.y>=0&&link.x+link.w<=100&&link.y+link.h<=100)}
 for(const page of edition.pages)for(const key of ['preview','full']){
  assert(page[key].includes(edition.version))
  assert(fs.statSync('public'+page[key]).size>1000,`${lang}: ${page[key]}`)
 }
 for(const page of edition.pages){
  assert.deepEqual(fs.readFileSync('public'+page.full),fs.readFileSync(`private/catalog/${edition.sourceDir}/${page.file}`),'zoom image stays lossless')
 }
}
assert.notEqual(manifest.languages.zh.version,manifest.languages.en.version)
assert.deepEqual(manifest.pages,manifest.languages.zh.pages)
console.log('Verified both 10-page V8 editions, 40 versioned images, Pro page order, and the stable default manifest.')
