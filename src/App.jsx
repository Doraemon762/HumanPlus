import { useEffect } from 'react'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import useHashRoute from './hooks/useHashRoute'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ResearchPage from './pages/ResearchPage'
import RobotPage from './pages/RobotPage'
import NewsPage from './pages/NewsPage'
import SolutionsPage from './pages/SolutionsPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'
import ApplicationPage from './pages/ApplicationPage'

/* ── Route table ──────────────────────────────────────────────────
   /                      home overview
   /products              product index
   /products/:id          product detail
   /robot                 robot overview
   /research  /news  /solutions  /contact
   Hash routing (no react-router) keeps every deep link refresh-safe
   on GitHub Pages — see src/hooks/useHashRoute.js. */
function renderRoute(path) {
  if (path === '/') return <HomePage />
  if (path === '/hardware') return <ProductsPage />
  if (path.startsWith('/hardware/')) return <ProductDetailPage id={path.slice('/hardware/'.length)} />
  if (path === '/application') return <ApplicationPage />
  // Legacy /products routes kept for backward-compatible deep links.
  if (path === '/products') return <ProductsPage />
  if (path.startsWith('/products/')) return <ProductDetailPage id={path.slice('/products/'.length)} />
  if (path === '/research') return <ResearchPage />
  if (path === '/robot') return <RobotPage />
  if (path === '/news') return <NewsPage />
  if (path === '/solutions') return <SolutionsPage />
  if (path === '/contact') return <ContactPage />
  return <NotFoundPage />
}

export default function App() {
  const path = useHashRoute()

  /* New route = new page: always start at the top. */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [path])

  return (
    <>
      <Nav path={path} />
      <main>{renderRoute(path)}</main>
      {/* Application is a self-contained full-page snap scroller (its own
          100vh viewport), so the global Footer is omitted there to keep the
          two screens edge-to-edge. Every other route keeps the Footer. */}
      {path !== '/application' && <Footer />}
    </>
  )
}
