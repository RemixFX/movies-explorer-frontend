import linkArrow from "../../images/link-arrow.svg"

function Portfolio() {
  return (
    <section className="section-width portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__list">
          <p className="portfolio__text">Статичный сайт</p>
          <a className="portfolio__link" href="https://github.com/RemixFX/how-to-learn"
            target="_blank" rel="noreferrer"><img className="portfolio__link-arrow"
              src={linkArrow} alt="стрелка" /></a>
        </li>
        <li className="portfolio__list">
          <p className="portfolio__text">Адаптивный сайт</p>
          <a className="portfolio__link" href="https://remixfx.github.io/russian-travel"
            target="_blank" rel="noreferrer"><img className="portfolio__link-arrow"
              src={linkArrow} alt="стрелка" /></a>
        </li>
        <li className="portfolio__list">
          <p className="portfolio__text">Одностраничное приложение</p>
          <a className="portfolio__link" href="https://insta-mesto.nomoredomains.work"
            target="_blank" rel="noreferrer"><img className="portfolio__link-arrow"
              src={linkArrow} alt="стрелка" /></a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
