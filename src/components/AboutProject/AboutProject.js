
function AboutProject() {
  return (
    <section id="about_project" className="section-width about-project">
      <h2 className="section-header about-project__header">О проекте</h2>
      <p className="about-project__tittle">Дипломный проект включал 5 этапов</p>
      <p className="about-project__description">
        Составление плана, работу над бэкендом, вёрстку,
        добавление функциональности и финальные доработки.
      </p>

      <p className="about-project__tittle">На выполнение диплома ушло 5 недель</p>
      <p className="about-project__description">
        У каждого этапа был мягкий и жёсткий дедлайн,
        которые нужно было соблюдать, чтобы успешно защититься.
      </p>
      <div className="about-project__digits">
        <div className="about-project__blocks about-project__digits_block_back-end">
          1 неделя</div>
        <span className="about-project__mark">Back-end</span>
        <div className="about-project__blocks about-project__digits_block_front-end">
          4 недели</div>
        <span className="about-project__mark">Front-end</span>
      </div>
    </section>
  )
}

export default AboutProject;
