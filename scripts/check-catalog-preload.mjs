import assert from 'node:assert/strict'
const requested=[]
globalThis.Image=class{
 set src(url){requested.push(url);queueMicrotask(()=>this.onload())}
}
const {preloadPage}=await import('../src/catalog/preloadPages.js')
assert.equal(await preloadPage('/page-01.webp'),true)
assert.equal(await preloadPage('/page-01.webp'),true)
assert.deepEqual(requested,['/page-01.webp'])
console.log('Verified small-preview caching and duplicate-request suppression.')
