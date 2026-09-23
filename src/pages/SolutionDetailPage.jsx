import PageHeader from '../components/layout/PageHeader'
import Reveal from '../components/ui/Reveal'
import MediaPlaceholder from '../components/ui/MediaPlaceholder'
import CtaLink from '../components/ui/CtaLink'
import { findSolution } from '../data/solutions'

/* Case study detail — shared by /solutions/<slug>. Placeholder only:
   no fabricated client content. */
export default function SolutionDetailPage({ id }) {
  const solution = findSolution(id)

  if (!solution) {
    return (
      <PageHeader label="Solutions" title="Case study not found" description="This case study does not exist yet." />
    )
  }

  return (
    <>
      <PageHeader label="Solutions" title={solution.name} description={solution.description} />

      <section className="py-[85px] md:py-[107px]">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <Reveal>
            <MediaPlaceholder label={`${solution.name.toUpperCase()} — IMAGE / VIDEO`} />
          </Reveal>

          <Reveal delay={1} className="mt-12 md:mt-16">
            <p className="max-w-2xl text-base leading-relaxed text-ink/70">Case study details go here.</p>
          </Reveal>

          <Reveal delay={2} className="mt-12 flex flex-wrap items-center gap-4 md:mt-16">
            <CtaLink to="/contact" variant="secondary">
              Contact Us
            </CtaLink>
            <CtaLink to="/solutions" variant="text">
              Back to Solutions
            </CtaLink>
          </Reveal>
        </div>
      </section>
    </>
  )
}
