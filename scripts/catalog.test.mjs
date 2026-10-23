import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { makeCatalogHandler } from '../api/catalog.mjs'
test('catalogue pages require a valid signed server session',async()=>{
 const key='test-key-with-at-least-thirty-two-characters-1234'
 const server=createServer(makeCatalogHandler({accessKey:key,secure:false}));await new Promise(r=>server.listen(0,'127.0.0.1',r));const url=`http://127.0.0.1:${server.address().port}/api/catalog`
 try{
  assert.equal((await fetch(url)).status,401)
  assert.equal((await fetch(url+'?asset=page-01.webp')).status,401)
  assert.equal((await fetch(url,{method:'POST',body:JSON.stringify({key:'wrong'})})).status,403)
  assert.equal((await fetch(url,{method:'POST',headers:{Origin:'https://attacker.test'},body:JSON.stringify({key})})).status,403)
  const login=await fetch(url,{method:'POST',body:JSON.stringify({key})});assert.equal(login.status,200);const cookie=login.headers.get('set-cookie').split(';')[0];assert.match(login.headers.get('set-cookie'),/HttpOnly/)
  const manifest=await fetch(url,{headers:{cookie}});assert.equal(manifest.status,200);const data=await manifest.json();assert.equal(data.pages.length,8);assert.match(manifest.headers.get('cache-control'),/no-store/)
  const image=await fetch(url+'?asset=page-01.webp',{headers:{cookie}});assert.equal(image.status,200);assert.equal(image.headers.get('content-type'),'image/webp')
  assert.equal((await fetch(url+'?asset=../../package.json',{headers:{cookie}})).status,404)
  assert.equal((await fetch(url,{headers:{cookie:cookie+'tamper'}})).status,401)
 }finally{await new Promise(r=>server.close(r))}
})
