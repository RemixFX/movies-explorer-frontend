import React from 'react';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header"


function Profile(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  function handleChangeName(evt) {
    setName(evt.target.value)
  }
  function handleChangeEmail(evt) {
    setEmail(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser(name, email);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  return (
    <><Header />
      <section className="profile">
        <h2 className="profile__header">Привет, {currentUser.name}!</h2>
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-form__input-container">
            <input className="profile-form__input" type="text" autoComplete="off"
              name="name" required placeholder="Имя" value={name} onChange={handleChangeName}/>
            <span className="profile-form__input-text">{currentUser.name}</span>
          </div>
          <span className="profile-form__error"></span>
          <div className="profile-form__input-container">
            <input className="profile-form__input" type="email" autoComplete="off"
              name="email" required placeholder="E-mail" value={email} onChange={handleChangeEmail}/>
            <span className="profile-form__input-text">{currentUser.email}</span>
          </div>
          <span className="profile-form__error"></span>
          <button className="profile-form__submit-button">Редактировать</button>
        </form>
        <button className="profile__signout" type="button"
        onClick={props.onLogout}>Выйти из аккаунта</button>
      </section></>
  )
}

export default Profile;
