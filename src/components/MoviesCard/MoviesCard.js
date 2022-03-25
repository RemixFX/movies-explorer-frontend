
function MoviesCard(props) {

  const duration = props.movie.duration;
  const durationMovie =
    duration < 60 ? `${duration}м` : `${Math.trunc(duration / 60)}ч ${duration % 60}м`


  return (
    <>
      <article className="movies-card">
        <a href={props.movie.trailerLink} target="_blank" rel="noreferrer">
          <img className="movies-card__image"
            src={`https://api.nomoreparties.co${props.movie.image.url}`}
            alt={props.movie.name} /> </a>
        <div className="movies-card__container">
          <h3 className="movies-card__name">{props.movie.nameRU}</h3>
          <button className={props.classCardButton} onClick={props.onFavoriteClick}
           type="button"></button>
        </div>
        <p className="movies-card__time-duration">
          {durationMovie}</p>
      </article>
    </>
  )
}

export default MoviesCard;
