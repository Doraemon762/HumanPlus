import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'
const require = createRequire(process.env.MEDIA_TOOLS_DIR ? path.join(process.env.MEDIA_TOOLS_DIR, 'package.json') : import.meta.url)
const sharp = require('sharp')
const manifest = JSON.parse(await fs.readFile('src/data/media-manifest.json', 'utf8'))
async function walk(dir) {
  for (const item of await fs.readdir(dir, { withFileTypes: true })) {
    const input = path.join(dir, item.name)
    if (item.isDirectory()) { await walk(input); continue }
    if (!/\.(png|jpe?g)$/i.test(input)) continue
    const source = input.replaceAll('\\', '/').replace(/^public\//, '')
    if (manifest.images[source]) continue
    const meta = await sharp(input).metadata()
    const variants = []
    for (const width of [...new Set([480, 960, 1600].map(w => Math.min(w, meta.width)))].sort((a,b) => a-b)) {
      const src = `media/${source}.${width}.webp`
      await fs.mkdir(path.dirname(`public/${src}`), { recursive: true })
      await sharp(input).rotate().resize({width, withoutEnlargement:true}).webp({quality:84, alphaQuality:95, effort:5}).toFile(`public/${src}`)
      variants.push({src, width, bytes:(await fs.stat(`public/${src}`)).size})
    }
    manifest.images[source] = {width:meta.width, height:meta.height, variants}
    console.log(`${source}: ${(await fs.stat(input)).size} -> ${variants.map(v=>v.bytes).join('/')}`)
  }
}
await walk('public/images')
await fs.writeFile('src/data/media-manifest.json', JSON.stringify(manifest,null,2)+'\n')
