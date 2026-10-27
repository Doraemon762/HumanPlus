import {useEffect,useState} from 'react'
export default function ZoomPage({page,index}){
 const [loaded,setLoaded]=useState(false)
 useEffect(()=>{
  let active=true
  setLoaded(false)
  const image=new Image();image.fetchPriority='high'
  image.onload=()=>{if(active)setLoaded(true)}
  image.src=page.full
  return()=>{active=false}
 },[page.full])
 return <img src={loaded?page.full:page.preview} alt={`第${index+1}页放大`} draggable="false" aria-busy={!loaded}/>
}
