import PageHeader from '../components/layout/PageHeader'
import Reveal from '../components/ui/Reveal'
import CtaLink from '../components/ui/CtaLink'

/* ⚠️ No invented email / phone / address / WeChat. The details block is
   an explicit placeholder until real contact information is supplied. */
export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        title="Contact"
        description="Interested in our products or solutions? Business inquiries are welcome."
      />

      <section className="py-[85px] md:py-[107px]">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_0.8fr] lg:gap-16 lg:px-10">
          <Reveal>
            <h2 className="text-xl font-semibold tracking-tight text-ink">Business Inquiries</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/70">
              Contact introduction goes here.
            </p>
            <div className="mt-10">
              <CtaLink to="/products">Explore Products</CtaLink>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="rounded-[20px] border border-black/10 bg-paper2 p-8">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-mute">Contact Details</span>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">
                Contact details go here — email, phone and address will be added once provided.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
