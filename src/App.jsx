import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import ProductsSection from './components/sections/ProductsSection'
import RoboticsSection from './components/sections/RoboticsSection'
import ResearchSection from './components/sections/ResearchSection'
import NewsSection from './components/sections/NewsSection'
import SolutionsSection from './components/sections/SolutionsSection'
import ContactSection from './components/sections/ContactSection'

/* App stays thin — it only lists sections in page order.
   To add one: export from src/data/, create XxxSection.jsx, add a line here. */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <RoboticsSection />
        <ResearchSection />
        <NewsSection />
        <SolutionsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
