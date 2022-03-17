import React from "react";
import logo from '../../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import profileLogo from '../../images/profile-logo.svg'

function Header() {

  const location = useLocation();
  const [classPopup, setClassPopup] = React.useState('')

  return (
    <header className={`${location.pathname === '/' ? 'header' : 'header_background_black'}`}>
      <div className='section-width header__container'>
        <Link className='header__logo-link' to="/">
          <img className='header__logo' src={logo} alt='логотип зеленый круг' /></Link>
        {location.pathname === '/' ? <div className='header__buttons'>
          <Link to="/signup" className='header__button-register'>Регистрация</Link>
          <Link to="/signin" className='header__button-login'>Войти</Link>
        </div> :
          <><button className='header__menu-button' type='button'
            onClick={() => setClassPopup('popup_opened')}></button>
            <div className={`popup ${classPopup}`}>
              <div className="header__menu">
                <button className="popup__close-button" type="button"
                onClick={() => setClassPopup('')}></button>
                <Navigation />
                <Link to="/profile" className='header__profile'>
                  <span className='header__profile-text'>Аккаунт</span>
                  <img className='header__profile-logo' src={profileLogo} alt="" />
                </Link>
              </div>
            </div>
            <div className='header__buttons header__buttons_type_authorized'>
              <Navigation />
              <Link to="/profile" className='header__profile'>
                <span className='header__profile-text'>Аккаунт</span>
                <img className='header__profile-logo' src={profileLogo} alt="" />
              </Link>
            </div></>}
      </div>
    </header>
  )
}

export default Header;
