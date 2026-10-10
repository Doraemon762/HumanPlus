const DATASET_URL = 'https://humanplus-ai.github.io/HumanPlus1000.github.io/'

export default function DatasetPage() {
  return (
    <section className="h-[100dvh] w-full bg-white pt-16" aria-label="HumanPlus1000 dataset">
      <iframe
        title="HumanPlus1000 dataset"
        src={DATASET_URL}
        className="block h-full w-full border-0 bg-white"
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </section>
  )
}
