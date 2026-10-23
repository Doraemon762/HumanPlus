import { createRequire } from 'node:module'
const require = createRequire('C:/Users/15575/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json')
const sharp = require('sharp')
import { stat } from 'node:fs/promises'

const images = [
  'public/media/research-20261013/wiring-left-2023.png',
  'public/media/research-20261013/wiring-right-2023.png',
  'public/media/research-20261013/smart-clothing-left.png',
  'public/images/research/clothing-20261012/loose-poser.png',
]
for (const input of images) {
  const output = input.replace(/\.png$/, '.webp')
  await sharp(input).rotate().resize({ width: 1920, height: 2200, fit: 'inside', withoutEnlargement: true }).webp({ quality: 88, alphaQuality: 100, effort: 6 }).toFile(output)
  console.log(JSON.stringify({ input, before: (await stat(input)).size, after: (await stat(output)).size }))
}
