import PageHeader from '../components/layout/PageHeader'
import Reveal from '../components/ui/Reveal'
import CtaLink from '../components/ui/CtaLink'

/* Solutions landing — the dropdown and all case-study sub-pages
   (SOP / Laplace / Luyan / Yamaha) were removed; this route stays as the
   Solutions entry point. Placeholder copy only — no fabricated content. */
export default function SolutionsPage() {
  return (
    <>
      <PageHeader label="Solutions" title="Solutions" description="Solutions overview goes here." />

      <section className="py-[85px] md:py-[107px]">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <Reveal delay={1}>
            <CtaLink to="/contact">Contact Us</CtaLink>
          </Reveal>
        </div>
      </section>
    </>
  )
}
