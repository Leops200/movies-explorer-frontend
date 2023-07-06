import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { savedMovStatus } from "../../utils/utils";

function MoviesCardList({ cards, onCardSave, cardRenderConfig,
  isLoading, isCardsNotFound, isSerchErr, savedMovies, onCardDel }) {

  const nowLocation = useLocation();
  const [moviesRender, setMovRender] = useState([]);

  function onClickBtnMore() {
    const start = moviesRender.length;
    const end = start + cardRenderConfig.more;
    const count = cards.length - start;
    if (count > 0) {
      const additionalCards = cards.slice(start, end);
      setMovRender([...moviesRender, ...additionalCards]);
    }
  }

  useEffect (() => {
    if (nowLocation.pathname === "/movies" && cards.length) {
      const result = cards.filter((card, index) => {
        return index < cardRenderConfig.total;
      });
      setMovRender(result);
    }
  }, [nowLocation.pathname, cards, cardRenderConfig]);

  useEffect(() => {
    if (nowLocation.pathname === "/saved-movies") {
      setMovRender(cards);
    }
  }, [nowLocation.pathname, cards]);

  return (
    <section
      className="movies-card-list"
      aria-label="Секция с карточками фильмов"
    >
      {!localStorage.getItem("searchPhrase") && cards.length === 0 && null}
      {isLoading && cards.length === 0 && <Preloader />}
      {isCardsNotFound && (
        <p className="movies-card-list__info">Ничего не&nbsp;найдено</p>
      )}
      {isSerchErr && (
        <p className="movies-card-list__info">
          Во&nbsp;время запроса произошла ошибка. Проблемы с&nbsp;сетью,
          или сервер не&nbsp;доступен. Повторите запрос позже.
        </p>
      )}
      {cards.length !== 0 && !isCardsNotFound && (
        <>
          <ul
            className={`movies-card-list__list ${
              moviesRender.length > 3
                ? "movies-card-list__list_space-evenly"
                : ""
            }`}
          >
            {moviesRender.map((card) => (
              <MoviesCard
                card={card}
                key={card.id || card._id}
                isSaved={savedMovStatus(savedMovies, card)}
                onCardSave={onCardSave}
                onCardDel={onCardDel}
              />
            ))}
          </ul>
          {moviesRender.length >= 5 &&
            moviesRender.length < cards.length && (
              <button
                className="movies-card-list__btn-more hover-button"
                type="button"
                onClick={onClickBtnMore}
              >
                Ещё
              </button>
            )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;