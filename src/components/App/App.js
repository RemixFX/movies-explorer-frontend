/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"
import moviesApi from "../../utils/MoviesApi";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import Main from "../Main/Main"
import Movies from "../Movies/Movies"
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import mainApi from "../../utils/MainApi";

function App() {

  const [movies, setMovies] = React.useState([]);
  const [isSortMovies, setIsSortMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEmptyResult, setIsEmptyResult] = React.useState(false);
  const [isAddButtonClassName, setIsAddButtonClassName] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [infoMessage, setInfoMessage] = React.useState('');
  const [isSavedMovies, setIsSavedMovies] = React.useState([])
  const [isStagedSavedMovies, setIsStagedSavedMovies] = React.useState([])
  const localStorageMovies =
    localStorage.getItem('movies') !== null ? JSON.parse(localStorage.getItem('movies')) : []
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState({ _id: '', name: '', email: '' })

  // Правила отображения кнопки Ещё
  const changeClassButton = () => {
    movies.length === localStorageMovies.length
      || movies.length === isSortMovies.length ? setIsAddButtonClassName(false)
      : setIsAddButtonClassName(true)
  }

  // Проверка разрешения экрана для рендера списка фильмов
  const checkResize = (result, setter) => {
    if (window.innerWidth >= 1280) {
      setter(result.slice(0, 12));
    } else if (window.innerWidth <= 1279 && window.innerWidth > 480) {
      setter(result.slice(0, 8))
    } else if (window.innerWidth >= 320 && window.innerWidth <= 480) {
      setter(result.slice(0, 3))
    }
  }

  React.useEffect(() => {
    localStorage.movies ? checkResize(localStorageMovies, setMovies)
      : checkResize(movies, setMovies)
    getUserMovies()
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
      checkResize(sortedMovies, setMovies)
      return
    } if (checked) {
      setIsSortMovies([])
      checkResize(localStorageMovies, setMovies)
      return
    }
  }

  // Запрос на уже сохранённые фильмы
  const getUserMovies = () => {
    mainApi.getSavedMovies()
      .then((res) => {
        setIsSavedMovies(res)
        setIsStagedSavedMovies(res)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  // Фильтр по поиску
  function filterMovies(movie, textInput) {
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

  // Поиск фильмов на странцие "Фильмы"
  const findMovies = (textInput, checked) => {

    setIsSortMovies([])
    setIsLoading(true);
    moviesApi.getMovies()
      .then((result) => {
        return result.filter((movie) => filterMovies(movie, textInput))
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
        checkResize(result, setMovies)
      })

      .catch((err) => {
        console.log(err.message)
        setIsLoading(false)
      })
  }

  // Поиск фильмов на странцие "Сохраненные фильмы"
  const findSavedMovies = (textInput) => {
    textInput.length === 0 && getUserMovies()
    setIsSavedMovies(isStagedSavedMovies.filter((movie) => filterMovies(movie, textInput)))

  }

  // Слушатель изменения разрешения экрана с ограничением на вызов
  let resizeTimeout;
  window.onresize = function () {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(resizeHandler, 600);
  }

  // Обработчик изменения разрешения в зависимости: короткометражка или нет
  const resizeHandler = () => {
    if (isSortMovies.length > 0) {
      checkResize(isSortMovies, setMovies);
    } else {
      checkResize(localStorageMovies, setMovies)
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

  // Регистрация
  const handleRegister = (name, email, password) => {
    mainApi.register(name, email, password)
      .then(() => {
        handleLogin(email, password)
      })
      .catch((err) => {
        setInfoMessage(err.message)
      })
  }

  // Авторизация
  const handleLogin = (email, password) => {
    mainApi.authorize(email, password)
      .then((res) => {
        if (res.message === 'Успешный вход') {
          setLoggedIn(true)
          navigate('/movies')
        }
      })
      .catch((err) => {
        setInfoMessage(err.message)
      })
  }

  //Изменение данных профиля
  const handleUpdateProfile = (name, email) => {
    mainApi.patchUserData(name, email)
    .then((res) => setCurrentUser(res))
    .catch((err) => console.log(`Ошибка: ${err.message}`));
  }

  //Выход из профиля
  const handleLogout = () => {
    mainApi.logout()
    .then((res) => {
      console.log(res)
      setLoggedIn(false)
      navigate('signin')
    })
  }

  // Вызов проверки авторизации пользователя при входе на сайт
  React.useEffect(() => {
    mainApi.getUserData().then(res => {
      if (res) {
        setLoggedIn(true)
        navigate('/movies')
      }
    })
      .catch((err) => console.log(`Ошибка: ${err.message}`));
  }, []);

  // Сохранение данных профиля при авторизации
  React.useEffect(() => {
    if (loggedIn) {
      mainApi.getUserData().then(res => {
        setCurrentUser(res)
      })
        .catch((err) => {
          console.log(`Ошибка: ${err.message}`)
        })
    }
  }, [loggedIn]);

  // Функция назначения действия кнопки  в зависимости от состояния
  const handleMovieButtonClick = (movie, isLiked) => {
    isLiked ? removeFromFavorite(movie)
      : addToFavorite(movie)
  }

  // Функция кнопки, для сохранения фильма
  const addToFavorite = (movie) => {
    mainApi.saveMovies(movie)
      .then((res) => {
        setIsSavedMovies([...isSavedMovies, res])
        setIsStagedSavedMovies([...isStagedSavedMovies, res])
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.message}`)
      })
  }

  // Функция кнопки, для удаления фильма на странице "Фильмы"
  const removeFromFavorite = (movie) => {
    const forDelete = isSavedMovies.find((c) => c.movieId === movie.id)
    mainApi.deleteSavedMovie(forDelete._id)
      .then(() => {
        setIsSavedMovies((state) => state.filter((c) => c.movieId !== movie.id))
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.message}`)
      })
  }

  // Функция кнопки, для удаления фильма на странице "Сохраненные фильмы"
  const deleteMovie = (movie) => {
    mainApi.deleteSavedMovie(movie._id)
      .then(() => {
        setIsSavedMovies((state) => state.filter((c) => c !== movie))
        setIsStagedSavedMovies((state) => state.filter((c) => c !== movie))
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.message}`)
      })
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/movies" element={<Movies
            onFindMovies={findMovies}
            movies={movies}
            onButtonClick={addMoviesToList}
            onMovieButtonClick={handleMovieButtonClick}
            isLoading={isLoading}
            isEmptyResult={isEmptyResult}
            onSort={sortMovies}
            isSavedMovies={isSavedMovies}
            addButtonClassName={isAddButtonClassName === false
              ? 'movies-list__button_disabled' : ''} />}
          />
          <Route path="/saved-movies" element={<SavedMovies
            movies={isSavedMovies}
            onMovieButtonClick={deleteMovie}
            onFindMovies={findSavedMovies} />}
          />
          <Route path="/profile" element={<Profile
          onUpdateUser={handleUpdateProfile}
          onLogout={handleLogout} />}
          />
          <Route path="/signup" element={<Register onRegister={handleRegister}
            infoMessage={infoMessage} />} />
          <Route path="/signin" element={<Login onLogin={handleLogin}
            infoMessage={infoMessage} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App;
