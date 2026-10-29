import {translate, useSiteLanguage} from '../../i18n'
import OptimizedImage from '../ui/OptimizedImage'
import { news } from '../../data/news'
import './NewsShowcase.css'

function Story({ item, featured = false }) {
  useSiteLanguage()
  return <article className={`news-story ${featured ? 'news-story--featured' : ''}`}><div className="news-story-content">
    <div className="news-story-image"><OptimizedImage src={item.image} alt={translate(item.title)} loading="lazy" /></div>
    <div className="news-story-copy"><p className="news-story-category">{translate(item.category)}</p><h3>{translate(item.title)}</h3><p className="news-story-source">{translate(item.publisher)}</p><time dateTime={item.date}>{translate(item.date)}</time><a className="news-story-more" href={item.href} target="_blank" rel="noopener noreferrer" aria-label={translate(`Read more: ${item.title}`)}>{translate("Read more ")}<span aria-hidden="true">{translate("↗")}</span></a></div>
  </div></article>
}
export default function NewsShowcase({ standalone = false }) {
  useSiteLanguage()
  return <section id="news" className={`news-showcase ${standalone ? 'news-showcase--page' : ''}`} aria-labelledby="news-showcase-title"><div className="news-showcase-inner">
    <header className="news-showcase-heading">{translate(standalone ? <h1 id="news-showcase-title">{translate("News")}</h1> : <h2 id="news-showcase-title">{translate("News")}</h2>)}{!standalone && <a href="#/news">{translate("View all ")}<span aria-hidden="true">{translate("›")}</span></a>}</header>
    <Story item={news[0]} featured />
    <div className="news-story-grid">{news.slice(1).map(item => <Story item={item} key={item.id}/>)}</div>
  </div></section>
}
