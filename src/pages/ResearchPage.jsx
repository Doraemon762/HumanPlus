import PageHeader from '../components/layout/PageHeader'
import Reveal from '../components/ui/Reveal'
import ArticleRow from '../components/articles/ArticleRow'
import CtaLink from '../components/ui/CtaLink'
import { research } from '../data/research'

/* Research list — same full-width horizontal rows as the News page
   (shared ArticleRow), stacked top to bottom. Content comes straight
   from src/data/research.js: nothing added, removed or rewritten. */
export default function ResearchPage() {
  return (
    <>
      <PageHeader label="Research" title="Research" description="Research overview goes here." />

      <section className="py-[85px] md:py-[107px]">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="space-y-16 md:space-y-20">
            {research.map((item, i) => (
              <Reveal key={item.id} delay={i}>
                <ArticleRow
                  ordinal={item.ordinal}
                  meta={item.venue}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  ctaLabel="Learn More"
                  href={item.href}
                  mediaLabel="RESEARCH IMAGE"
                />
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
