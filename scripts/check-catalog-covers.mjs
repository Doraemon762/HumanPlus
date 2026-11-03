import assert from 'node:assert/strict'
import { fixCoverTransitions } from '../src/catalog/coverTransitions.js'

let removed=false
const element={style:{},setAttribute(){},remove(){removed=true}}
globalThis.document={createElement:()=>element}
class Page { constructor(){this.loaded=false} load(){this.loaded=true} }
const cover=new Page(),middle=new Page(),back=new Page()
let bottom=cover,turning=cover,orientation='landscape',left='old-left',right='old-right',settle
const render={setLeftPage:p=>{left=p},setRightPage:p=>{right=p},clearShadow(){}}
const collection={getBottomPage(){return bottom},getFlippingPage(){return turning}}
const original=collection.getBottomPage
const f={getPageCollection:()=>collection,getPage:()=>cover,getRender:()=>render,getOrientation:()=>orientation,on:(_,fn)=>{settle=fn}}
const cleanup=fixCoverTransitions(f,{querySelector:()=>({append(){}})})
const blank=collection.getBottomPage(1)
assert.notEqual(blank,cover)
assert.equal(blank.loaded,true)
assert.equal(left,null,'opening cover has no static left sheet')
bottom=middle;turning=cover
assert.equal(collection.getBottomPage(1),middle,'ordinary spread unchanged')
bottom=back;turning=back
assert.equal(collection.getBottomPage(0),blank)
assert.equal(right,null,'back cover has no static right sheet')
orientation='portrait'
left='portrait-left';right='current-page'
assert.equal(collection.getBottomPage(1),blank,'backward portrait uses an independent bottom sheet')
assert.equal(left,'portrait-left','portrait turn does not clear static pages')
assert.equal(right,'current-page','current portrait page remains underneath the turning page')
bottom=middle;turning=cover
assert.equal(collection.getBottomPage(0),middle,'forward portrait keeps its real next page')
settle({data:'read'})
assert.equal(element.style.display,'none')
cleanup()
assert.equal(collection.getBottomPage,original)
assert.equal(removed,true)
console.log('Verified cover boundaries, mobile backward turns, forward portrait, and cleanup.')
