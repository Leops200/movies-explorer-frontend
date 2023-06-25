import SwitchSearch from "./SwitchSearch/SwitchSearch";
import './SearchForm.css';

function SearchForm({ onFilterChange, isFilterOn }) {

    function handleSubmit(e) {
        e.preventDefault();
    }
    return (
        <section className="search"
            aria-label="Секция с поиском и фильтрацией"
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
                        type="search"
                        placeholder="Фильм"
                        autoComplete="off"
                        autoCapitalize="off"
                    />
                    <button className="search__button hover-button"
                        type="submit"
                        form="search-and-filter"
                    >
                        Найти
                    </button>
                </div>
                <SwitchSearch
                    onFilterChange={onFilterChange}
                    isFilterOn={isFilterOn}
                />
            </form>
            <div className='search__line'></div>
        </section>
    );

}

export default SearchForm;