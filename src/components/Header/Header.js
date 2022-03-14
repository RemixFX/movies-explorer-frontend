import logo from '../../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import profileLogo from '../../images/profile-logo.svg'

function Header() {

  const location = useLocation();

  return (
    <header className={`${location.pathname === '/' ? 'header' : 'header_background_black'}`}>
      <div className='section-width header__container'>
        <a className='header__logo-link' href="#about_project">
          <img className='header__logo' src={logo} alt='логотип зеленый круг' /> </a>
        {location.pathname === '/' ? <div className='header__buttons'>
          <Link to="/signup" className='header__button-register'>Регистрация</Link>
          <Link to="/signin" className='header__button-login'>Войти</Link>
        </div> :
          <div className='header__buttons'>
            <Navigation />
            <Link to="/profile" className='header__profile'>
              <span className='header__profile-text'>Аккаунт</span>
              <img className='header__profile-logo' src={profileLogo} alt="" />
            </Link>
          </div>}
      </div>
    </header>
  )
}

export default Header;
