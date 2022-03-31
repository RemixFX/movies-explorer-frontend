import Header from "../Header/Header"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer"
import React from "react";

function SavedMovies(props) {

  const [textInput, setTextInput] = React.useState('');
  const [checked, setChecked] = React.useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onFindMovies(textInput.toLowerCase())
  }

  function changeSearch(text) {
    setTextInput(text)
  }

  function changeCheckbox(value) {
    setChecked(value)
  }

  return (
    <>
      <Header />
      <SearchForm
        handleSubmit={handleSubmit}
        checked={checked}
        textInput={textInput}
        changeSearch={changeSearch}
        changeCheckbox={changeCheckbox}
      />
      <MoviesCardList
        movies={checked ? props.movies.filter(movie => movie.duration <= 40)
          : props.movies}
        onMovieButtonClick={props.onMovieButtonClick}
        classMovieButton="movies-card__delete-button" />
      <Footer />
    </>
  )
}

export default SavedMovies;
