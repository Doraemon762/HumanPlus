import { useEffect, useRef, useState } from 'react'
import { PageFlip } from 'page-flip'
import { ArrowLeft, ArrowRight, Maximize2, Minimize2, ZoomIn, X, RefreshCw } from 'lucide-react'
import './catalog.css'
import { site } from '../data/site'
export default function CatalogReader(){
 const [manifest,setManifest]=useState(null),[error,setError]=useState(''),[page,setPage]=useState(0),[zoom,setZoom]=useState(false),[full,setFull]=useState(false)
 const book=useRef(null),flip=useRef(null),shell=useRef(null),started=useRef(false)
 useEffect(()=>{document.title='HumanPlus · 客户产品画册';const meta=document.createElement('meta');meta.name='robots';meta.content='noindex,nofollow,noarchive';document.head.append(meta)
  if(started.current)return;started.current=true
  if(new URLSearchParams(location.hash.slice(1)).has('access'))history.replaceState(null,'',location.pathname)
  ;(async()=>{try{const r=await fetch('/media/catalog/manifest.json',{cache:'no-cache'});if(!r.ok)throw Error('暂时无法打开画册，请稍后重试。');setManifest(await r.json())}catch(e){setError(e.message||'暂时无法打开画册，请稍后重试。')}})()
 },[])
 useEffect(()=>{if(!manifest||!book.current)return;const f=new PageFlip(book.current,{width:555,height:780,size:'stretch',minWidth:240,maxWidth:1600,minHeight:337,maxHeight:2249,showCover:true,usePortrait:true,autoSize:true,drawShadow:true,maxShadowOpacity:.16,flippingTime:750,mobileScrollSupport:false,showPageCorners:true,useMouseEvents:true,swipeDistance:25,clickEventForward:true});flip.current=f;f.loadFromHTML(book.current.querySelectorAll('.catalog-leaf'));f.on('flip',e=>setPage(e.data));const key=e=>{if(e.target.closest('input,button,a,select'))return;if(e.key==='ArrowRight')f.flipNext();if(e.key==='ArrowLeft')f.flipPrev();if(e.key==='Escape')setZoom(false)};window.addEventListener('keydown',key);return()=>{window.removeEventListener('keydown',key);f.destroy();flip.current=null}},[manifest])
 // showCover keeps the single-cover spread, but its default hard density
 // is independent of that layout. Use flexible sheets for every page.
 useEffect(()=>{
  if(!manifest)return
  const soften=()=>{
   const f=flip.current
   if(!f)return
   for(let i=0;i<f.getPageCount();i++)f.getPage(i).setDensity('soft')
  }
  soften()
  const f=flip.current
  f?.on('changeOrientation',soften)
  return()=>f?.off('changeOrientation')
 },[manifest])
 useEffect(()=>{const onFull=()=>setFull(!!document.fullscreenElement);document.addEventListener('fullscreenchange',onFull);return()=>document.removeEventListener('fullscreenchange',onFull)},[])
 useEffect(()=>{
  if(!manifest||!shell.current)return
  const el=shell.current
  let accumulated=0,lastInput=0,lockedUntil=0
  const onWheel=e=>{
   if(e.ctrlKey||zoom||e.target.closest('select,input,textarea,.catalog-zoom'))return
   if(Math.abs(e.deltaX)>Math.abs(e.deltaY))return
   e.preventDefault()
   const now=performance.now()
   const gap=now-lastInput
   lastInput=now
   // Ignore the tail of a trackpad gesture and inputs during a page turn.
   if(now<lockedUntil||flip.current?.getState()!=='read'){accumulated=0;return}
   const delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?innerHeight:1)
   if(gap>180||Math.sign(delta)!==Math.sign(accumulated))accumulated=0
   accumulated+=delta
   if(Math.abs(accumulated)<45)return
   const f=flip.current
   if(!f)return
   const forward=accumulated>0
   accumulated=0
   lockedUntil=now+900
   if(forward&&f.getCurrentPageIndex()<f.getPageCount()-1)f.flipNext()
   else if(!forward&&f.getCurrentPageIndex()>0)f.flipPrev()
  }
  el.addEventListener('wheel',onWheel,{passive:false})
  return()=>el.removeEventListener('wheel',onWheel)
 },[manifest,zoom])
 useEffect(()=>{
  if(!manifest||!shell.current)return
  const el=shell.current
  let timer
  const reveal=()=>{
   el.classList.remove('catalog-ui-hidden')
   clearTimeout(timer)
   timer=setTimeout(()=>{if(!el.querySelector('.catalog-header:hover,.catalog-footer:hover,.catalog-header:focus-within,.catalog-footer:focus-within'))el.classList.add('catalog-ui-hidden')},2200)
  }
  el.addEventListener('pointermove',reveal)
  el.addEventListener('pointerdown',reveal)
  el.addEventListener('keydown',reveal)
  reveal()
  return()=>{clearTimeout(timer);el.removeEventListener('pointermove',reveal);el.removeEventListener('pointerdown',reveal);el.removeEventListener('keydown',reveal)}
 },[manifest])
 async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else await shell.current.requestFullscreen()}catch{setError('当前浏览器不支持全屏，可使用放大阅读。')}}
 if(!manifest)return <div className="catalog-gate"><span className="catalog-brand"><img src={`/${site.logo}`} alt="HumanPlus"/></span><h1>客户产品画册</h1><p>{error||'正在打开画册…'}</p>{error&&<button onClick={()=>location.reload()}><RefreshCw size={16}/>重新打开</button>}</div>
 return <div className="catalog-shell" ref={shell}>
  <header className="catalog-header"><div className="catalog-brand"><img src={`/${site.logo}`} alt="HumanPlus"/></div><div className="catalog-language" aria-label="手册语言"><span aria-current="true">中文</span><button disabled>English</button></div><div className="catalog-actions"><button onClick={()=>setZoom(true)} aria-label="放大当前页" title="放大当前页"><ZoomIn size={19}/></button><button onClick={fullscreen} aria-label={full?'退出全屏':'全屏阅读'} title="全屏阅读">{full?<Minimize2 size={19}/>:<Maximize2 size={19}/>}</button></div></header>
  <main className="catalog-main"><div className="catalog-stage"><div className="catalog-book" ref={book}>{manifest.pages.map((p,i)=><div className="catalog-leaf" key={p.file} data-density="soft"><div className="catalog-paper"><img src={Math.abs(i-page)<=3 ? p.preview : undefined} decoding="async" fetchpriority={i===page?"high":"low"} alt={`产品手册第 ${i+1} 页：${p.title}`} draggable="false" onError={()=>setError('页面加载中断，请刷新重试。')}/>{p.links?.map((l,j)=><a key={j} href={l.url} target="_blank" rel="noreferrer" aria-label="打开页面链接" className="catalog-hotspot" style={{left:l.x+'%',top:l.y+'%',width:l.w+'%',height:l.h+'%'}}/>)}</div></div>)}</div></div>
   {error&&<p className="catalog-error" role="alert">{error}</p>}
  </main><footer className="catalog-footer"><span className="catalog-hint">点击页面翻阅 · 支持左右方向键</span><nav className="catalog-controls" aria-label="画册翻页"><button onClick={()=>flip.current?.flipPrev()} disabled={page===0} aria-label="上一页"><ArrowLeft size={19}/></button><span aria-live="polite">{String(page+1).padStart(2,'0')}<i>/</i>{String(manifest.pages.length).padStart(2,'0')}</span><button onClick={()=>flip.current?.flipNext()} disabled={page>=manifest.pages.length-1} aria-label="下一页"><ArrowRight size={19}/></button></nav><select value={page} onChange={e=>flip.current?.flip(Number(e.target.value))} aria-label="跳转页面">{manifest.pages.map((p,i)=><option key={i} value={i}>{String(i+1).padStart(2,'0')} · {p.title}</option>)}</select></footer>
  {zoom&&<div className="catalog-zoom" role="dialog" aria-modal="true" aria-label="放大阅读"><button className="catalog-close" onClick={()=>setZoom(false)} aria-label="关闭放大"><X/></button><img src={manifest.pages[page].full} alt={`第${page+1}页放大`}/></div>}
 </div>
}
