import logo from '../../images/logo.svg';

function Header() {
  return (
    <header className='header'>
      <div className='section-width header__container'>
        <img className='header__logo' src={logo} alt='логотип зеленый круг' />
        <div className='header__buttons'>
          <button type='button' className='header__buttton-register'>Регистрация</button>
          <button type='button' className='header__buttton-login'>Войти</button>
        </div>
      </div>
    </header>
  )
}

export default Header;
