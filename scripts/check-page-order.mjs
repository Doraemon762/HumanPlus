import fs from 'node:fs'
import assert from 'node:assert/strict'
import {routeName} from '../src/routeLoaders.js'
const read=file=>fs.readFileSync(file,'utf8')
assert(!read('src/pages/ProductsPage.jsx').includes('CapturePerformanceScroll'))
const weave=read('src/components/products/WeavePresentation.jsx')
assert(weave.includes('<CapturePerformanceScroll />'))
assert(weave.indexOf('weave-teleoperation')<weave.indexOf('weave-capabilities'))
const pulse=read('src/components/products/StrapZeroHero.jsx')
assert(pulse.indexOf('pulse-demo-space')<pulse.indexOf('pulse-data'))
assert(pulse.indexOf('pulse-data')<pulse.indexOf('pulse-specs pulse-specs--with-art'))
const glove=read('src/pages/GlovePage.jsx')
assert(glove.indexOf('glove-capabilities"')<glove.indexOf('glove-feature-comparison"'))
assert.equal(routeName('/hardware/cap'),'cap')
assert.equal(routeName('/hardware/weave'),'product')
assert.equal(routeName('/contact/joinus'),'careers')
console.log('Verified product section order and route-prefetch mappings.')
