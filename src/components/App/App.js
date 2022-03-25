import React from "react";
import moviesApi from "../../utils/MoviesApi";
import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import Main from "../Main/Main"
import Movies from "../Movies/Movies"
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {

  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEmptyResult, setIsEmptyResult] = React.useState(false);

  React.useEffect(() => {
    checkResize()
  }, [])

  // Проверка разрешения экрана для формирования списка фильмов
  const checkResize = () => {
    const savedMovies = JSON.parse(localStorage.getItem('movies'));
    if (window.innerWidth >= 1280) {
      setMovies(savedMovies.slice(0, 12));
    } else if (window.innerWidth <= 1279 && window.innerWidth > 480) {
      setMovies(savedMovies.slice(0, 8))
    } else if (window.innerWidth >= 320 && window.innerWidth <= 480) {
      setMovies(savedMovies.slice(0, 5))
    }
  }

  // Показ сообщения, если фильмы не найдены
  const showPreloaderMessage = () => {
    setIsEmptyResult(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsEmptyResult(false)
    }, 2000)
  }

  // Поиск фильмов
  const findMovies = (textInput) => {
    function filterMovies(movie) {
      if (movie.nameRU.toLowerCase().includes(textInput)) {
        return true
      } else if (String(movie.nameEN).toLowerCase().includes(textInput)) {
        return true
      } else if (movie.description.toLowerCase().includes(textInput)) {
        return true
      } else if (String(movie.country).toLowerCase().includes(textInput)) {
        return true
      } else if (String(movie.director).toLowerCase().includes(textInput)) {
        return true
      }
      return
    }
    setIsLoading(true);
    moviesApi.getMovies()
      .then((result) => {
        return result.filter(filterMovies)
      })
      .then((result) => {
        localStorage.setItem('movies', JSON.stringify(result))
        if (result.length === 0) {
          showPreloaderMessage()
        } else {
          setIsLoading(false)
        }
      })
      .then(() => {
        checkResize()
      })

      .catch((err) => {
        console.log(err.message)
        setIsLoading(false)
      })
  }

  // Слушатель изменения разрешения экрана с лимитом
  const resizeLimiter = () => setTimeout(checkResize, 2000);
  window.addEventListener("resize", resizeLimiter)

  // Добавление фильмов в список кнопкой "Ещё"
  const addMoviesToList = () => {
    const localStorageMovies = JSON.parse(localStorage.getItem('movies'));
    let n
    if (window.innerWidth >= 1280) {
      n = 3
    } else if (window.innerWidth < 1280) {
      n = 2
    }
    for (let i = movies.length; i < (movies.length + n); i++) {
      if (localStorageMovies[i] === undefined) {
        return
      } else {
        setMovies((movies) => [...movies, localStorageMovies[i]])
      }
    }
  }

  const favorite = () => setIsLoading(true)

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies
          onFindMovies={findMovies}
          movies={movies}
          onButtonClick={addMoviesToList}
          onFavoriteClick={favorite}
          isLoading={isLoading}
          isEmptyResult={isEmptyResult} />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;
