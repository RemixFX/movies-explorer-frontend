import { NavLink, Link } from 'react-router-dom';
import profileLogo from '../../images/profile-logo.svg'

function Navigation() {
  return (
    <ul className="navigation">
      <li className='navigation__buttons'>
        <NavLink to="/" className="navigation__button navigation__main">
          Главная</NavLink>
      </li>
      <li className="navigation__buttons">
        <NavLink to="/movies" className="navigation__button navigation__movies">
          Фильмы</NavLink>
      </li>
      <li className="navigation__buttons">
        <NavLink to="/saved-movies" className="navigation__button navigation__saved-movies">
          Сохранённые фильмы</NavLink>
      </li>
      <li className='navigation__buttons'>
        <Link to="/profile" className='navigation__profile'>
          <span className='navigation__profile-text'>Аккаунт</span>
          <img className='navigation__profile-logo' src={profileLogo} alt="" />
        </Link>
      </li>
    </ul>
  )
}

export default Navigation;
