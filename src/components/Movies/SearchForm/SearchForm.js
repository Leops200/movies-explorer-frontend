import "./SearchForm.css";
import SwitchSearch from "./SwitchSearch/SwitchSearch";

function SearchForm({ onFilterChange, isFilterOn }) {

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <section
            className="search-form"
            aria-label="Секция с поиском и фильтрацией"
        >
            <div className="search-form__border">
                <form
                    className="search-form__form"
                    id="search-and-filter"
                    action="#"
                    name="search-and-filter"
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <input
                        className="search-form__search"
                        form="search-and-filter"
                        name="search"
                        placeholder="Фильм"
                        type="search"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                    />
                    <SwitchSearch
                        onFilterChange={onFilterChange}
                        isFilterOn={isFilterOn}
                    />
                    <button
                        className="search-form__btn-submit hover-button"
                        type="submit"
                        form="search-and-filter"
                    >
                        Найти
                    </button>
                </form>
            </div>
        </section>
    );
}

export default SearchForm;