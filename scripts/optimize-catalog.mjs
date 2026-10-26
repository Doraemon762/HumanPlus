import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'
const require=createRequire(process.env.MEDIA_TOOLS_DIR ? path.join(process.env.MEDIA_TOOLS_DIR,'package.json') : import.meta.url)
const sharp=require('sharp')
const manifest=JSON.parse(await fs.readFile('private/catalog/manifest.json','utf8'))
let original=0,preview=0
for(const edition of Object.values(manifest.languages || {zh:manifest})){
const dir=`media/catalog/${edition.version}-read-v1`
await fs.mkdir(`public/${dir}`,{recursive:true})
for(const page of edition.pages){
 const input=path.join('private/catalog',edition.sourceDir||'',page.file)
 const output=`${dir}/${page.file}`
 await sharp(input).resize({width:1440,withoutEnlargement:true}).webp({quality:88,effort:6,smartSubsample:true}).toFile(`public/${output}`)
 const full=`${dir}/full-${page.file}`
 await fs.copyFile(input,`public/${full}`)
 page.preview=`/${output}`;page.full=`/${full}`
 original+=(await fs.stat(input)).size;preview+=(await fs.stat(`public/${output}`)).size
}
}
if(manifest.languages)manifest.pages=manifest.languages.zh.pages
await fs.writeFile('public/media/catalog/manifest.json',JSON.stringify(manifest,null,2)+'\n')
console.log(JSON.stringify({originalBytes:original,readingBytes:preview,pages:manifest.pages.length}))
