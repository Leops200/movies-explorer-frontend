import React, { useState } from 'react';
import Switch from 'react-switch';
import './SearchForm.css';

function SearchForm() {
    const [isChecked, setIsChecked] = useState(false);
    const handleSwitchChange = (checked) => {
        setIsChecked(checked);
    }

    return (
        <section className="search">
            <form className="search__form">
                <div className="search__container">
                    <input className="search__input" name="search" type="text" placeholder="Фильм" required />
                    <button className="search__button"></button>
                </div>
                <label className="search__toggle">
                    <Switch
                        className="search__checkbox"
                        checked={isChecked}
                        onChange={handleSwitchChange}
                        onColor="#3DDC84"
                        offColor="#EBEBEB"
                        checkedIcon={false}
                        uncheckedIcon={false}
                        width={34}
                        height={14}
                        handleDiameter={10}
                    />
                    <p className="search__text">Короткометражки</p>
                </label>
            </form>
            <div className='search__line'></div>
        </section>
    );

}

export default SearchForm;