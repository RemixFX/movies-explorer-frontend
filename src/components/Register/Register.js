import PageWithForm from "../PageWithForm/PageWithForm";


function Register() {
  return (
    <PageWithForm header='Добро пожаловать!' buttonName="Зарегистрироваться"
      registerText="Уже зарегистрированы?" nameLink="Войти" link="/signin">
      <span className="form__input-name">Имя</span>
      <input className="form__input" type="text" autoComplete="off"
        required name="name" />
      <span className="form__input-error"></span>
      <span className="form__input-name">E-mail</span>
      <input className="form__input" type="email" autoComplete="off"
        required name="email" />
      <span className="form__input-error">fatal error!!!</span>
      <span className="form__input-name">Пароль</span>
      <input className="form__input" type="password" autoComplete="off"
        required name="password" />
      <span className="form__input-error">error is fatal!!!</span>
    </PageWithForm>
  )
}

export default Register;
