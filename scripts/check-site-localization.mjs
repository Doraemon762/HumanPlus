import fs from 'node:fs'
import assert from 'node:assert/strict'
import {createServer} from 'vite'
import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'

// Render the actual route components, not a second copy of the translation logic.
// SSR ignores animation effects; the element structure must remain identical.
globalThis.document={documentElement:{lang:'en'}}
const server=await createServer({server:{middlewareMode:true},appType:'custom'})
const routes=[
 ['HomePage'],['ProductsPage'],['ProductDetailPage',{id:'weave'}],
 ['ProductDetailPage',{id:'pulse'}],['GlovePage'],['CapPage'],
 ['DatasetPage'],['ResearchPage'],['NewsPage'],['ContactPage'],['RecruitmentPage'],['NotFoundPage'],
]
const strip=html=>html.replace(/<br\s*\/?\s*>/g,'').replace(/>[^<>]*</g,'><').replace(/(?:alt|title|placeholder|aria-label|aria-description)="[^"]*"/g,'')
const text=html=>html.replace(/<[^>]*>/g,'\n').replace(/&amp;/g,'&').replace(/&#x27;/g,"'").replace(/&quot;/g,'"').split('\n').map(s=>s.trim()).filter(Boolean)
try{
 const i18n=await server.ssrLoadModule('/src/i18n/index.js')
 const modules=Object.fromEntries(await Promise.all([...new Set(routes.map(([name])=>name))].map(async name=>[name,await server.ssrLoadModule(`/src/pages/${name}.jsx`)])))
 globalThis.window={matchMedia:()=>({matches:false})}
 assert.equal(i18n.translate('Home'),'Home','Initial language must be English')
 const unknown=new Set()
 fs.mkdirSync('.codex_tmp/i18n-render',{recursive:true})
 for(const [name,props={}] of routes){
  const {default:Page}=modules[name]
  i18n.setSiteLanguage('en')
  const en=renderToStaticMarkup(React.createElement(Page,props))
  i18n.setSiteLanguage('zh')
  const zh=renderToStaticMarkup(React.createElement(Page,props))
  if(name==='ProductDetailPage' && props.id==='weave') {
   assert(zh.includes('默认 66.7 Hz，可调') && zh.includes('室内 7 m') && zh.includes('2.4 GHz BLE 通信；NTP ≤ 20 ms'),'Weave Chinese specs must match V4')
   assert(en.includes('30 Hz (Default)'),'English copy must remain unchanged')
  }
  if(name==='GlovePage') assert(zh.includes('45 Hz') && zh.includes('30 Hz') && zh.includes('≥ 2.5 小时'),'Glove model-specific values must be preserved')
  if(name==='NewsPage') assert(zh.includes('厦大HumanPlus、CMU、MIT推出CLOTHO，把全身动捕做进宽松衣服，可连续追踪 8 小时') && zh.includes('超越Meta! 厦大Humanplus联合CMU、清华浙大发布最大规模WBI人类数据集'),'Use the user-confirmed original headlines')

  assert.equal(strip(en),strip(zh),`${name}: language changed element structure or layout attributes`)
  for(const value of text(zh))if(/[a-zA-Z]{3}/.test(value)&&!/[\u3400-\u9fff]/.test(value))unknown.add(value)
  fs.writeFileSync(`.codex_tmp/i18n-render/${name}${props.id||''}.html`,zh)
  console.log(`${name} ${props.id||''}: same markup; ${text(zh).length} text nodes checked`)
 }
 const nav=await server.ssrLoadModule('/src/components/layout/Nav.jsx')
 const footer=await server.ssrLoadModule('/src/components/layout/Footer.jsx')
 fs.writeFileSync('.codex_tmp/i18n-render/Footer.html',renderToStaticMarkup(React.createElement(footer.default)))
 assert(renderToStaticMarkup(React.createElement(nav.default,{path:'/'})).includes('site-language-toggle'))
 i18n.setSiteLanguage('en');assert.equal(i18n.translate('Home'),'Home')
 i18n.setSiteLanguage('zh');assert.equal(i18n.translate('Home'),'首页')
 assert.equal(i18n.translate('info@humanplus.xyz'),'info@humanplus.xyz')
 assert.equal(i18n.translate('IMU'),'IMU')
 console.log('Remaining Latin-only labels (brand names, units and conference names allowed):\n'+[...unknown].sort().join('\n'))
 console.log('English default, reversible language switch, unchanged DOM structure verified.')
}finally{await server.close()}
