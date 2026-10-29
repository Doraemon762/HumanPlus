import {useEffect} from 'react'
import {routeLoaders,routeName} from '../routeLoaders'
import {imageSource} from '../components/ui/OptimizedImage'
import media from '../data/media-manifest.json'

const images={hardware:['images/motion-0/weave-garment-set.png','images/products/pulse-strap-new.png','images/products/glove-pro-updated.png','images/products/cap.png'],product:['images/motion-0/weave-mannequin-front.png','images/products/pulse-body-front-back.png'],glove:['images/products/glove-pro-updated.png'],cap:['images/products/cap.png']}
const fetched=new Map()
function warmImage(src){
 const url=imageSource(src,960)
 if(!fetched.has(url))fetched.set(url,new Promise(resolve=>{
  const img=new Image();img.fetchPriority='low';img.onload=img.onerror=resolve;img.src=url
  setTimeout(resolve,8000)
 }))
 return fetched.get(url)
}
export default function useRouteWarmup(path){
 useEffect(()=>{
  if(navigator.connection?.saveData)return
  let stopped=false,timer,idle
  const wait=()=>new Promise(resolve=>{timer=setTimeout(resolve,500)})
  const schedule=()=>{
   if(stopped)return
   if(document.hidden||document.querySelector('main [role="status"]')||[...document.querySelectorAll('img[fetchpriority="high"]')].some(i=>!i.complete)){
    timer=setTimeout(schedule,1000);return
   }
   const run=async()=>{
    const order=['hardware','product','glove','cap','dataset','research','contact','careers','news','robot','home'].filter(k=>k!==routeName(path))
    for(const key of order){
     if(stopped)return
     while(document.hidden&&!stopped)await wait()
     if(stopped)return
     try{await routeLoaders[key]()}catch{/* A failed speculative load must not break the current page. */}
     for(const src of images[key]||[]){if(stopped)return;await warmImage(src)}
     await wait()
    }
    // All video sections can show their poster immediately on the next visit;
    // the multi-megabyte video itself remains viewport-triggered.
    for(const poster of new Set(Object.values(media.videos).map(v=>v.poster).filter(Boolean))){
     if(stopped)return
     while(document.hidden&&!stopped)await wait()
     if(stopped)return
     await warmImage(poster)
    }
   }
   if(window.requestIdleCallback)idle=requestIdleCallback(run,{timeout:4000})
   else timer=setTimeout(run,500)
  }
  const intent=e=>{
   const link=e.target.closest?.('a[href^="#/"]')
   if(link)routeLoaders[routeName(link.getAttribute('href').slice(1))]().catch(()=>{})
  }
  const begin=()=>{timer=setTimeout(schedule,1500)}
  if(document.readyState==='complete')begin();else window.addEventListener('load',begin,{once:true})
  document.addEventListener('pointerover',intent,{passive:true})
  document.addEventListener('focusin',intent)
  return()=>{stopped=true;clearTimeout(timer);if(idle)window.cancelIdleCallback?.(idle);window.removeEventListener('load',begin);document.removeEventListener('pointerover',intent);document.removeEventListener('focusin',intent)}
 },[path])
}
