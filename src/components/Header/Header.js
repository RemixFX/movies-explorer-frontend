import logo from '../../images/logo.svg';
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import profileLogo from '../../images/profile-logo.svg'

function Header() {

  const location = useLocation();

  return (
    <header className={`${location.pathname === '/' ? 'header' : 'header_background_black'}`}>
      <div className='section-width header__container'>
        <img className='header__logo' src={logo} alt='логотип зеленый круг' />
        {location.pathname === '/' ? <div className='header__buttons'>
          <button type='button' className='header__buttton-register'>Регистрация</button>
          <button type='button' className='header__buttton-login'>Войти</button>
        </div> :
        <div className='header__buttons'>
          <Navigation />
          <div className='header__profile'>
            <span className='header__profile-text'>Аккаунт</span>
            <img className='header__profile-logo' src={profileLogo} alt=""/>
          </div>
        </div>}
      </div>
    </header>
  )
}

export default Header;
