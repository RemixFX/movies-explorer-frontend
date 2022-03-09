import photo from "../../images/photo.jpg"

function AboutMe() {
  return (
    <section className="section-width about-me">
      <h2 className="section-header about-me__title">Студент</h2>
      <div className="about-me__flex-container">
        <div className="about-me__container">
          <p className="about-me__subtitle">Роман</p>
          <p className="about-me__paragraph">Фронтенд-разработчик, 21 год</p>
          <p className="about-me__text">
            Родился в Тольятти, сейчас живу в Московской области, город Подольск.
            До курсов обучения Веб-Разработчика, работал в сфере продаж.
            Сейчас же понял, что мне очень нравится кодить и неплохо получается
            быстро погрузиться в новые знания. Планирую разиваться в этой сфере
            на полную и искать соответствующую работу.
          </p>
          <ul className="about-me__links">
            <li className="about-me__list">
              <a className="about-me__link" href="https://www.facebook.com/"
                target="_blank" rel="noreferrer">Facebook</a>
            </li>
            <li className="about-me__link">
              <a className="about-me__link" href="https://github.com/RemixFX"
                target="_blank" rel="noreferrer">Github</a>
            </li>
          </ul>
        </div>
        <img className="about-me__photo" src={photo} alt="фото челика"></img>
      </div>
    </section>
  )
}

export default AboutMe;
