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
import { MOVIES, CHECKBOX, TEXT, SORTED_MOVIES } from "../../utils/utils"
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {

  const [movies, setMovies] = React.useState([]);
  const [isSortMovies, setIsSortMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEmptyResult, setIsEmptyResult] = React.useState(false);
  const [isAddButtonClassName, setIsAddButtonClassName] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(undefined);
  const [infoMessage, setInfoMessage] = React.useState('');
  const [isSavedMovies, setIsSavedMovies] = React.useState([])
  const [isStagedSavedMovies, setIsStagedSavedMovies] = React.useState([])
  const [searhErrorMessage, setSearhErrorMessage] = React.useState('')
  const localStorageMovies =
    localStorage.getItem(MOVIES) !== null ? JSON.parse(localStorage.getItem(MOVIES)) : []
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState({ _id: '', name: '', email: '' })

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
    getUserMovies()
    if (localStorage.getItem(SORTED_MOVIES) !== null) {
      checkResize(JSON.parse(localStorage.getItem(SORTED_MOVIES)))
      return
    }
    if (localStorage.getItem(MOVIES) !== null) {
      checkResize(localStorageMovies)
    } else {
      checkResize(movies)
    }
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
    console.log(checked)
    if (!checked) {
      const sortedMovies = localStorageMovies.filter((movie) => movie.duration <= 40)
      setIsSortMovies(sortedMovies)
      localStorage.setItem(SORTED_MOVIES, JSON.stringify(sortedMovies))
      checkResize(sortedMovies)
      console.log(sortedMovies)
      return
    } if (checked) {
      localStorage.removeItem(SORTED_MOVIES)
      setIsSortMovies([])
      checkResize(localStorageMovies)
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
    if (textInput.length === 0) {
      setSearhErrorMessage('Нужно ввести ключевое слово')
      return
    } else {
      setSearhErrorMessage('')
    }
    localStorage.removeItem(SORTED_MOVIES)
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
        localStorage.setItem(MOVIES, JSON.stringify(result))
        localStorage.setItem(CHECKBOX, JSON.stringify(checked))
        localStorage.setItem(TEXT, JSON.stringify(textInput))
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

  // Регистрация
  const handleRegister = (userData) => {
    mainApi.register(userData)
      .then(() => {
        handleLogin(userData)
      })
      .catch((err) => {
        setInfoMessage(err.message)
        setTimeout(() => setInfoMessage(''), 7000)
      })
  }

  // Авторизация
  const handleLogin = (userData) => {
    mainApi.authorize(userData)
      .then((res) => {
        if (res.message === 'Успешный вход') {
          setLoggedIn(true)
          navigate('/movies')
        }
      })
      .catch((err) => {
        setInfoMessage(err.message)
        setTimeout(() => setInfoMessage(''), 7000)
      })
  }

  //Изменение данных профиля
  const handleUpdateProfile = (userData) => {
    mainApi.patchUserData(userData)
      .then((res) => {
        setCurrentUser(res)
        setInfoMessage('Данные успешно изменены')
        setTimeout(() => setInfoMessage(''), 7000)
      })
      .catch((err) => {
        setInfoMessage(err.message)
        setTimeout(() => setInfoMessage(''), 7000)
      })
  }

  //Выход из профиля
  const handleLogout = () => {
    mainApi.logout()
      .then((res) => {
        console.log(res)
        setLoggedIn(false)
        navigate('/')
      })
  }

  // Вызов проверки авторизации пользователя при входе на сайт
  React.useEffect(() => {
    mainApi.getUserData()
      .then(res => {
        setLoggedIn(true)
        //        navigate('/movies')
      })
      .catch((err) => console.log(`Ошибка: ${err.message}`));
  }, []);

  // Сохранение данных профиля при авторизации
  React.useEffect(() => {
    if (loggedIn === true) {
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
          <Route exact path="/" element={<Main loggedIn={loggedIn} />} />

          <Route path="/movies" element={<ProtectedRoute
            component={Movies}
            loggedIn={loggedIn}
            onFindMovies={findMovies}
            movies={movies}
            onButtonClick={addMoviesToList}
            onMovieButtonClick={handleMovieButtonClick}
            isLoading={isLoading}
            isEmptyResult={isEmptyResult}
            onSort={sortMovies}
            isSavedMovies={isSavedMovies}
            searhErrorMessage={searhErrorMessage}
            addButtonClassName={isAddButtonClassName === false
              ? 'movies-list__button_disabled' : ''} />}
          />
          <Route path="/saved-movies" element={<ProtectedRoute
            component={SavedMovies}
            loggedIn={loggedIn}
            movies={isSavedMovies}
            onMovieButtonClick={deleteMovie}
            onFindMovies={findSavedMovies} />}
          />
          <Route path="/profile" element={<ProtectedRoute
            component={Profile}
            loggedIn={loggedIn}
            onUpdateUser={handleUpdateProfile}
            onLogout={handleLogout}
            profileInfoMessage={infoMessage} />}
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
