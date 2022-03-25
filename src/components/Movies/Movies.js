import Header from "../Header/Header"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
import React from "react";

function Movies(props) {

  return (
    <>
      <Header />
      <SearchForm onFindMovies={props.onFindMovies} />
      <MoviesCardList
        movies={props.movies}
        onButtonClick={props.onButtonClick}
        onFavoriteClick={props.onFavoriteClick}
        classCardButton="movies-card__like-button" />
      < Preloader isLoading={props.isLoading}
        isEmptyResult={props.isEmptyResult}/>
      <Footer />
    </>
  )
}

export default Movies;
