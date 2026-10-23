import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import CatalogEntry from './catalog/CatalogEntry'
import './styles/index.css'
import './styles/animations.css'
import './styles/motion0.css'
const isCatalog=window.location.pathname.replace(/\/$/,'')==='/catalog'
ReactDOM.createRoot(document.getElementById('root')).render(isCatalog?<CatalogEntry/>:<React.StrictMode><App/></React.StrictMode>)
