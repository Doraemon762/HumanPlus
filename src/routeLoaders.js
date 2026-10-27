const imports={
 home:()=>import('./pages/HomePage'), hardware:()=>import('./pages/ProductsPage'),
 product:()=>import('./pages/ProductDetailPage'), research:()=>import('./pages/ResearchPage'),
 robot:()=>import('./pages/RobotPage'), news:()=>import('./pages/NewsPage'),
 contact:()=>import('./pages/ContactPage'), careers:()=>import('./pages/RecruitmentPage'),
 notFound:()=>import('./pages/NotFoundPage'), dataset:()=>import('./pages/DatasetPage'),
 glove:()=>import('./pages/GlovePage'), cap:()=>import('./pages/CapPage'),
}
const pending=new Map()
export const routeLoaders=Object.fromEntries(Object.entries(imports).map(([name,load])=>[name,()=>{
 if(!pending.has(name))pending.set(name,load().catch(error=>{pending.delete(name);throw error}))
 return pending.get(name)
}]))
export function routeName(path){
 if(path==='/')return 'home'
 if(path==='/hardware'||path==='/products')return 'hardware'
 if(path==='/hardware/glove')return 'glove'
 if(path==='/hardware/cap')return 'cap'
 if(path.startsWith('/hardware/')||path.startsWith('/products/'))return 'product'
 if(['/contact/joinus','/contact/career','/join','/careers','/join-us','/career'].includes(path))return 'careers'
 return ({'/research':'research','/dataset':'dataset','/contact':'contact','/news':'news','/robot':'robot'})[path]||'notFound'
}
