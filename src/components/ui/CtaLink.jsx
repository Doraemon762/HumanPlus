import { toHref } from '../../hooks/useHashRoute'

const VARIANTS = {
  /* Brand-blue pill — the primary CTA of the whole site */
  primary: 'bg-brand text-white hover:bg-brandDeep',
  /* Hairline outline — secondary actions, never competes with primary */
  secondary: 'border border-black/15 text-ink hover:border-brandLine hover:text-brand',
  /* Text-only link with arrow — used inside sections */
  text: 'text-brand hover:text-brandDeep px-0',
}

/**
 * One CTA component for the whole site so every button shares the same
 * pill geometry, font weight and 300ms colour transition (design system
 * §4: Button Style). `to` is a ROUTE path, not an anchor.
 */
export default function CtaLink({ to, children, variant = 'primary', withArrow = true, className = '' }) {
  const padded = variant === 'text' ? '' : 'px-6 py-2.5'
  return (
    <a
      href={toHref(to)}
      className={`group inline-flex items-center gap-2 rounded-full text-sm font-semibold transition-colors duration-300 focus-visible:ring-1 focus-visible:ring-brandLine ${padded} ${VARIANTS[variant]} ${className}`}
    >
      {children}
      {withArrow && (
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-[3px]">
          →
        </span>
      )}
    </a>
  )
}
