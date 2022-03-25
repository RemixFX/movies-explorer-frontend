import React from "react";

function SearchForm(props) {

  const [textInput, setTextInput] = React.useState('');

  function handleChange(evt) {
    setTextInput(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onFindMovies(textInput.toLowerCase())
  }

  return (
    <section className="section-width section__search-form">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-form__container">
          <input type="text" autoComplete="off" name="movies" placeholder="Фильм"
            required className="search-form__input" value={textInput} onChange={handleChange}/>
          <button className="search-form__submit-button"></button>
        </div>
        <label className="search-form__switch">
          <input type="checkbox" className="search-form__checkbox" />
          <span className="search-form__slider"></span>
          <span className="search-form__slider-name">Короткометражки</span>
        </label>
      </form>


    </section>
  )
}

export default SearchForm;
