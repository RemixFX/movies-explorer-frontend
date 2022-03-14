import logo from "../../images/logo.svg"
import { Link } from 'react-router-dom';

function PageWithForm(props) {
  return (
    <section className="page-form">
      <img className="page-form__logo" src={logo} alt="логотип зеленый круг" />
      <h2 className="page-form__header">{props.header}</h2>
      <form className="form">
        {props.children}
        <button className="form__submit-button">{props.buttonName}</button>
        <div className="form__container">
          <p className="form__container-heading" >{props.registerText}</p>
          <Link to={props.link} className="form__link">{props.nameLink}</Link>
        </div>
      </form>
    </section>
  )
}

export default PageWithForm;
