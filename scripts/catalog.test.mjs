import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { makeCatalogHandler } from '../api/catalog.mjs'
test('catalogue pages are shareable without a key or session',async()=>{
 const server=createServer(makeCatalogHandler());await new Promise(r=>server.listen(0,'127.0.0.1',r));const url=`http://127.0.0.1:${server.address().port}/api/catalog`
 try{
  const manifest=await fetch(url);assert.equal(manifest.status,200);const data=await manifest.json();assert.equal(data.pages.length,8);assert.match(manifest.headers.get('cache-control'),/no-store/)
  assert.match(manifest.headers.get('x-robots-tag'),/noindex/);assert.equal(manifest.headers.get('set-cookie'),null)
  const image=await fetch(url+'?asset=page-01.webp');assert.equal(image.status,200);assert.equal(image.headers.get('content-type'),'image/webp')
  assert.equal((await fetch(url+'?asset=../../package.json')).status,404)
  assert.equal((await fetch(url+'?asset=page-99.webp')).status,404)
  assert.equal((await fetch(url,{method:'POST'})).status,405)
 }finally{await new Promise(r=>server.close(r))}
})
