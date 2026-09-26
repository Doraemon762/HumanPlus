import useSectionSnap from '../hooks/useSectionSnap'
import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import ProductsSection from '../components/sections/ProductsSection'
import RoboticsSection from '../components/sections/RoboticsSection'
import ResearchSection from '../components/sections/ResearchSection'
import NewsSection from '../components/sections/NewsSection'
import LogoWallSection from '../components/sections/LogoWallSection'

/**
 * Home = overview / gateway. Every module stays, but each one only
 * introduces its topic and hands off to its own route via a CTA.
 */
export default function HomePage() {
  /* Full-screen Hero ⇄ About hand-off. Everything past About's top
     edge scrolls natively, so the rest of the page is untouched. */
  useSectionSnap({ duration: 1000 })

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <RoboticsSection />
      <ResearchSection />
      <NewsSection />
      <LogoWallSection />
    </>
  )
}
