import { useLocation } from 'react-router-dom';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {

  const location = useLocation();


  return (
    <section className="section-width movies-list">
      <div className="movies-list__grid">
        {props.movies.map((movie) =>
          <MoviesCard movie={movie} key={movie.id || movie.movieId}
            onMovieButtonClick={props.onMovieButtonClick}
            isSavedMovies={props.isSavedMovies}
            classMovieButton={props.classMovieButton}
             />
        )}
      </div>
      <div className="movies-list__block-button">
        {location.pathname === '/movies' &&
          <button className={`movies-list__button ${props.addButtonClassName}`}
           type="button" onClick={props.onButtonClick}>Ещё</button>}
      </div>
    </section>
  )
}

export default MoviesCardList;
