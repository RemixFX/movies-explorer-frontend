import film from "../../images/film.jpg"

function MoviesCard(props) {
  return (
    <><article className="movies-card">
      <img className="movies-card__image" src={film} alt="два человека идут по пустыне" />
      <div className="movies-card__container">
        <h3 className="movies-card__name">Одинокий рейнджер</h3>
        <button className={props.classCardButton} type="button"></button>
      </div>
      <p className="movies-card__time-duration">1ч 37м</p>
    </article><article className="movies-card">
        <img className="movies-card__image" src={film} alt="два человека идут по пустыне" />
        <div className="movies-card__container">
          <h3 className="movies-card__name">Одинокий рейнджер</h3>
          <button className={props.classCardButton} type="button"></button>
        </div>
        <p className="movies-card__time-duration">1ч 37м</p>
      </article><article className="movies-card">
        <img className="movies-card__image" src={film} alt="два человека идут по пустыне" />
        <div className="movies-card__container">
          <h3 className="movies-card__name">Одинокий рейнджер</h3>
          <button className={props.classCardButton} type="button"></button>
        </div>
        <p className="movies-card__time-duration">1ч 37м</p>
      </article><article className="movies-card">
        <img className="movies-card__image" src={film} alt="два человека идут по пустыне" />
        <div className="movies-card__container">
          <h3 className="movies-card__name">Одинокий рейнджер</h3>
          <button className={props.classCardButton} type="button"></button>
        </div>
        <p className="movies-card__time-duration">1ч 37м</p>
      </article><article className="movies-card">
        <img className="movies-card__image" src={film} alt="два человека идут по пустыне" />
        <div className="movies-card__container">
          <h3 className="movies-card__name">Одинокий рейнджер</h3>
          <button className={props.classCardButton} type="button"></button>
        </div>
        <p className="movies-card__time-duration">1ч 37м</p>
      </article><article className="movies-card">
        <img className="movies-card__image" src={film} alt="два человека идут по пустыне" />
        <div className="movies-card__container">
          <h3 className="movies-card__name">Одинокий рейнджер</h3>
          <button className={props.classCardButton} type="button"></button>
        </div>
        <p className="movies-card__time-duration">1ч 37м</p>
      </article></>
  )
}

export default MoviesCard;
