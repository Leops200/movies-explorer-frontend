import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SwitchSearch from "./SwitchSearch/SwitchSearch";
import './SearchForm.css';

function SearchForm({ onSwitchChange, isSwitchOn, onSearch, isSearch }) {

    const location = useLocation();
    const [searchPhrase, setSearchPhrase] = useState("");
    const [phraseErr, setPhraseErr] = useState("");

    useEffect(() => {
        setPhraseErr("");
    }, [searchPhrase]);

    function handleSubmit(e) {
        e.preventDefault();
        if (location.pathname === "/movies") {
            searchPhrase ? onSearch(searchPhrase) :
                setPhraseErr("Введите фразу для поиска");
        } else {
            onSearch(searchPhrase);
        }
    }

    useEffect(() => {
        if (
            location.pathname === "/movies" &&
            localStorage.getItem("moviesSearchPhrase")
        ) {
            const savedSearchPhrase = localStorage.getItem("moviesSearchPhrase");
            setSearchPhrase(savedSearchPhrase);
        } else if (
            location.pathname === "/saved-movies" &&
            localStorage.getItem("saveMoviesSearchPhrase")
        ) {
            const savedSearchPhrase = localStorage.getItem("saveMoviesSearchPhrase");
            setSearchPhrase(savedSearchPhrase);
        }
    }, [location.pathname]);

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