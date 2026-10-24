import fs from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
const manifest=JSON.parse(await fs.readFile('src/data/media-manifest.json','utf8'))
for (const source of ['videos/home/hero-laundry.mp4','videos/robotics/robotics-laundry.mp4','videos/demo/human-demo-1-1080.mp4']) {
  const output=`media/optimized-current/${source.split('/').at(-1).replace('.mp4','.slow.mp4')}`
  execFileSync(process.env.FFMPEG_BIN,['-hide_banner','-loglevel','error','-y','-i',`public/${source}`,'-map','0:v:0','-map','0:a?','-vf','scale=min(960\\,iw):-2','-r','24','-c:v','libx264','-preset','fast','-crf','26','-maxrate','1000k','-bufsize','2000k','-g','48','-pix_fmt','yuv420p','-c:a','aac','-b:a','64k','-movflags','+faststart',`public/${output}`],{stdio:'inherit'})
  manifest.videos[source].slow={src:output,bytes:(await fs.stat(`public/${output}`)).size}
  console.log(source,manifest.videos[source].slow.bytes)
}
await fs.writeFile('src/data/media-manifest.json',JSON.stringify(manifest,null,2)+'\n')
