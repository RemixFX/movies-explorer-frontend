import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <ul className="navigation">
      <li className="navigation__buttons">
        <NavLink to="/movies" className="navigation__button navigation__movies">
          Фильмы</NavLink>
      </li>
      <li className="navigation__buttons">
        <NavLink to="/saved-movies" className="navigation__button navigation__saved-movies">
          Сохранённые фильмы</NavLink>
      </li>
    </ul>
  )
}

export default Navigation;
