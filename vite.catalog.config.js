import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
export default defineConfig(({mode})=>{
 const official=mode==='official'
 const output=path.join(root,official?'dist/catalog':'dist_catalog')
 return {
  root: path.join(root, 'catalog-only'),
  publicDir: false,
  base: official?'/catalog/':'/',
  plugins: [react(), {
    name: 'catalog-assets-only',
    closeBundle() {
      if(official)return // The main website build already copies the shared media.
      const out = output
      const manifest = JSON.parse(fs.readFileSync(path.join(root, 'public/media/catalog/manifest.json'), 'utf8'))
      const assets = new Set(['media/catalog/manifest.json', 'images/logo/logo-large.png'])
      for (const edition of Object.values(manifest.languages||{zh:manifest})) for (const page of edition.pages) for (const field of ['preview', 'full']) assets.add(page[field].replace(/^\//, ''))
      for (const asset of assets) {
        const target = path.join(out, asset)
        fs.mkdirSync(path.dirname(target), { recursive: true })
        fs.copyFileSync(path.join(root, 'public', asset), target)
      }
      fs.writeFileSync(path.join(out, 'robots.txt'), 'User-agent: *\nDisallow: /\n')
      fs.copyFileSync(path.join(root, 'catalog-only/vercel.json'), path.join(out, 'vercel.json'))
      // Preserve the intended owner/project across clean builds. These IDs are
      // public project metadata, not authentication credentials.
      fs.mkdirSync(path.join(out, '.vercel'), { recursive: true })
      fs.copyFileSync(path.join(root, 'catalog-only/vercel-project.json'), path.join(out, '.vercel/project.json'))
    },
  }],
  build: { outDir: output, emptyOutDir: true },
 }
})
