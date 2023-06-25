import React from "react";
import { Link, Route, Routes} from "react-router-dom";
import "./Header.css";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import AccountBtn from "../AccountBtn/AccountBtn";

function Header({ onHamburgerClick }) {

  return (
    <header className="header">
      <Routes>
        <Route
          path="/"
          element={
            <div className=" header__container header__wrapper_bg-color-hero">
              <Logo />
              <div className="header__wrapper ">
                <div />
                <nav className="header__menu">
                  <ul className="header__menu-wrapper">
                    <li className="header__menu-item">
                      <Link to="/signup" className="header__link hover-link">
                        Регистрация
                      </Link>
                    </li>
                    <li className="header__menu-item">
                      <Link
                        to="/signin"
                        className="header__link header__link_type_login hover-button"
                      >
                        Войти
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          }
        />
        <Route
          path="/movies"
          element={
            <div className=" header__container">
              <Logo />
              <div className="header__wrapper">
                <Navigation />
                <AccountBtn />
                <button
                  className="header__btn-hamburger hover-button"
                  type="button"
                  aria-label="Меню навигации"
                  onClick={onHamburgerClick}
                ></button>
              </div>
            </div>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <div className=" header__container">
              <Logo />
              <div className="header__wrapper">
                <Navigation />
                <AccountBtn />
                <button
                  className="header__btn-hamburger hover-button"
                  type="button"
                  aria-label="Меню навигации"
                  onClick={onHamburgerClick}
                ></button>
              </div>
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            <div className=" header__container">
              <Logo />
              <div className="header__wrapper">
                <Navigation />
                <AccountBtn />
                <button
                  className="header__btn-hamburger hover-button"
                  type="button"
                  aria-label="Меню навигации"
                  onClick={onHamburgerClick}
                ></button>
              </div>
            </div>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;