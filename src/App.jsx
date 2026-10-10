import { lazy, Suspense, useEffect } from 'react'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import useHashRoute from './hooks/useHashRoute'
import HomePage from './pages/HomePage'
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const ResearchPage = lazy(() => import('./pages/ResearchPage'))
const RobotPage = lazy(() => import('./pages/RobotPage'))
const NewsPage = lazy(() => import('./pages/NewsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const RecruitmentPage = lazy(() => import('./pages/RecruitmentPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const ApplicationPage = lazy(() => import('./pages/ApplicationPage'))
const DatasetPage = lazy(() => import('./pages/DatasetPage'))

/* ── Route table ──────────────────────────────────────────────────
   /                      home overview
   /products              product index
   /products/:id          product detail
   /robot                 robot overview
   /research  /news  /contact
   Hash routing (no react-router) keeps every deep link refresh-safe
   on GitHub Pages — see src/hooks/useHashRoute.js. */
function renderRoute(path) {
  if (path === '/') return <HomePage />
  if (path === '/hardware') return <ProductsPage />
  if (path.startsWith('/hardware/')) return <ProductDetailPage id={path.slice('/hardware/'.length)} />
  if (path === '/application') return <ApplicationPage />
  if (path === '/dataset') return <DatasetPage />
  // Legacy /products routes kept for backward-compatible deep links.
  if (path === '/products') return <ProductsPage />
  if (path.startsWith('/products/')) return <ProductDetailPage id={path.slice('/products/'.length)} />
  if (path === '/research') return <ResearchPage />
  if (path === '/robot') return <RobotPage />
  if (path === '/news') return <NewsPage />
  if (path === '/contact') return <ContactPage />
  // Recruitment — single centered module, reachable at any of these.
  // `/contact/joinus` is the canonical child route of Contact; legacy
  // `/contact/career` + `/career` + `/join` aliases kept so old deep
  // links still resolve.
  if (path === '/contact/joinus' || path === '/contact/career' || path === '/join' || path === '/careers' || path === '/join-us' || path === '/career') return <RecruitmentPage />
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
      <main>
        <Suspense fallback={<div className="min-h-screen bg-white" role="status" aria-label="Loading" />}>
          {renderRoute(path)}
        </Suspense>
      </main>
      {/* Application is a self-contained full-page snap scroller (its own
          100vh viewport), so the global Footer is omitted there to keep the
          two screens edge-to-edge. Every other route keeps the Footer. */}
      {path !== '/application' && path !== '/dataset' && <Footer />}
    </>
  )
}
