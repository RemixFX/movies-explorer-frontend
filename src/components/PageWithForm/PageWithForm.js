import logo from "../../images/logo.svg"
import { Link } from 'react-router-dom';

function PageWithForm(props) {
  return (
    <section className="page-form">
      <Link to="/" className="page-form__logo-link">
        <img className="page-form__logo" src={logo} alt="логотип зеленый круг" />
      </Link>
      <h2 className="page-form__header">{props.header}</h2>
      <form className="form" onSubmit={props.onSubmitForm}>
        {props.children}
        <p className="form__information-message">{props.infoMessage}</p>
        <button className={`form__submit-button ${props.additionalClass}`} type="submit">
          {props.buttonName}</button>
        <div className="form__container">
          <p className="form__container-heading" >{props.registerText}</p>
          <Link to={props.link} className="form__link">{props.nameLink}</Link>
        </div>
      </form>
    </section>
  )
}

export default PageWithForm;
