import { useEffect, useState, useCallback } from "react";
import "./Movies.css";
import useResizeWidthScn from "../../hooks/useResizeWidthScn";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

import { CARDS_RENDER_SETTINGS } from "../utils/constants";
import { movieSwitch, movieSearch } from "../utils/utils";

function Movies({ isLoading, savedMovies, onCardSave, isSerchErr,
  onSearch, onCardDel }) {

  const [initCards, setInitCards] = useState([]);
  const [moviesRender, setMovRender] = useState([]);
  const [foundCards, setFoundCards] = useState([]);
  const [isSwitchOn, setSwitch] = useState(false);
  const [isCardsNotFound, setCardsNotFound] = useState(false);
  const [cardRenderConfig, setCardRenderConfig] = useState({});
  const [isSearch, setIsSearch] = useState(false);
  const screenWidth = useResizeWidthScn();

  const searchNfilter = useCallback(
    (cards, searchPhrase) => {
      const found = movieSearch(cards, searchPhrase, false);
      setFoundCards(found);
      if (!found.length) {
        setCardsNotFound(true);
        setIsSearch(false);
        setMovRender(found);
      } else {
        const filtered = movieSwitch(found, isSwitchOn, false);
        setIsSearch(false);
        setMovRender(filtered);
        if (!filtered.length) {
          setIsSearch(false);
          setCardsNotFound(true);
        }
      }
    }, [isSwitchOn]
  );

  const onSearchSubmit = useCallback(
    async (searchPhrase) => {
      setCardsNotFound(false);
      setIsSearch(true);
      if (!initCards.length) {
        const moviesData = await onSearch();
        if (moviesData) {
          setInitCards(moviesData);
          searchNfilter(moviesData, searchPhrase);
        }
      } else {
        searchNfilter(initCards, searchPhrase);
      }
    },
    [searchNfilter, initCards, onSearch]
  );

  const onSwitchClick = useCallback(
    (isChecked) => {
      setSwitch(isChecked);
      setCardsNotFound(false);
      const filtered = movieSwitch(foundCards, isChecked, false);
      setMovRender(filtered);
      if (!filtered.length) {
        setCardsNotFound(true);
      }
    },
    [foundCards]
  );

    useEffect(() => {
    if (screenWidth >= CARDS_RENDER_SETTINGS.base.width) {
      setCardRenderConfig(CARDS_RENDER_SETTINGS.base.cards);
    } else if (
      screenWidth < CARDS_RENDER_SETTINGS.base.width &&
      screenWidth >= CARDS_RENDER_SETTINGS.desktop.width
    ) {
      setCardRenderConfig(CARDS_RENDER_SETTINGS.desktop.cards);
    } else if (
      screenWidth < CARDS_RENDER_SETTINGS.desktop.width &&
      screenWidth >= CARDS_RENDER_SETTINGS.tablet.width
    ) {
      setCardRenderConfig(CARDS_RENDER_SETTINGS.tablet.cards);
    } else {
      setCardRenderConfig(CARDS_RENDER_SETTINGS.mobile.cards);
    }
  }, [screenWidth]);

  useEffect(() => {
    if (
      localStorage.getItem("foundMovies") &&
      localStorage.getItem("isMoviesSwitchOn")
    ) {
      const filter = JSON.parse(localStorage.getItem("isMoviesSwitchOn"));
      setSwitch(filter);
      const foundMovies = JSON.parse(localStorage.getItem("foundMovies"));
      setFoundCards(foundMovies);
      if (!foundMovies.length) {
        setCardsNotFound(true);
        setMovRender(foundMovies);
      } else {
        const filtered = movieSwitch(foundMovies, filter, false);
        setMovRender(filtered);
        if (!filtered.length) {
          setCardsNotFound(true);
        }
      }
    }
  }, []);
 
  return (
    <main className="movies">
      <SearchForm
        onSearch={onSearchSubmit}
        onSwitchChange={onSwitchClick}
        isSwitchOn={isSwitchOn}
        isSearch={isSearch}
      />
      <MoviesCardList
        cards={moviesRender}
        savedMovies={savedMovies}
        cardRenderConfig={cardRenderConfig}
        isCardsNotFound={isCardsNotFound}
        isSerchErr={isSerchErr}
        onCardSave={onCardSave}
        onCardDel={onCardDel}
        isLoading={isLoading}
      />
    </main>
  );
}

export default Movies;