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
//import { localStorageMovies } from "../../utils/utils"

function App() {

  const [movies, setMovies] = React.useState([]);
  const [isSortMovies, setIsSortMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEmptyResult, setIsEmptyResult] = React.useState(false);
  const [isAddButtonClassName, setIsAddButtonClassName] = React.useState(true)
  const localStorageMovies = JSON.parse(localStorage.getItem('movies'));

  // Правила отображения кнопки Ещё
  const changeClassButton = () => {
    movies.length === localStorageMovies.length
    || movies.length === isSortMovies.length ? setIsAddButtonClassName(false)
    : setIsAddButtonClassName(true)
  }

  // Проверка разрешения экрана для рендера списка фильмов
  const checkResize = (result) => {

    if (window.innerWidth >= 1280) {
      setMovies(result.slice(0, 12));
    } else if (window.innerWidth <= 1279 && window.innerWidth > 480) {
      setMovies(result.slice(0, 8))
    } else if (window.innerWidth >= 320 && window.innerWidth <= 480) {
      setMovies(result.slice(0, 3))
    }
  }

  React.useEffect(() => {
    localStorage.movies ? checkResize(localStorageMovies)
      : checkResize(movies)
  }, [])

  React.useEffect(() => {
    changeClassButton()
  }, [movies])

  // Показ сообщения, если фильмы не найдены
  const showPreloaderMessage = () => {
    setIsEmptyResult(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsEmptyResult(false)
    }, 1800)
  }

  //Сортировка результатов поиска по короткометражкам
  const sortMovies = (checked) => {
    if (!checked) {
      const sortedMovies = localStorageMovies.filter((movie) => movie.duration <= 40)
      setIsSortMovies(sortedMovies)
      checkResize(sortedMovies)
      return
    } if (checked) {
      setIsSortMovies([])
      checkResize(localStorageMovies)
      return
    }
  }

  // Поиск фильмов
  const findMovies = (textInput, checked) => {
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

    setIsSortMovies([])
    setIsLoading(true);
    moviesApi.getMovies()
      .then((result) => {
       return result.filter(filterMovies)
      })
      .then((result) => {
        if (checked) {
          return result.filter((movie) => movie.duration <= 40)
        } else {
          return result
        }
       })
      .then((result) => {
        localStorage.setItem('movies', JSON.stringify(result))
        localStorage.setItem('checkbox', JSON.stringify(checked))
        localStorage.setItem('text', JSON.stringify(textInput))
        if (result.length === 0) {
          showPreloaderMessage()
        } else {
          setIsLoading(false)
        }
        return result
      })
      .then((result) => {

        checkResize(result)
      })

      .catch((err) => {
        console.log(err.message)
        setIsLoading(false)
      })
  }

  // Слушатель изменения разрешения экрана с ограничением на вызов
  let resizeTimeout;
  window.onresize = function () {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(resizeHandler, 600);
  }

  // Обработчик изменения разрешения в зависимости: короткометражка или нет
  function resizeHandler() {
    if (isSortMovies.length > 0) {
      checkResize(isSortMovies);
    } else {
      checkResize(localStorageMovies)
    }
  }

  // Добавление фильмов в список кнопкой "Ещё"
  const addMoviesToList = () => {
    let arr;
    if (isSortMovies.length > 0) {
      arr = isSortMovies
    } else {
      arr = localStorageMovies
    }
    let n
    if (window.innerWidth >= 1280) {
      n = 3
    } else if (window.innerWidth < 1280) {
      n = 2
    }
    for (let i = movies.length; i < (movies.length + n); i++) {
      if (arr[i] === undefined) {
        return
      } else {
        setMovies((movies) => [...movies, arr[i]])
      }
    }
  }

  const favorite = () => console.log('inputs')

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
          isEmptyResult={isEmptyResult}
          onSort={sortMovies}
          cardAddButtonClassName={isAddButtonClassName === false ? 'movies-list__button_disabled'
          : ''} />} />

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
