import './HomePage.css'
import HeroSection from '../components/sections/HeroSection'
import ProductsSection from '../components/sections/ProductsSection'
import RoboticsSection from '../components/sections/RoboticsSection'
import ResearchSection from '../components/sections/ResearchSection'
import NewsSection from '../components/sections/NewsShowcase'

/**
 * Home = overview / gateway. Every module introduces its topic and
 * hands off to its own route via a CTA.
 */
export default function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <RoboticsSection />
      <ProductsSection includeAccessories showCategories={false} />
      <ResearchSection />
      <NewsSection />
    </div>
  )
}
