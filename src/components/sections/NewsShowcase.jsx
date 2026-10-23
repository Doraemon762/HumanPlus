import { news } from '../../data/news'
import './NewsShowcase.css'

function Story({ item, featured = false }) {
  return <article className={`news-story ${featured ? 'news-story--featured' : ''}`}><div className="news-story-content">
    <div className="news-story-image"><img src={item.image} alt={item.title} loading="lazy" /></div>
    <div className="news-story-copy"><p className="news-story-category">{item.category}</p><h3>{item.title}</h3><p className="news-story-source">{item.publisher}</p><time dateTime={item.date}>{item.date}</time><a className="news-story-more" href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`Read more: ${item.title}`}>Read more <span aria-hidden="true">↗</span></a></div>
  </div></article>
}
export default function NewsShowcase({ standalone = false }) {
  return <section id="news" className={`news-showcase ${standalone ? 'news-showcase--page' : ''}`} aria-labelledby="news-showcase-title"><div className="news-showcase-inner">
    <header className="news-showcase-heading">{standalone ? <h1 id="news-showcase-title">News</h1> : <h2 id="news-showcase-title">News</h2>}{!standalone && <a href="#/news">View all <span aria-hidden="true">›</span></a>}</header>
    <Story item={news[0]} featured />
    <div className="news-story-grid">{news.slice(1).map(item => <Story item={item} key={item.id}/>)}</div>
  </div></section>
}
