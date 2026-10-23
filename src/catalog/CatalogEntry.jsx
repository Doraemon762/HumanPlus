import { Suspense, lazy } from 'react'
const CatalogReader=lazy(()=>import('./CatalogReader'))
export default function CatalogEntry(){return <Suspense fallback={<div style={{padding:48,color:'#666'}}>正在打开画册…</div>}><CatalogReader/></Suspense>}
