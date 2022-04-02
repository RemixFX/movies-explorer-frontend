import React from "react";
import logo from '../../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Navigation from '../Navigation/Navigation';

function Header(props) {

  const location = useLocation();
  const [classPopup, setClassPopup] = React.useState('');

  return (
    <header className={`${location.pathname === '/' ? 'header' : 'header_background_black'}`}>
      <div className='section-width header__container'>
        <Link className='header__logo-link' to="/">
          <img className='header__logo' src={logo} alt='' /></Link>
        {!props.loggedIn ?
          <div className='header__buttons'>
            <Link to="/signup" className='header__button-register'>Регистрация</Link>
            <Link to="/signin" className='header__button-login'>Войти</Link>
          </div>
          :
          <>
            <button className='header__menu-button' type='button'
              onClick={() => setClassPopup('popup_opened')}></button>
            <div className={`popup ${classPopup}`}>
              <CSSTransition in={classPopup === 'popup_opened'} classNames="menu-animated"
                timeout={700}>
                <div className="header__menu">
                  <button className="popup__close-button" type="button"
                    onClick={() => setClassPopup('')}></button>
                  <Navigation />
                </div>
              </CSSTransition>
            </div>
            <div className='header__buttons header__buttons_type_authorized'>
              <Navigation />
            </div>
          </>}
      </div>
    </header>
  )
}

export default Header;
