import React from "react";
function SearchForm(props) {

  const [textInput, setTextInput] = React.useState('');
  const [checked, setChecked] = React.useState(false);

  function handleChangeSearch(evt) {
    setTextInput(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onFindMovies(textInput.toLowerCase(), checked)
  }

   function handleChangeCheckbox() {
    setChecked(prevState => !prevState)
    props.onSort(checked)
	}

  React.useEffect(() => {
    setTextInput(JSON.parse(localStorage.getItem('text')))
    setChecked(JSON.parse(localStorage.getItem('checkbox')))
  }, [])

  return (
    <section className="section-width section__search-form">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-form__container">
          <input type="text" autoComplete="off" name="movies" placeholder="Фильм"
            required className="search-form__input" value={textInput} onChange={handleChangeSearch}/>
          <button className="search-form__submit-button"></button>
        </div>
        <label className="search-form__switch">
          <input type="checkbox" className="search-form__checkbox"
           checked={checked} onChange={handleChangeCheckbox} />
          <span className="search-form__slider"></span>
          <span className="search-form__slider-name">Короткометражки</span>
        </label>
      </form>


    </section>
  )
}

export default SearchForm;
