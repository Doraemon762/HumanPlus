import { useState } from 'react'

/* Web3Forms key — pulled from a Vite env var so the real key is never
   hard-coded in source or committed. See .env.example for setup. */
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? ''
const IS_CONFIGURED =
  ACCESS_KEY.trim().length > 0 && ACCESS_KEY !== 'your_web3forms_access_key_here'

const INQUIRY_OPTIONS = [
  'Product & Purchase',
  'Research Collaboration',
  'Data Collection',
  'Other',
]
const PRODUCT_INTEREST_OPTIONS = [
  'Weave',
  'Pulse',
  'Glove-0',
  'Vision-0',
  'Not sure yet',
]
const QUANTITY_OPTIONS = ['1–10', '10–50', '50–100', '100+', 'Not sure yet']

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Field({ label, required, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-mono uppercase tracking-[0.22em] text-mute">
        {label}
        {required && <span className="ml-1 text-brand">*</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-[#b42318]">{error}</span>}
    </label>
  )
}

const inputCls =
  'w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-mute/60 outline-none transition-colors duration-200 focus:border-brandLine focus:bg-white'

function SelectField({ label, required, error, placeholder, options, value, onChange }) {
  return (
    <Field label={label} required={required} error={error}>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className={`${inputCls} appearance-none pr-10 ${value ? 'text-ink' : 'text-mute/60'}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="text-ink">
              {o}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-mute"
        >
          ▾
        </span>
      </div>
    </Field>
  )
}

export default function ContactForm() {
  const [form, setForm] = useState({
    fullName: '',
    workEmail: '',
    company: '',
    country: '',
    interestedIn: '',
    inquiry: '',
    estimatedQuantity: '',
    projectDetails: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  function update(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  }

  function validate(v) {
    const e = {}
    if (!v.fullName.trim()) e.fullName = 'Please enter your full name.'
    if (!v.workEmail.trim()) e.workEmail = 'Please enter your work email.'
    else if (!EMAIL_RE.test(v.workEmail)) e.workEmail = 'Please enter a valid email address.'
    if (!v.interestedIn) e.interestedIn = 'Please select what you are interested in.'
    if (!v.inquiry) e.inquiry = 'Please select an inquiry type.'
    if (!v.projectDetails.trim()) e.projectDetails = 'Please tell us about your needs.'
    return e
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate(form)
    setErrors(e)
    if (Object.keys(e).length) return

    setStatus('sending')
    const payload = {
      access_key: ACCESS_KEY,
      subject: `New inquiry — ${form.inquiry} — ${form.fullName}`,
      from_name: 'HumanPlus Website',
      botcheck: '',
      'Full Name': form.fullName,
      'Work Email': form.workEmail,
      'Company / Institution': form.company,
      'Country / Region': form.country,
      'What are you interested in?': form.interestedIn,
      'Inquiry Type': form.inquiry,
      'Estimated Quantity': form.estimatedQuantity,
      'Project Details': form.projectDetails,
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      setStatus(data.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  function reset() {
    setForm({
      fullName: '',
      workEmail: '',
      company: '',
      country: '',
      interestedIn: '',
      inquiry: '',
      estimatedQuantity: '',
      projectDetails: '',
    })
    setErrors({})
    setStatus('idle')
  }

  if (status === 'success') {
    return (
      <div className="fade-in-up rounded-[24px] border border-line bg-white p-10 text-center shadow-[0_30px_80px_-40px_rgba(17,17,17,0.18)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="mt-5 font-black tracking-tight text-ink text-2xl">
          Thank you for reaching out.
        </h3>
        <p className="mt-3 leading-relaxed text-ink/70">
          Your message has been sent successfully.
          <br />
          We'll get back to you soon.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-7 text-sm font-semibold text-brand transition-colors hover:text-brandDeep"
        >
          Send another inquiry
        </button>
      </div>
    )
  }

  const sending = status === 'sending'
  const showPurchase = form.inquiry === 'Product & Purchase'

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[24px] border border-line bg-white p-8 shadow-[0_30px_80px_-40px_rgba(17,17,17,0.18)] md:p-10"
    >
      {status === 'error' && (
        <div className="mb-8 rounded-xl border border-[#b42318]/30 bg-[#b42318]/5 px-4 py-3 text-sm text-[#b42318]">
          Something went wrong. Please try again.
        </div>
      )}
      {!IS_CONFIGURED && (
        <div className="mb-8 rounded-xl border border-brandLine/40 bg-brandSoft px-4 py-3 text-sm text-ink/70">
          Demo mode: add your Web3Forms access key in{' '}
          <code className="font-mono text-brand">.env</code> (
          <code className="font-mono text-brand">VITE_WEB3FORMS_ACCESS_KEY</code>) to enable live
          email delivery.
        </div>
      )}

      {/* ── Contact Details ── */}
      <div className="border-b border-line pb-8">
        <h3 className="text-xs font-mono uppercase tracking-[0.28em] text-mute">Contact Details</h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Field label="Full Name" required error={errors.fullName}>
            <input
              className={inputCls}
              value={form.fullName}
              onChange={update('fullName')}
              placeholder="Jane Doe"
            />
          </Field>
          <Field label="Work Email" required error={errors.workEmail}>
            <input
              type="email"
              className={inputCls}
              value={form.workEmail}
              onChange={update('workEmail')}
              placeholder="jane@company.com"
            />
          </Field>
          <Field label="Company / Institution" error={errors.company}>
            <input
              className={inputCls}
              value={form.company}
              onChange={update('company')}
              placeholder="Company / University"
            />
          </Field>
          <Field label="Country / Region" error={errors.country}>
            <input
              className={inputCls}
              value={form.country}
              onChange={update('country')}
              placeholder="e.g. China"
            />
          </Field>
        </div>
      </div>

      {/* ── Inquiry ── */}
      <div className="border-b border-line py-8">
        <h3 className="text-xs font-mono uppercase tracking-[0.28em] text-mute">Inquiry</h3>
        <div className="mt-6 space-y-6">
          <SelectField
            label="What are you interested in?"
            required
            error={errors.interestedIn}
            placeholder="Select a product"
            options={PRODUCT_INTEREST_OPTIONS}
            value={form.interestedIn}
            onChange={update('interestedIn')}
          />
          <SelectField
            label="What can we help you with?"
            required
            error={errors.inquiry}
            placeholder="Select an option"
            options={INQUIRY_OPTIONS}
            value={form.inquiry}
            onChange={update('inquiry')}
          />
          {/* Dynamic purchase fields — smooth expand/collapse via .accordion-body */}
          <div className={`accordion-body ${showPurchase ? 'open' : ''}`}>
            <div>
              <div className="pt-6">
                <SelectField
                  label="Estimated Quantity"
                  placeholder="Select quantity"
                  options={QUANTITY_OPTIONS}
                  value={form.estimatedQuantity}
                  onChange={update('estimatedQuantity')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Project Details ── */}
      <div className="pt-8">
        <Field label="Project Details" required error={errors.projectDetails}>
          <textarea
            rows={6}
            className={`${inputCls} resize-y leading-relaxed`}
            value={form.projectDetails}
            onChange={update('projectDetails')}
            placeholder="Tell us about your needs..."
          />
        </Field>
      </div>

      {/* ── Submit ── */}
      <div className="mt-8 flex items-center">
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand disabled:cursor-not-allowed disabled:opacity-60 focus-visible:ring-1 focus-visible:ring-brandLine"
        >
          {sending ? 'Sending…' : 'Submit Inquiry'}
          {!sending && (
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-[3px]"
            >
              →
            </span>
          )}
        </button>
      </div>
    </form>
  )
}
