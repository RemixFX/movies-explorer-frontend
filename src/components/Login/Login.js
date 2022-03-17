import PageWithForm from "../PageWithForm/PageWithForm";

function Login() {
  return(
    <PageWithForm header='Рады видеть!' buttonName="Войти"
    registerText="Ещё не зарегистрированы?" nameLink="Регистрация" link="/signup"
    additionalClass="form__submit-button_type_login">
    <span className="form__input-name">E-mail</span>
    <input className="form__input" type="email" autoComplete="off"
      name="email" />
    <span className="form__input-error">fatal error!!!</span>
    <span className="form__input-name">Пароль</span>
    <input className="form__input" type="password" autoComplete="off"
      name="password" />
    <span className="form__input-error">error is fatal!!!</span>
  </PageWithForm>
  )
}

export default Login;
