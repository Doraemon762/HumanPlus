import useSectionSnap from '../hooks/useSectionSnap'
import HeroSection from '../components/sections/HeroSection'
import ProductsSection from '../components/sections/ProductsSection'
import RoboticsSection from '../components/sections/RoboticsSection'
import ResearchSection from '../components/sections/ResearchSection'
import NewsSection from '../components/sections/NewsSection'

/**
 * Home = overview / gateway. Every module introduces its topic and
 * hands off to its own route via a CTA.
 */
export default function HomePage() {
  useSectionSnap({ duration: 1000 })

  return (
    <>
      <HeroSection />
      <RoboticsSection />
      <ProductsSection />
      <ResearchSection />
      <NewsSection />
    </>
  )
}
