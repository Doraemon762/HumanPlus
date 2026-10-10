import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(root, 'public')
const require = createRequire(process.env.MEDIA_TOOLS_DIR ? path.join(process.env.MEDIA_TOOLS_DIR, 'package.json') : import.meta.url)
const sharp = require('sharp')
const ffmpeg = process.env.FFMPEG_BIN || 'ffmpeg'
const manifestPath = path.join(root, 'src/data/media-manifest.json')
let manifest = { images: {}, videos: {} }
try { manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8')) } catch (error) { if (error.code !== 'ENOENT') throw error }

async function files(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const nested = await Promise.all(entries.map(entry => entry.isDirectory() ? files(path.join(dir, entry.name)) : [path.join(dir, entry.name)]))
  return nested.flat().sort()
}

const report = { images: [], videos: [] }
if (!process.argv.includes('--videos-only')) {
  for (const input of await files(path.join(publicDir, 'images'))) {
    if (!/\.(png|jpe?g|webp)$/i.test(input)) continue
    const source = path.relative(publicDir, input).split(path.sep).join('/')
    const meta = await sharp(input).metadata()
    const maxWidth = source.includes('/logo/') ? 480 : 1920
    const widths = [...new Set([480, 960, maxWidth].map(w => Math.min(w, meta.width, maxWidth)))].sort((a, b) => a - b)
    const variants = []
    for (const width of widths) {
      const src = `media/${source}.${width}.webp`
      const output = path.join(publicDir, src)
      await fs.mkdir(path.dirname(output), { recursive: true })
      await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 84, alphaQuality: 95, effort: 5 }).toFile(output)
      variants.push({ src, width, bytes: (await fs.stat(output)).size })
    }
    const originalBytes = (await fs.stat(input)).size
    const largest = variants.at(-1)
    // Keep an already-small original when conversion does not reduce its size.
    if (largest.width === meta.width && largest.bytes >= originalBytes) variants[variants.length - 1] = {src: source, width: meta.width, bytes: originalBytes}
    manifest.images[source] = { width: meta.width, height: meta.height, variants }
    report.images.push({ source, originalBytes, optimizedBytes: variants.at(-1).bytes })
  }
  console.log(`Optimized ${report.images.length} images`)
}

if (process.argv.includes('--videos') || process.argv.includes('--videos-only')) {
  for (const input of await files(path.join(publicDir, 'videos'))) {
    if (!input.endsWith('.mp4')) continue
    const source = path.relative(publicDir, input).split(path.sep).join('/')
    const stem = `media/${source.slice(0, -4)}`
    const poster = `${stem}.poster.webp`
    await fs.mkdir(path.dirname(path.join(publicDir, poster)), { recursive: true })
    const frame = execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-ss', '0.1', '-i', input, '-frames:v', '1', '-vf', 'scale=1280:-2', '-f', 'image2pipe', '-vcodec', 'mjpeg', 'pipe:1'], { maxBuffer: 20 * 1024 * 1024 })
    await sharp(frame).webp({ quality: 84 }).toFile(path.join(publicDir, poster))
    const variants = {}
    for (const [name, width, height, crf, rate] of [['desktop',1920,1080,26,'2200k'], ['mobile',960,540,28,'900k']]) {
      const src = `${stem}.${name}.mp4`
      execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', input,
        '-map', '0:v:0', '-map', '0:a?', '-vf', `scale=w='min(iw,${width})':h='min(ih,${height})':force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2,fps=30`,
        '-c:v', 'libx264', '-preset', 'veryfast', '-crf', String(crf), '-maxrate', rate, '-bufsize', name === 'mobile' ? '1800k' : '4400k',
        '-pix_fmt', 'yuv420p', '-g', '60', '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', path.join(publicDir, src)], {stdio: ['ignore','ignore','inherit']})
      variants[name] = { src, bytes: (await fs.stat(path.join(publicDir, src))).size }
    }
    const originalBytes = (await fs.stat(input)).size
    if (variants.desktop.bytes >= originalBytes) variants.desktop = {src: source, bytes: originalBytes}
    manifest.videos[source] = { ...variants, poster }
    report.videos.push({source, originalBytes, desktopBytes: variants.desktop.bytes, mobileBytes:variants.mobile.bytes})
    console.log(`Optimized ${source}: ${originalBytes} -> ${variants.desktop.bytes} / ${variants.mobile.bytes}`)
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
  }
}
await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
await fs.writeFile(path.join(root, 'docs/media-optimization-sizes.json'), JSON.stringify(report, null, 2) + '\n')
