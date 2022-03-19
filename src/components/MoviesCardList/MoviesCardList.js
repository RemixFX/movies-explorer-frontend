import { useLocation } from 'react-router-dom';

function MoviesCardList({ component: Component, ...props }) {

  const location = useLocation();

  return (
    <section className="section-width movies-list">
      <div className="movies-list__grid">
        <Component {...props} />
      </div>
      <div className="movies-list__block-button">
        {location.pathname === '/movies' &&
        <button className="movies-list__button" type="button">Ещё</button>}
      </div>
    </section>
  )
}

export default MoviesCardList;
