import Header from "../Header/Header"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
import React from "react";
import { TEXT, CHECKBOX } from "../../utils/utils"

function Movies(props) {

  const [textInput, setTextInput] = React.useState('');
  const [checked, setChecked] = React.useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onFindMovies(textInput.toLowerCase(), checked)
  }

  function changeSearch(text) {
    setTextInput(text)
  }

  function changeCheckbox(value) {
    setChecked(value)
    localStorage.setItem(CHECKBOX, JSON.stringify(!checked))
    props.onSort(checked)
  }

  React.useEffect(() => {
    if (localStorage.text) {
      setTextInput(JSON.parse(localStorage.getItem(TEXT)))
    }
    if (localStorage.checkbox){
      setChecked(JSON.parse(localStorage.getItem(CHECKBOX)))
    }
  }, [])

  return (
    <>
      <Header loggedIn={props.loggedIn}/>
      <SearchForm
      handleSubmit={handleSubmit}
      checked={checked}
      textInput={textInput}
      changeSearch={changeSearch}
      changeCheckbox={changeCheckbox}
      onSort={props.onSort}
      searhErrorMessage={props.searhErrorMessage}
       />
      <MoviesCardList
        movies={props.movies}
        onButtonClick={props.onButtonClick}
        onMovieButtonClick={props.onMovieButtonClick}
        isStagedSavedMovies={props.isStagedSavedMovies}
        classMovieButton={'movies-card__like-button'}
        addButtonClassName={props.addButtonClassName} />
      < Preloader isLoading={props.isLoading}
        isEmptyResult={props.isEmptyResult}/>
      <Footer />
    </>
  )
}

export default Movies;
