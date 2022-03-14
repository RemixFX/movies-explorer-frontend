function MoviesCardList({ component: Component, ...props }) {

  return (
    <section className="section-width movies-list">
      <div className="movies-list__grid">
        <Component {...props} />
      </div>
      <div className="movies-list__block-button">
        <button className="movies-list__button" type="button">Ещё</button>
      </div>
    </section>
  )
}

export default MoviesCardList;
