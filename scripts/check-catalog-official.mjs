import fs from 'node:fs'
import assert from 'node:assert/strict'
const html=fs.readFileSync('dist/catalog/index.html','utf8')
assert(html.includes('noindex'))
for(const asset of html.matchAll(/(?:src|href)="(\/catalog\/[^\"]+)/g))assert(fs.existsSync('dist'+asset[1]),asset[1])
assert.equal(JSON.parse(fs.readFileSync('vercel.json')).git.deploymentEnabled,false)
assert(!fs.existsSync('dist/catalog/.vercel'))
assert(fs.readFileSync('dist/robots.txt','utf8').includes('Disallow: /catalog'))
console.log('Verified physical catalogue entry, prefixed assets, noindex, and disabled Vercel auto-deployment.')
