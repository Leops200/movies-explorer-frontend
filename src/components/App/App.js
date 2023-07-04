import React, { useEffect, useRef, useState, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
//import useNotification from "../../hooks/useNotification";
import "./App.css";
import AppPoint from "../AppPoint/AppPoint";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import TripleBurger from "../TripleBurger/TripleBurger";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Registr from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import { CurrentUserContext } from "../../context/CurrentUserContext";

// то, что должно прийти с бэка
import moviesCards from "../utils/tempData/data.json";
import moviesSavedCards from "../utils/tempData/savedData.json";
import userData from "../utils/tempData/userData.json";

import * as MainApi from "../utils/MainApi";

function App() {
  // Хуки
  const [currentUser, setCurrentUser] = useState({});
  const [logIn, setLogIn] = useState(false);
  const [isSideMenuOpen, setSideMenuStatus] = useState(false);
  const [isFilterOn, setFilter] = useState(false);
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedact, setRedact] = useState(false);
  const [errServText, setErrServText] = useState(false);
  const [isLiked, setLike] = useState(false); // пока нет бэкенда 
  const aboutOnClickRef = useRef(null);
  const navigate = useNavigate();
  //const dispatch = useNotification();

  async function userRegisterOn({ password, email, name }) {
    setIsLoading(true);
    try {
      const userData = await MainApi.registration({ password, email, name });
      if (userData) {
        userAuthOn({ email, password });
        navigate("/movies", { replace: true });
      }
    } catch (err) {
      setErrServText(err);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function userAuthOn({ email, password }) {
    setIsLoading(true);
    try {
      const userData = await MainApi.login({ email, password });
      if (userData) {
        setLogIn(true);
        navigate("/movies", { replace: true });
      }
    } catch (err) {
      setErrServText(err);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }
async function userUpdate({ email, name }) {
    setIsLoading(true);
    try {
      const userData = await MainApi.addInfo({ name, email });
      if (userData) {
        setCurrentUser(userData);
        setRedact(prevState => !prevState);
        /*dispatch({
          type: "SUCCESS",
          message: "Профиль успешно обновлён",
        });*/
      }
    } catch (err) {
      setErrServText(err);
      console.error(err);
    } finally { setIsLoading(false); }
  }
  

  async function userLogOut() {
    try {
      const data = await MainApi.logout();
      if (data) {
        setLogIn(false);
        setCurrentUser({});
        setSavedCards([]);
        localStorage.clear();
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleUserLoginCheck = useCallback(async () => {
    try {
      const userData = await MainApi.getUserInfo();
      if (userData) {
        setLogIn(true);
        setCurrentUser(userData);
      }
    } catch (err) {
      console.error(err);
    } finally {
    }
  }, []);

  const getUserMoviesCards = useCallback(async () => {
    try {
      const moviesData = await MainApi.getInitCards();
      if (moviesData) {
        setSavedCards(moviesData);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Проверяем, авторизован ли пользователь
  useEffect(() => {
    handleUserLoginCheck();
  }, [logIn, handleUserLoginCheck]);

  useEffect(() => {
    if (logIn) {
      getUserMoviesCards();
    }
  }, [logIn, getUserMoviesCards]);

  function handleOpenSideMenu() {
    setSideMenuStatus(!isSideMenuOpen);
  }

  function handleCloseSideMenu() {
    setSideMenuStatus(false);
  }

  function handleFilterChange(evt) {
    setFilter(evt);
  }

  function handleCardLike() {
    setLike(!isLiked);
  }

  function handleScrollEffect(targetRef) {
    targetRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  useEffect(() => {
    setCards(moviesCards);
    setSavedCards(moviesSavedCards);
  }, []);

  

  return (
    <div className="app__content">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={<AppPoint onHamburgerClick={handleOpenSideMenu} logIn={logIn} />}
          >
            <Route
              index
              element={
                <Main
                  onAnchorClick={handleScrollEffect}
                  aboutRef={aboutOnClickRef}
                />
              }
            />
            <Route
              path="/movies"
              element={
                <Movies
                  cards={cards}
                  onFilterChange={handleFilterChange}
                  isFilterOn={isFilterOn}
                  isLiked={isLiked}
                  onCardLike={handleCardLike}
                  logIn={logIn}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <SavedMovies
                  cards={savedCards}
                  onFilterChange={handleFilterChange}
                  isFilterOn={isFilterOn}
                  logIn={logIn}
                />
              }
            />
            <Route path="/profile" element={
              <Profile user={userData}
                isRedact={isRedact}
                onUpdate={userUpdate}
                errServText={errServText}
                onLogout={userLogOut}
                onLoading={isLoading}
                logIn={logIn}
              />} />
          </Route>
          <Route path="/signin" element={<Login
            onLogin={userAuthOn}
            onLoading={isLoading}
            logIn={logIn} />} />
          <Route path="/signup" element={<Registr
            onRegister={userRegisterOn}
            onLoading={isLoading}
            logIn={logIn}
          />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <TripleBurger
          isSideMenuOpen={isSideMenuOpen}
          onClose={handleCloseSideMenu}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
