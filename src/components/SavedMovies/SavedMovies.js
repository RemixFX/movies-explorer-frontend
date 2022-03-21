import Header from "../Header/Header"
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer"

function SavedMovies() {
  return(
    <>
    <Header />
    <SearchForm />
    <MoviesCardList component={MoviesCard}
    classCardButton="movies-card__delete-button" />
    <Footer />
    </>
  )
}

export default SavedMovies;
