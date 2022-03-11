function MoviesCardList({ component: Component, ...props }) {
  return(
    <section className="section-width movies-list">
      <div className="movies-list__grid">
       <Component {...props} />
      </div>
      <button className="movies-list__button" type="button">Ещё</button>
    </section>
  )
}

export default MoviesCardList;
