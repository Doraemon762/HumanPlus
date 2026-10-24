import fs from 'node:fs/promises'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
const ffmpeg=process.env.FFMPEG_BIN
if(!ffmpeg)throw Error('Set FFMPEG_BIN')
const root=process.cwd(),publicDir=path.join(root,'public')
const manifest=JSON.parse(await fs.readFile('src/data/media-manifest.json','utf8'))
const sources=['videos/motion-0/stability-test-20261022.mp4','images/products/pulse-demo.mp4',...(await fs.readdir('public/media/dataset-showcase')).filter(n=>n.endsWith('.mp4')).map(n=>'media/dataset-showcase/'+n)]
await fs.mkdir('public/media/optimized-current',{recursive:true})
for(const source of sources){
 const stem=path.basename(source,'.mp4'),entry={}
 for(const [profile,width,crf] of [['desktop',1280,27],['mobile',960,29]]){
  const output=`media/optimized-current/${stem}.${profile}.mp4`
  execFileSync(ffmpeg,['-hide_banner','-loglevel','error','-y','-i',path.join(publicDir,source),'-map','0:v:0','-map','0:a?','-vf',`scale=min(${width}\\,iw):-2`,'-r','24','-c:v','libx264','-preset','fast','-crf',String(crf),'-pix_fmt','yuv420p','-c:a','aac','-b:a','64k','-movflags','+faststart',path.join(publicDir,output)],{stdio:'inherit'})
  entry[profile]={src:output,bytes:(await fs.stat(path.join(publicDir,output))).size}
 }
 const poster=`media/optimized-current/${stem}.jpg`
 execFileSync(ffmpeg,['-hide_banner','-loglevel','error','-y','-ss','0.2','-i',path.join(publicDir,source),'-frames:v','1','-vf','scale=960:-2','-q:v','3',path.join(publicDir,poster)],{stdio:'inherit'})
 manifest.videos[source]={...manifest.videos[source],...entry,poster}
 console.log(`${source}: ${((await fs.stat(path.join(publicDir,source))).size/1e6).toFixed(1)} MB -> ${(entry.desktop.bytes/1e6).toFixed(1)} MB desktop / ${(entry.mobile.bytes/1e6).toFixed(1)} MB mobile`)
}
await fs.writeFile('src/data/media-manifest.json',JSON.stringify(manifest,null,2)+'\n')
