import "./SwitchSearch.css";

function SwitchSearch({ onSwitchChange, isSwitchOn, isSearch }) {
  return (
    <label className="switch-checkbox">
      <input
        className="switch-checkbox__toggle"
        form="search-and-filter"
        name="toggle"
        type="checkbox"
        checked={isSwitchOn}
        disabled={isSearch ? true : false}
        onChange={(evt) => onSwitchChange(evt.target.checked)}
      />
      <span className="switch-checkbox__track"></span>
      Короткометражки
    </label>
  );
}

export default SwitchSearch;
