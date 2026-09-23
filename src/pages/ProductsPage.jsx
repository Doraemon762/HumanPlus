import PageHeader from '../components/layout/PageHeader'
import Reveal from '../components/ui/Reveal'
import ProductCard from '../components/products/ProductCard'
import CtaLink from '../components/ui/CtaLink'
import { products } from '../data/products'

export default function ProductsPage() {
  return (
    <>
      <PageHeader label="Products" title="Products" description="Product line overview goes here." />

      <section className="py-[85px] md:py-[107px]">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <Reveal key={product.id} delay={i % 3}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={3} className="mt-16 md:mt-20">
            <CtaLink to="/contact">Contact Us</CtaLink>
          </Reveal>
        </div>
      </section>
    </>
  )
}
