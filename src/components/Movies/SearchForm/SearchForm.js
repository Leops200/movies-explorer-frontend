import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SwitchSearch from "./SwitchSearch/SwitchSearch";
import './SearchForm.css';

function SearchForm({ onSwitchChange, isSwitchOn, onSearch, isSearch }) {

    const nowLocation = useLocation();
    const [searchPhrase, setSearchPhrase] = useState("");
    const [phraseErr, setPhraseErr] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (nowLocation.pathname === "/movies") {
            searchPhrase ? onSearch(searchPhrase) :
            setPhraseErr("Введите фразу для поиска");
        } else {
            onSearch(searchPhrase);
        }
    }

    useEffect(() => {
        if (
          nowLocation.pathname === "/movies" &&
          localStorage.getItem("moviesSearchPhrase")
        ) {
          const savedSearchPhrase = localStorage.getItem("moviesSearchPhrase");
          setSearchPhrase(savedSearchPhrase);
        } else if (
          nowLocation.pathname === "/saved-movies" &&
          localStorage.getItem("saveMoviesSearchPhrase")
        ) {
          const savedSearchPhrase = localStorage.getItem("moviesSearchPhrase");
          setSearchPhrase(savedSearchPhrase);
        }
      }, [nowLocation.pathname]);

    useEffect(() => {
        setPhraseErr("");
    }, [searchPhrase]);

    return (
        <section className="search"
            aria-label="Секция с поиском и фильтром"
        >
            <form className="search__form"
                id="search-and-filter"
                action="#"
                name="search-and-filter"
                noValidate
                onSubmit={handleSubmit}>
                <div className="search__container">
                    <input className="search__input"
                        form="search-and-filter"
                        name="search"
                        type="text"
                        placeholder="Фильм"
                        required
                        autoComplete="off"
                        autoCapitalize="off"
                        onChange={(e) => setSearchPhrase(e.target.value)}
                        value={searchPhrase || ""}
                        disabled={isSearch ? true : false}
                    />
                    <button className="search__button hover-button"
                        type="submit"
                        form="search-and-filter"
                    >
                        Найти
                    </button>
                </div>
                <SwitchSearch
                    onSwitchChange={onSwitchChange}
                    isSwitchOn={isSwitchOn}
                    isSearch={isSearch}
                />
            </form>
            <span className="search__error">{phraseErr}</span>
        </section>
    );

}

export default SearchForm;