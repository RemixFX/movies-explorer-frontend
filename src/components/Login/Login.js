import PageWithForm from "../PageWithForm/PageWithForm";
import React from "react";
import { useFormWithValidation } from '../../utils/FormValidator';
import validator from 'validator';

function Login(props) {

  const { values, handleChange, errors, isValid }
    = useFormWithValidation({ email: '', password: '' });

  const reallyValid = validator.isEmail(values.email) && isValid

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(values)
  }

  return (
    <PageWithForm header='Рады видеть!' buttonName="Войти"
      infoMessage={props.infoMessage} registerText="Ещё не зарегистрированы?"
      nameLink="Регистрация" link="/signup" onSubmitForm={handleSubmit}
      additionalClass="form__submit-button_type_login" reallyValid={reallyValid}>
      <span className="form__input-name">E-mail</span>
      <input className="form__input" type="email" autoComplete="off"
        required name="email" value={values.email} onChange={handleChange} />
      <span className="form__input-error">{errors.email}</span>
      <span className="form__input-name">Пароль</span>
      <input className="form__input" type="password" autoComplete="off" minLength="8"
        required name="password" value={values.password} onChange={handleChange} />
      <span className="form__input-error">{errors.password}</span>
    </PageWithForm>
  )
}

export default Login;
