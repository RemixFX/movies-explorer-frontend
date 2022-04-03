import PageWithForm from "../PageWithForm/PageWithForm";
import React from "react";
import { useFormWithValidation } from '../../utils/FormValidator';

function Register(props) {

  const { values, handleChange, errors, isValid }
    = useFormWithValidation({name: '', email: '', password: ''});

  const reallyValid = isValid && errors.email === '';

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(values)
  }

  return (
    <PageWithForm header='Добро пожаловать!' buttonName="Зарегистрироваться"
      registerText="Уже зарегистрированы?" nameLink="Войти" link="/signin"
      onSubmitForm={handleSubmit} infoMessage={props.infoMessage} reallyValid={reallyValid}>
      <span className="form__input-name">Имя</span>
      <input className='form__input' type="text" autoComplete="off"
        required name="name" minLength="2" maxLength="30"
        value={values.name} onChange={handleChange} />
      <span className="form__input-error">{errors.name}</span>
      <span className="form__input-name">E-mail</span>
      <input className="form__input" type="email" autoComplete="off"
        required name="email" value={values.email} onChange={handleChange} />
      <span className="form__input-error">{errors.email}</span>
      <span className="form__input-name">Пароль</span>
      <input className="form__input" type="password" autoComplete="off"
        required name="password" minLength="8"
        value={values.password} onChange={handleChange} />
      <span className="form__input-error">{errors.password}</span>
    </PageWithForm>
  )
}

export default Register;
