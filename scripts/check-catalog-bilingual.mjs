import fs from 'node:fs'
import assert from 'node:assert/strict'
const manifest=JSON.parse(fs.readFileSync('public/media/catalog/manifest.json','utf8'))
assert.deepEqual(Object.keys(manifest.languages).sort(),['en','zh'])
for(const [lang,edition] of Object.entries(manifest.languages)){
 assert.equal(edition.pages.length,8)
 for(const page of edition.pages)for(const key of ['preview','full']){
  assert(page[key].includes(edition.version))
  assert(fs.statSync('public'+page[key]).size>1000,`${lang}: ${page[key]}`)
 }
}
assert.notEqual(manifest.languages.zh.version,manifest.languages.en.version)
assert.deepEqual(manifest.pages,manifest.languages.zh.pages)
console.log('Verified both 8-page editions, 32 versioned images, and the stable default manifest.')
