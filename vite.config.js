import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// base: './' keeps the build portable — works both at a domain root and
// under a project sub-path (same rule the HumanPlus-1000 site was built on).

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = path.resolve(__dirname, 'public')

// Files under public/ that must NOT be shipped in the production build.
// - robotics-laundry.mp4.bak : 32MB stale backup, referenced nowhere (safe-delete
//   driver on this machine refuses to delete large files, so we simply stop
//   copying it into dist instead of fighting the OS lock).
// Reserved素材 (public/videos/motion-0/*) are kept in the build for now because
// the MotionZero Story page is written but not yet wired — revisit if you want a
// slimmer prod bundle.
const EXCLUDE = new Set(['videos/robotics/robotics-laundry.mp4.bak'])

function copyPublicExcept(outDir) {
  if (!fs.existsSync(PUBLIC_DIR)) return
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const src = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(src)
        continue
      }
      const rel = path.relative(PUBLIC_DIR, src).split(path.sep).join('/')
      if (EXCLUDE.has(rel)) continue
      const dest = path.join(outDir, rel)
      fs.mkdirSync(path.dirname(dest), { recursive: true })
      fs.copyFileSync(src, dest)
    }
  }
  walk(PUBLIC_DIR)
}

// Mirror public/ into dist/ on build, skipping EXCLUDE entries. Used instead of
// Vite's automatic publicDir copy (which can't exclude individual files) so the
// stale .bak never reaches the production bundle. Dev mode keeps the default
// publicDir so the dev server still serves static assets normally.
let resolvedOutDir = 'dist'

const copyPublicPlugin = {
  name: 'copy-public-except',
  apply: 'build',
  configResolved(cfg) {
    resolvedOutDir = cfg.build.outDir
  },
  closeBundle() {
    copyPublicExcept(resolvedOutDir || 'dist')
  },
}

export default defineConfig(({ command }) => ({
  plugins: [react(), copyPublicPlugin],
  // Serve public/ normally in dev; on build we copy it ourselves (selectively).
  publicDir: command === 'build' ? false : 'public',
  base: './',
  server: {
    port: 5174,
    host: true,
  },
}))
