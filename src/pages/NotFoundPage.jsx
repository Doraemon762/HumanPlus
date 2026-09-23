import PageHeader from '../components/layout/PageHeader'
import CtaLink from '../components/ui/CtaLink'

export default function NotFoundPage() {
  return (
    <>
      <PageHeader label="404" title="Page not found" description="The page you are looking for does not exist." />

      <section className="py-[85px] md:py-[107px]">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <CtaLink to="/">Back to Home</CtaLink>
        </div>
      </section>
    </>
  )
}
