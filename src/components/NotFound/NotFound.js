import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound( logIn ) {
  const navigate = useNavigate();
  function btnBackClick() {
    logIn ? navigate(-3) : navigate(-1);
  }

  return (
    <main className="not-found">
      <section className="not-found__wrapper">
        <p className="not-found__title">404</p>
        <h1 className="not-found__text">Страница не найдена</h1>
        <button
          className="not-found__btn-back hover-link"
          type="button"
          onClick={btnBackClick}
        >
          Назад
        </button>
      </section>
    </main>
  );
}

export default NotFound;