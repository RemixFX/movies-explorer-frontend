import { useNavigate  } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return(
    <section className="not-found">
      <h3 className="not-found__tittle">404</h3>
      <p className="not-found__subtittle">Страница не найдена</p>
      <button type='button' className="not-found__link"
      onClick={() => navigate(-1)}>Назад</button>
    </section>
  )
}

export default NotFound;
