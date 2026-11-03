// page-flip 2.0.7 reuses a sheet as both the turning and bottom page at
// singleton landscape spreads AND on every backward portrait turn. The two
// clipping calculations overwrite each other, so mobile backward turns snap.
// Use a transparent bottom sheet whenever these two roles share a page.
export function fixCoverTransitions(f, book) {
 const collection=f.getPageCollection()
 const original=collection.getBottomPage
 const element=document.createElement('div')
 element.className='catalog-empty-sheet'
 element.setAttribute('aria-hidden','true')
 book.querySelector('.stf__block').append(element)
 const Page=f.getPage(0).constructor
 const blank=new Page(f.getRender(),element,'soft')
 blank.load()
 element.style.display='none'
 collection.getBottomPage=function(direction){
  const bottom=original.call(this,direction)
  if(bottom===this.getFlippingPage(direction)){
   // There is no static page on the outside of the closed book.
   if(f.getOrientation()==='landscape'){
    if(direction===1)f.getRender().setLeftPage(null)
    else f.getRender().setRightPage(null)
   }
   return blank
  }
  return bottom
 }
 const settle=e=>{if(e.data==='read'){element.style.display='none';f.getRender().clearShadow()}}
 f.on('changeState',settle)
 return()=>{collection.getBottomPage=original;element.remove()}
}
