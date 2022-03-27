import PageWithForm from "../PageWithForm/PageWithForm";
import React from "react";

function Register(props) {

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeName(evt) {
    setName(evt.target.value)
  }
  function handleChangeEmail(evt) {
    setEmail(evt.target.value)
  }
  function handleChangePassword(evt) {
    setPassword(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(name, email, password)
  }

  return (
    <PageWithForm header='Добро пожаловать!' buttonName="Зарегистрироваться"
      registerText="Уже зарегистрированы?" nameLink="Войти" link="/signin"
      onSubmitForm={handleSubmit} infoMessage={props.infoMessage}>
      <span className="form__input-name">Имя</span>
      <input className="form__input" type="text" autoComplete="off"
        required name="name" value={name} onChange={handleChangeName}/>
      <span className="form__input-error"></span>
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

export default Register;
