import { Link } from 'react-router-dom';

function NotFound() {
  return(
    <section className="not-found">
      <h3 className="not-found__tittle">404</h3>
      <p className="not-found__subtittle">Страница не найдена</p>
      <Link to="/" className="not-found__link">Назад</Link>
    </section>
  )
}

export default NotFound;
