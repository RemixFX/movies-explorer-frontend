import { useLocation } from 'react-router-dom';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {

  const location = useLocation();
  const cardAddButtonClassName = (
    props.movies.length === JSON.parse(localStorage.getItem('movies')).length
      ? 'movies-list__button_disabled'
      : 'movies-list__button'
  );
  return (
    <section className="section-width movies-list">
      <div className="movies-list__grid">
        {props.movies.map((movie) =>
          <MoviesCard movie={movie} key={movie.id}
            classCardButton={props.classCardButton}
            onFavoriteClick={props.onFavoriteClick} />
        )}
      </div>
      <div className="movies-list__block-button">
        {location.pathname === '/movies' &&
          <button className={cardAddButtonClassName} type="button"
            onClick={props.onButtonClick}>Ещё</button>}
      </div>
    </section>
  )
}

export default MoviesCardList;
