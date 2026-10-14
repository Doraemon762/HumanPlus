import { useEffect } from 'react'

export default function useAboutMotion(pageRef) {
  useEffect(() => {
    const page = pageRef.current
    if (!page) return
    document.documentElement.classList.add('about-smooth-motion')

    const elements = page.querySelectorAll('.about-timeline-intro-copy > *, .research-editorial-left h2, .research-editorial-copy, .research-publications-header, .research-publications-columns')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        if (entry.target.classList.contains('research-publications-columns')) {
          // Follow visual rows across columns, not DOM column order.
          const papers = [...entry.target.querySelectorAll('li')]
            .map((node) => ({ node, top: node.getBoundingClientRect().top }))
            .sort((a, b) => a.top - b.top)
          let rowTop = -Infinity
          let row = -1
          papers.forEach(({ node, top }) => {
            if (top - rowTop > 24) { row += 1; rowTop = top }
            node.style.setProperty('--publication-delay', `${row * 90}ms`)
          })
        }
        if (entry.target.classList.contains('research-editorial-left') && entry.intersectionRatio < 0.85) return
        if (!entry.target.classList.contains('research-publications-columns') && entry.intersectionRatio < 0.3) return
        const revealed = entry.target.classList.contains('research-editorial-left')
          ? entry.target.querySelector('h2')
          : entry.target
        revealed?.classList.add('about-motion-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: [0, 0.3, 0.85], rootMargin: '0px' })
    elements.forEach((element) => {
      element.classList.add('about-motion-reveal')
      observer.observe(element.matches('.research-editorial-left h2') ? element.parentElement : element)
    })
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('about-smooth-motion')
      elements.forEach((element) => element.classList.remove('about-motion-reveal', 'about-motion-visible'))
    }
  }, [pageRef])
}
