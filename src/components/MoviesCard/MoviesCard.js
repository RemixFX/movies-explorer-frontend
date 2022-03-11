import film from "../../images/film.jpg"

function MoviesCard() {
  return (
    <><article className="movies-card">
      <img className="movies-card__image" src={film} alt="" />
      <div className="movies-card__container">
        <h3 className="movies-card__name">Одинокий рейнджер</h3>
        <button className="movies-card__like-button" type="button"></button>
      </div>
      <p className="movies-card__time-duration">1ч 37м</p>
    </article><article className="movies-card">
        <img className="movies-card__image" src={film} alt="" />
        <div className="movies-card__container">
          <h3 className="movies-card__name">Одинокий рейнджер</h3>
          <button className="movies-card__like-button" type="button"></button>
        </div>
        <p className="movies-card__time-duration">1ч 37м</p>
      </article><article className="movies-card">
        <img className="movies-card__image" src={film} alt="" />
        <div className="movies-card__container">
          <h3 className="movies-card__name">Одинокий рейнджер</h3>
          <button className="movies-card__like-button" type="button"></button>
        </div>
        <p className="movies-card__time-duration">1ч 37м</p>
      </article><article className="movies-card">
        <img className="movies-card__image" src={film} alt="" />
        <div className="movies-card__container">
          <h3 className="movies-card__name">Одинокий рейнджер</h3>
          <button className="movies-card__like-button" type="button"></button>
        </div>
        <p className="movies-card__time-duration">1ч 37м</p>
      </article><article className="movies-card">
        <img className="movies-card__image" src={film} alt="" />
        <div className="movies-card__container">
          <h3 className="movies-card__name">Одинокий рейнджер</h3>
          <button className="movies-card__like-button" type="button"></button>
        </div>
        <p className="movies-card__time-duration">1ч 37м</p>
      </article><article className="movies-card">
        <img className="movies-card__image" src={film} alt="" />
        <div className="movies-card__container">
          <h3 className="movies-card__name">Одинокий рейнджер</h3>
          <button className="movies-card__like-button" type="button"></button>
        </div>
        <p className="movies-card__time-duration">1ч 37м</p>
      </article></>
  )
}

export default MoviesCard;
