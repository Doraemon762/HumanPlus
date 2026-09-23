import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import ProductsSection from '../components/sections/ProductsSection'
import RoboticsSection from '../components/sections/RoboticsSection'
import ResearchSection from '../components/sections/ResearchSection'
import NewsSection from '../components/sections/NewsSection'
import SolutionsSection from '../components/sections/SolutionsSection'
import ContactSection from '../components/sections/ContactSection'

/**
 * Home = overview / gateway. Every module stays, but each one only
 * introduces its topic and hands off to its own route via a CTA.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <RoboticsSection />
      <ResearchSection />
      <NewsSection />
      <SolutionsSection />
      <ContactSection />
    </>
  )
}
