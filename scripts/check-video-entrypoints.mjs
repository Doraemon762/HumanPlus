import fs from 'node:fs'
import assert from 'node:assert/strict'
const html = fs.readFileSync('public/manual-videos/index.html', 'utf8')
const library = JSON.parse(html.match(/const library=(.*?);\r?\n/)[1])
const manifest = JSON.parse(fs.readFileSync('public/manual-videos/entrypoints.json', 'utf8'))
const keys = ['weave', 'pulse', 'glove', 'cap', 'datasets']
assert.deepEqual(manifest.entries.map(entry => entry.product), keys)
assert.deepEqual(Object.keys(library), keys)
assert.equal(manifest.base_url, 'https://humanplusai.cn/manual-videos/')
for (const {product, url} of manifest.entries) {
  assert.equal(url, `${manifest.base_url}?product=${product}`)
  for (const video of library[product].videos) {
    for (const field of ['src', 'mobile', 'poster']) {
      if (video[field]) assert(fs.existsSync(`public${video[field]}`), video[field])
    }
    assert(video.title && video.en)
    assert(video.width > 0 && video.height > 0)
  }
}
assert(html.includes('<title>HumanPlus产品视频</title>'))
assert(html.includes('noindex'))
assert(fs.readFileSync('public/robots.txt', 'utf8').includes('/manual-videos/'))
console.log('Verified five permanent product entrypoints, bilingual media, dimensions, and hidden-directory metadata.')
