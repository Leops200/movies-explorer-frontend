import { useState, useEffect, useCallback } from "react";
import "./SavedMovies.css";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import { movieSwitch, movieSearch } from "../utils/utils";

function SavedMovies({ savedMovies, onCardDel }) {

  const [moviesRender, setMovRender] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [isSwitchOn, setSwitch] = useState(false);
  const [isCardsNotFound, setCardsNotFound] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const onSearchSubmit = useCallback(
    (searchPhrase) => {
      setCardsNotFound(false);
      setIsSearch(true);
      if (savedMovies.length) {
        const found = movieSearch(savedMovies, searchPhrase, true);
        setFilterMovies(found);
        if (!found.length) {
          setCardsNotFound(true);
          setIsSearch(false);
          setMovRender(found);
        } else {
          const filtered = movieSwitch(found, isSwitchOn, true);
          setIsSearch(false);
          setMovRender(filtered);
          if (!filtered.length) {
            setIsSearch(false);
            setCardsNotFound(true);
          }
        }
      } else {
        setIsSearch(false);
        setCardsNotFound(true);
      }
    },
    [savedMovies, isSwitchOn]
  );

  const onSwitchClick = useCallback(
    (isChecked) => {
      setSwitch(isChecked);
      setCardsNotFound(false);
      const filtered = movieSwitch(filterMovies, isChecked, true);
      setMovRender(filtered);
      if (!filtered.length) {
        setCardsNotFound(true);
      }
    },
    [filterMovies]
  );

  // DEPENDENCIES ON THE RENDERING OF SAVED CARDS
  useEffect(() => {
    setCardsNotFound(false);
    if (
      localStorage.getItem("moviesSearchPhrase") &&
      localStorage.getItem("isSavedMoviesSwitchOn")
    ) {
      const filter = JSON.parse(localStorage.getItem("isSavedMoviesSwitchOn"));
      setSwitch(filter);
      const searchQuery = localStorage.getItem("moviesSearchPhrase");
      const found = movieSearch(savedMovies, searchQuery, true);
      setFilterMovies(found);
      if (!found.length) {
        setCardsNotFound(true);
        setMovRender(found);
      } else {
        const filtered = movieSwitch(found, filter, true);
        setMovRender(filtered);
        if (!filtered.length) {
          setCardsNotFound(true);
        }
      }
    } else if (
      !localStorage.getItem("moviesSearchPhrase") &&
      localStorage.getItem("isSavedMoviesSwitchOn")
    ) {
      setFilterMovies(savedMovies);
      const filter = JSON.parse(localStorage.getItem("isSavedMoviesSwitchOn"));
      setSwitch(filter);
      const filtered = movieSwitch(savedMovies, filter, true);
      setMovRender(filtered);
      if (!filtered.length) {
        setCardsNotFound(true);
      }
    } else {
      setMovRender(savedMovies);
      setFilterMovies(savedMovies);
    }
  }, [savedMovies]);

  return (
    <main className="saved-movies">
      <SearchForm
        isSearch={isSearch}
        isSwitchOn={isSwitchOn}
        onSwitchChange={onSwitchClick}
        onSearch={onSearchSubmit}
      />
      <MoviesCardList
        cards={moviesRender}
        savedMovies={savedMovies}
        isCardsNotFound={isCardsNotFound}
        onCardDel={onCardDel}
      />
    </main>
  );
}

export default SavedMovies;
