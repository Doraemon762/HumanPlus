import { lazy, Suspense, useEffect } from 'react'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import useHashRoute from './hooks/useHashRoute'
import useSiteMotion from './hooks/useSiteMotion'
import useRouteWarmup from './hooks/useRouteWarmup'
import {routeLoaders} from './routeLoaders'
const HomePage = lazy(routeLoaders.home)
const ProductsPage = lazy(routeLoaders.hardware)
const ProductDetailPage = lazy(routeLoaders.product)
const ResearchPage = lazy(routeLoaders.research)
const RobotPage = lazy(routeLoaders.robot)
const NewsPage = lazy(routeLoaders.news)
const ContactPage = lazy(routeLoaders.contact)
const RecruitmentPage = lazy(routeLoaders.careers)
const NotFoundPage = lazy(routeLoaders.notFound)
const DatasetPage = lazy(routeLoaders.dataset)
const GlovePage = lazy(routeLoaders.glove)
const CapPage = lazy(routeLoaders.cap)

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
  if (path === '/hardware/glove') return <GlovePage />
  if (path === '/hardware/cap') return <CapPage />
  if (path.startsWith('/hardware/')) return <ProductDetailPage id={path.slice('/hardware/'.length)} />
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
  useSiteMotion(path)
  useRouteWarmup(path)

  /* New route = new page: always start at the top. */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [path])

  return (
    <>
      <Nav path={path} />
      <main>
        <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-gray-500" role="status">Loading…</div>}>
          {renderRoute(path)}
        </Suspense>
      </main>
      {/* Application is a self-contained full-page snap scroller (its own
          100vh viewport), so the global Footer is omitted there to keep the
          two screens edge-to-edge. Dataset is a native showcase and keeps
          the same global footer as the other company pages. */}
      {path !== '/application' && <Footer />}
    </>
  )
}
