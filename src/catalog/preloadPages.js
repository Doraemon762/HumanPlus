// Keep browser HTTP-cache entries for small page images. Never prefetch full
// resolution sheets: those are requested exclusively by the zoom dialog.
const cache=new Map()
export function preloadPage(url){
 if(!cache.has(url))cache.set(url,new Promise(resolve=>{
  const image=new Image();image.fetchPriority='low'
  const timer=setTimeout(()=>{cache.delete(url);resolve(false)},8000)
  image.onload=()=>{clearTimeout(timer);resolve(true)}
  image.onerror=()=>{clearTimeout(timer);cache.delete(url);resolve(false)}
  image.src=url
 }))
 return cache.get(url)
}
