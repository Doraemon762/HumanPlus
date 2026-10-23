import ProductsSection from '../components/sections/ProductsSection'
import { toHref } from '../hooks/useHashRoute'
import './ProductsPage.css'
import MotionZeroPerformanceTest from '../components/sections/CapturePerformanceScroll'

export default function ProductsPage() {
  return <div className="hardware-overview">
    <header className="hardware-heading"><h1>Hardware</h1></header>
    <ProductsSection includeAccessories showCategories={false} />
    <MotionZeroPerformanceTest />
    <div style={{ textAlign: 'center', padding: '50px 24px 80px' }}><a href={toHref('/contact')} style={{ display: 'inline-flex', gap: 12, borderRadius: 99, padding: '14px 28px', background: '#171717', color: '#fff', fontWeight: 600 }}>Contact Us <span aria-hidden="true">→</span></a></div>
  </div>
}
