import PageWithForm from "../PageWithForm/PageWithForm";
import React from "react";

function Login(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(evt) {
    setEmail(evt.target.value)
  }
  function handleChangePassword(evt) {
    setPassword(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(email, password)
  }

  return(
    <PageWithForm header='Рады видеть!' buttonName="Войти" infoMessage={props.infoMessage}
    registerText="Ещё не зарегистрированы?" nameLink="Регистрация" link="/signup"
    additionalClass="form__submit-button_type_login" onSubmitForm={handleSubmit}>
    <span className="form__input-name">E-mail</span>
    <input className="form__input" type="email" autoComplete="off"
      required name="email" value={email} onChange={handleChangeEmail}/>
    <span className="form__input-error">fatal error!!!</span>
    <span className="form__input-name">Пароль</span>
    <input className="form__input" type="password" autoComplete="off"
      required name="password" value={password} onChange={handleChangePassword}/>
    <span className="form__input-error">error is fatal!!!</span>
  </PageWithForm>
  )
}

export default Login;
