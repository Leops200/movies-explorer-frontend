import React, { useState } from "react";
import "./TripleBurger.css";
import burgerMenu from '../../images/burgerMenu.svg';
import burgerMenuClose from '../../images/burgerMenuClose.svg';
import profile from '../../images/profile.svg';
import { Link } from "react-router-dom";

function TripleBurger() {

    const [openBurger, setOpenBurger] = useState(false);

    function openMenu() {
        setOpenBurger(true);
    }

    function closeMenu() {
        setOpenBurger(false);
    }

    const pathname = window.location.pathname;

    return (
        <section className="burger">

            {openBurger ? <div className="burger__overlay" onClick={closeMenu}></div> : null }
            {openBurger ? <img className="burger__image" src={burgerMenuClose} alt="закрыть" onClick={closeMenu} /> : <img className="burger__image" src={burgerMenu} alt="меню" onClick={openMenu} />}
            <nav className={openBurger ? ["burger__menu", "burger__menu_active"].join(' ') : ["burger__menu"]}>
                <div className="burger__container">
                    <Link to="/" className={`navigation__links ${pathname === "/" ? 'navigation__active' : ' '}`}>Главная</Link>
                    <Link to="/movies" className={`navigation__links ${pathname === "/movies" ? 'navigation__active' : ' '}`}>Фильмы</Link>
                    <Link to="/saved-movies" className={`navigation__links ${pathname === "/saved-movies" ? 'navigation__active' : ' '}`}>Сохраненные фильмы</Link>
                </div>
                <Link to="/profile" className={`navigation__account ${pathname === "/profile" ? 'navigation__active' : ' '}`}><img src={profile} alt='аккаунт' /></Link>
            </nav>
        </section>
    )

}

export default TripleBurger;