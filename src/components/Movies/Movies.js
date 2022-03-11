import Header from "../Header/Header"
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer"

function Movies() {
  return(
    <>
    <Header />
    <SearchForm />
    <MoviesCardList component={MoviesCard} />
    <Footer />
    </>
  )
}

export default Movies;
