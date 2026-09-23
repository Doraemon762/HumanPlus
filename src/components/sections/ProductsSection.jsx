import Reveal from '../ui/Reveal'
import MediaPlaceholder from '../ui/MediaPlaceholder'
import { products } from '../../data/products'

/* ── Products — five unified cards driven by src/data/products.js.
   No specs or parameters at this stage; each card carries a media
   placeholder, name, subtitle and one placeholder sentence. */

function ProductCard({ product, delay }) {
  return (
    <Reveal
      delay={delay}
      className="group flex h-full flex-col rounded-[16px] border border-black/10 bg-white p-6 transition-colors duration-300 hover:border-brandLine"
    >
      <MediaPlaceholder label={`${product.name.toUpperCase()} — IMAGE / VIDEO`} className="group-hover:opacity-90 transition-opacity duration-300" />
      <h3 className="mt-6 text-xl font-bold tracking-tight text-ink">
        {product.name}
        {product.subtitle && <span className="ml-2 text-sm font-medium text-brand">{product.subtitle}</span>}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink/55">{product.description}</p>
      <a
        href="#products"
        className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[11px] font-mono uppercase tracking-[0.25em] text-brand transition-colors duration-300 hover:text-[#0140CC]"
      >
        Learn More
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-[3px]">→</span>
      </a>
    </Reveal>
  )
}

export default function ProductsSection() {
  return (
    <section className="relative py-[85px] md:py-[107px]">
      <div id="products" className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <Reveal className="text-xs font-mono uppercase tracking-[0.3em] text-mute">Products</Reveal>
        <Reveal
          as="h2"
          delay={1}
          className="mt-4 font-black tracking-tight leading-[1.2] text-[clamp(1.25rem,4vw,3rem)] text-ink"
        >
          Our Products
        </Reveal>
        <Reveal delay={2} className="mt-6">
          <p className="max-w-xl text-base leading-relaxed text-ink/70">
            Product line overview goes here.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} delay={i % 3} />
          ))}
        </div>
      </div>
    </section>
  )
}
