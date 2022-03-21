import Header from "../Header/Header"

function Profile() {
  return (
    <><Header />
      <section className="profile">
        <h2 className="profile__header">Привет, Роман!</h2>
        <form className="profile-form">
          <div className="profile-form__input-container">
            <input className="profile-form__input" type="text" autoComplete="off"
              name="name" required placeholder="Имя" />
            <span className="profile-form__input-text">Роман</span>
          </div>
          <span className="profile-form__error"></span>
          <div className="profile-form__input-container">
            <input className="profile-form__input" type="email" autoComplete="off"
              name="email" required placeholder="E-mail" />
            <span className="profile-form__input-text">Roman@yandex.ru</span>
          </div>
          <span className="profile-form__error"></span>
          <button className="profile-form__submit-button">Редактировать</button>
        </form>
        <button className="profile__signout" type="button">Выйти из аккаунта</button>
      </section></>
  )
}

export default Profile;
