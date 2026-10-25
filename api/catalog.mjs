import { readFile } from 'node:fs/promises'
import path from 'node:path'
export function makeCatalogHandler({root=path.resolve('private/catalog')}={}) {
 return async function handler(req,res){
  res.setHeader('Cache-Control','private, no-store, max-age=0');res.setHeader('X-Robots-Tag','noindex, nofollow, noarchive');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer')
  const json=(status,data)=>{res.statusCode=status;res.setHeader('Content-Type','application/json; charset=utf-8');res.end(JSON.stringify(data))}
  // Intentionally public by link: no access key or session is needed.
  const url=new URL(req.url,'http://localhost')
  if(req.method!=='GET'){res.setHeader('Allow','GET');return json(405,{error:'方法不支持'})}
  try{const asset=url.searchParams.get('asset');if(asset){if(!/^page-\d{2}\.webp$/.test(asset))return json(404,{error:'未找到页面'});const image=await readFile(path.join(root,asset));res.setHeader('Content-Type','image/webp');res.statusCode=200;return res.end(image)}
   return json(200,JSON.parse(await readFile(path.join(root,'manifest.json'),'utf8')))
  }catch{return json(404,{error:'画册正在更新，请稍后重试。'})}
 }
}
export default makeCatalogHandler()
