import publications from '../../data/publications.json'
import './PublicationsSection.css'

const years = [...new Set(publications.map((paper) => paper.year))].sort((a, b) => b - a)

export default function PublicationsSection() {
  return (
    <section className="research-publications" aria-labelledby="publications-title">
      <div className="research-publications-inner">
        <header className="research-publications-header">
          <h2 id="publications-title">Publications</h2>
          <span>{publications.length} papers / 2017–2026</span>
        </header>
        <div className="research-publications-columns">
          {years.map((year) => {
            const papers = publications.filter((paper) => paper.year === year)
            return (
              <section className="research-publications-year" key={year} aria-labelledby={`publications-${year}`}>
                <h3 id={`publications-${year}`}>{year}</h3>
                <ul>
                  {papers.map((paper) => (
                    <li key={paper.title}>
                      <a href={paper.href} target="_blank" rel="noopener noreferrer">{paper.title}</a>
                      <p>{paper.venue}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      </div>
    </section>
  )
}
