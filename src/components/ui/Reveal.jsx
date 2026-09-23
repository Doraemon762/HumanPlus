import useReveal from '../../hooks/useReveal'

/**
 * Scroll-reveal wrapper. Renders any tag; cascades via delay steps 0–4
 * (0.1s each), matching the HumanPlus-1000 reveal system.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, inView] = useReveal()
  const classes = ['reveal', delay > 0 ? `reveal-delay-${delay}` : '', inView ? 'in' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  )
}
