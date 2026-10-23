import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
const COOKIE='hp_catalog_session'
const TTL=12*60*60
const safeEqual=(a,b)=>{const x=Buffer.from(a||''),y=Buffer.from(b||'');return x.length===y.length&&timingSafeEqual(x,y)}
export function makeCatalogHandler({root=path.resolve('private/catalog'),accessKey=process.env.CATALOG_ACCESS_KEY,secure=process.env.NODE_ENV==='production'}={}) {
 const sign=v=>createHmac('sha256',accessKey).update(v).digest('base64url')
 const valid=req=>{if(!accessKey)return false;const cookie=(req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith(COOKIE+'='))?.slice(COOKIE.length+1);if(!cookie)return false;const [exp,nonce,sig]=cookie.split('.');return /^\d+$/.test(exp)&&Number(exp)>Date.now()/1000&&safeEqual(sign(exp+'.'+nonce),sig)}
 return async function handler(req,res){
  res.setHeader('Cache-Control','private, no-store, max-age=0');res.setHeader('X-Robots-Tag','noindex, nofollow, noarchive');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer')
  const json=(status,data)=>{res.statusCode=status;res.setHeader('Content-Type','application/json; charset=utf-8');res.end(JSON.stringify(data))}
  if(!accessKey||accessKey.length<32)return json(503,{error:'画册访问尚未配置，请联系工作人员。'})
  const url=new URL(req.url,'http://localhost')
  if(req.method==='POST'){
   const origin=req.headers.origin;if(origin&&new URL(origin).host!==req.headers.host)return json(403,{error:'访问未授权'})
   let body=req.body;if(body===undefined){let raw='';for await(const chunk of req){raw+=chunk;if(raw.length>2048)return json(413,{error:'请求过长'})}try{body=JSON.parse(raw)}catch{return json(400,{error:'链接无效'})}}
   if(typeof body==='string'){try{body=JSON.parse(body)}catch{return json(400,{error:'链接无效'})}}
   if(!safeEqual(body?.key,accessKey))return json(403,{error:'专用链接无效或已更新，请联系工作人员。'})
   const payload=Math.floor(Date.now()/1000+TTL)+'.'+randomBytes(16).toString('base64url');res.setHeader('Set-Cookie',`${COOKIE}=${payload}.${sign(payload)}; HttpOnly; SameSite=Strict; Path=/api/catalog; Max-Age=${TTL}${secure?'; Secure':''}`);return json(200,{ok:true})
  }
  if(req.method!=='GET'){res.setHeader('Allow','GET, POST');return json(405,{error:'方法不支持'})}
  if(!valid(req))return json(401,{error:'请通过工作人员提供的专用链接打开画册。'})
  try{const asset=url.searchParams.get('asset');if(asset){if(!/^page-\d{2}\.webp$/.test(asset))return json(404,{error:'未找到页面'});const image=await readFile(path.join(root,asset));res.setHeader('Content-Type','image/webp');res.statusCode=200;return res.end(image)}
   return json(200,JSON.parse(await readFile(path.join(root,'manifest.json'),'utf8')))
  }catch{return json(404,{error:'画册正在更新，请稍后重试。'})}
 }
}
export default makeCatalogHandler()
