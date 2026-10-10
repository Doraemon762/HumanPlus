const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const crypto = require('node:crypto')
const root = path.resolve(__dirname, '..')
const manifest = require('../src/data/media-manifest.json')
const file = source => path.join(root, 'public', source)

for (const [source, image] of Object.entries(manifest.images)) {
  assert.ok(image.width > 0 && image.height > 0, source)
  let previousWidth = 0
  for (const variant of image.variants) {
    assert.ok(variant.width > previousWidth, source)
    assert.equal(fs.statSync(file(variant.src)).size, variant.bytes, variant.src)
    previousWidth = variant.width
  }
}

function mp4Atoms(buffer) {
  const atoms = []
  let position = 0
  while (position + 8 <= buffer.length) {
    let length = buffer.readUInt32BE(position)
    const type = buffer.toString('ascii', position + 4, position + 8)
    if (length === 1) length = Number(buffer.readBigUInt64BE(position + 8))
    if (length === 0) length = buffer.length - position
    assert.ok(length >= 8 && position + length <= buffer.length, `Invalid ${type} atom`)
    atoms.push(type)
    position += length
  }
  assert.equal(position, buffer.length)
  return atoms
}

for (const [source, video] of Object.entries(manifest.videos)) {
  assert.ok(fs.statSync(file(video.poster)).size > 0, video.poster)
  for (const name of ['desktop', 'mobile']) {
    const variant = video[name]
    assert.equal(fs.statSync(file(variant.src)).size, variant.bytes, variant.src)
    const atoms = mp4Atoms(fs.readFileSync(file(variant.src)))
    assert.ok(atoms.indexOf('moov') >= 0 && atoms.indexOf('moov') < atoms.indexOf('mdat'), `Fast-start missing: ${source} ${name}`)
  }
}

const geist = fs.readFileSync(path.join(root, 'src/assets/fonts/geist-variable.woff2'))
assert.equal(crypto.createHash('sha256').update(geist).digest('hex'), 'a369fcf5628ea2aa4e1b9e2ec6a5b3624e365bda588e1f0f2f12b564f728fbb8')
console.log(`Verified ${Object.keys(manifest.images).length} images, ${Object.keys(manifest.videos).length} videos, fast-start MP4s, and unchanged Geist font.`)
