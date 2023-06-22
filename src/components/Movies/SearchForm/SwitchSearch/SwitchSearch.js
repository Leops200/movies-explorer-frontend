import "./SwitchSearch.css";

function SwitchSearch({ onFilterChange, isFilterOn }) {
  return (
    <label className="switch-checkbox">
      <input
        className="switch-checkbox__toggle"
        form="search-and-filter"
        name="toggle"
        type="checkbox"
        value={isFilterOn}
        onChange={(evt) => onFilterChange(evt.target.checked)}
      />
      <span className="switch-checkbox__track"></span>
      Короткометражки
    </label>
  );
}

export default SwitchSearch;
