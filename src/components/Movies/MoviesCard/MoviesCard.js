import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import { MOV_API_URL } from "../../utils/constants";

function MoviesCard({ card, onCardSave, isSaved, onCardDel }) {
  const nowLocation = useLocation();

  function handleSaveClick() {
    onCardSave(card);
  }

  function handleDelClick() {
    onCardDel(card);
  }

  function converterDuration(duration) {
    const minutes = duration % 60;
    const hours = (duration - minutes) / 60;
    if (hours < 1) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  }

  return (
    <li className="movies-card">
      <a
        className="movies-card__link hover-link"
        target="_blank"
        href={card.trailerLink}
        rel="noreferrer"
      >
        <img
          className="movies-card__img"
          src={
            nowLocation.pathname === "/movies"
              ? `${MOV_API_URL}${card.image.url}`
              : `${card.image}`
          }
          alt={`Постер фильма ${card.nameRU}`}
        />
      </a>
      <div className="movies-card__caption">
        <p className="movies-card__name">{card.nameRU}</p>
        {nowLocation.pathname === "/movies" ? (
          <button
            className="movies-card__btn-action hover-button"
            type="button"
            aria-label="Добавить в сохранённые"
            onClick={isSaved ? handleDelClick : handleSaveClick }
          >
            <svg
              className={`movies-card__btn-like-img ${isSaved ? "movies-card__btn-like-img_active" : ""
                }`}
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 9" width="100%" height="100%"
            >
              <path stroke="#424242" strokeWidth="1" d="M7.273 0C6.273 0 5.545.523 5 1.09 4.455.567 3.727 0 2.727 0 1.137 0 0 1.264 0 2.833c0 .785.318 1.482.91 1.962L5 8.5l4.09-3.705c.546-.523.91-1.177.91-1.962C10 1.264 8.864 0 7.273 0Z"
              />
            </svg>
          </button>
        ) : (
          <button
            className="movies-card__btn-action movies-card__btn-action_place_saved-movies"
            type="button"
            aria-label="Удалить из сохранённых"
            onClick={handleDelClick}
          >
            <svg
              className="movies-card__btn-del-img"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 9" width="100%" height="100%"
            >
              <path
                fill="#fff"
                fillRule="evenodd"
                d="m4 5.06 2.652 2.652 1.06-1.06L5.061 4l2.651-2.652-1.06-1.06L4 2.939 1.348.287.288 1.348 2.939 4 .287 6.652l1.061 1.06L4 5.061Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
      <p className="movies-card__duration">
        {converterDuration(card.duration)}
      </p>
    </li>
  );
}

export default MoviesCard;