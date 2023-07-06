import { SHORT_MOVIE } from "./constants";

// конвертер длительности фильма
export function convertDuration(duration) {
  const minutes = duration % 60;
  const hours = (duration - minutes) / 60;
  if (hours < 1) {
    return `${minutes}м`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
}

// переключатель поисковика фильмов
export function movieSwitch(movies, isSwitchOn, isSavedMovies) {
  if (!isSavedMovies) {
    localStorage.setItem("isMoviesSwitchOn", isSwitchOn);
  } else {
    localStorage.setItem("isSavedMoviesSwitchOn", isSwitchOn);
  }
  if (isSwitchOn) {
    const result = movies.filter((movie) => movie.duration <= SHORT_MOVIE);
    return result;
  } else {
    return movies;
  }
}

// поисковик фильмов
export function movieSearch(movies, searchPhrase, isSavedMovies) {
  const normalizeSearchQuery = searchPhrase.toLowerCase().trim();
  const result = movies.filter((movie) => {
    const normalizeNameRu = movie.nameRU.toLowerCase().trim();
    const normalizeNameEn = movie.nameEN.toLowerCase().trim();
    return (
      normalizeNameRu.includes(normalizeSearchQuery) ||
      normalizeNameEn.includes(normalizeSearchQuery)
    );
  });
  if (!isSavedMovies) {
    localStorage.setItem("foundMovies", JSON.stringify(result));
    localStorage.setItem("moviesSearchQuery", normalizeSearchQuery);
  } else {
    localStorage.setItem("moviesSearchPhrase", normalizeSearchQuery);
  }
  return result;
}

// обработчик статусов сохранения карточек с фильмами
export function savedMovStatus(savedMovies, movieCard) {
  return savedMovies.find((card) => {
    return card.movieId === (movieCard.id || movieCard.movieId);
  });
}
 
export function generateKey(prefix) {
  return `${prefix}-${new Date().getTime()}`;
}

export function handleScrollEffect(targetRef) {
  targetRef.current.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}