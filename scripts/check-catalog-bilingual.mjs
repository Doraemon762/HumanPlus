import fs from 'node:fs'
import assert from 'node:assert/strict'
const manifest=JSON.parse(fs.readFileSync('public/media/catalog/manifest.json','utf8'))
assert.deepEqual(Object.keys(manifest.languages).sort(),['en','zh'])
for(const [lang,edition] of Object.entries(manifest.languages)){
 assert.equal(edition.pages.length,9)
 assert.equal(edition.edition,'V6')
 assert.equal(edition.pages[5].title,'PULSE Pro')
 assert.ok(edition.pages[7].links.length>=3,`${lang}: preserve dataset hyperlinks`)
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
console.log('Verified both 9-page V6 editions, 36 versioned images, Pro page order, and the stable default manifest.')
