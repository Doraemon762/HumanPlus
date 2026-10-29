import {translate, useSiteLanguage} from '../../i18n'
import OptimizedImage from '../ui/OptimizedImage'
import { toHref } from '../../hooks/useHashRoute'
import './ProductsSection.css'

const showcase = [
  { id: 'weave', name: 'Weave', category: 'Garment-based Motion Capture', description: 'Capture motion. Wear naturally.', href: '/hardware/motion-0', image: 'images/motion-0/weave-garment-set.png', alt: 'Weave motion capture jacket and trousers' },
  { id: 'pulse', name: 'Pulse', category: 'Strap-based Motion Capture', description: 'Precision in every movement.', href: '/hardware/motion-strap', image: 'images/products/pulse-strap-new.png', alt: 'Pulse wearable motion capture sensor and strap' },
]

const accessories = [
  { id: 'cap', name: 'CAP', description: 'Head-worn stereo vision and inertial sensing.', href: '/hardware/cap', image: 'images/products/cap.png', alt: 'HumanPlus CAP with integrated stereo cameras' },
  { id: 'glove', name: 'Glove', description: 'Glove and Glove Pro for hand motion capture.', href: '/hardware/glove', image: 'images/products/glove-pro-updated.png', alt: 'HumanPlus Glove Pro with 11 IMUs' },
]

export default function ProductsSection({ includeAccessories = false, showCategories = true }) {
  useSiteLanguage()
  const products = includeAccessories ? [...showcase, ...accessories] : showcase
  return <section id="products" className="home-products" aria-label={translate("Our hardware")}>
    <div className="home-products-grid">
      {products.map((product) => <article className={`home-product home-product--${product.id}`} key={product.id}>
        <div className="home-product-copy">
          {showCategories && product.category && <p className="home-product-category">{translate(product.category)}</p>}
          <h2>{translate(product.name)}</h2>
          <p className="home-product-description">{translate(product.description)}</p>
          <a href={toHref(product.href)} className="home-product-link"><span className="home-product-link-label">{translate("Learn more")}</span><svg className="home-product-link-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m6 3.5 4.5 4.5L6 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
        </div>
        <a href={toHref(product.href)} className="home-product-visual" aria-label={translate(`Explore ${product.name}`)}>
          <OptimizedImage src={product.image} alt={translate(product.alt)} loading="lazy" decoding="async" />
        </a>
      </article>)}
    </div>
  </section>
}
