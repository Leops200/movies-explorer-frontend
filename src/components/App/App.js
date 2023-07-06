import React, { useEffect, useRef, useState, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

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
import { MOV_API_URL } from "../utils/constants";

import * as MainApi from "../utils/MainApi";
import * as MovieApi from "../utils/MovieApi";

function App() {
  // Хуки
  const [currentUser, setCurrentUser] = useState({});
  const [logIn, setLogIn] = useState(false);
  const [isSideMenuOpen, setSideMenuStatus] = useState(false);
  const [savedMovies, setSavedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errServText, setErrServText] = useState(false);
  const [isSerchErr, setIsSerchErr] = useState(false);
  //const [isPreloaderOn, setPreloader] = useState(); 
  const aboutOnClickRef = useRef(null);
  const navigate = useNavigate();


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

  const userLoginCheck = useCallback(async () => {
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

  async function getAllMovies() {
    setIsLoading(true);
    setIsSerchErr(false);
    try {
      const moviesData = await MovieApi.getMovies();
      if (moviesData) {
        return moviesData;
      }
    } catch (err) {
      setIsSerchErr(true);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  // Проверяем, авторизован ли пользователь
  useEffect(() => {
    userLoginCheck();
  }, [logIn, userLoginCheck]);

  /*useEffect(() => {
    if (logIn) {
      getUserMoviesCards();
    }
  }, [logIn, getUserMoviesCards]);*/

  function handleOpenSideMenu() {
    setSideMenuStatus(!isSideMenuOpen);
  }

  function handleCloseSideMenu() {
    setSideMenuStatus(false);
  }

  function handleFilterChange(evt) {

  }

  async function handleMovSave(movie) {
    try {
      const movieData = await MainApi.creatCardMovies({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${MOV_API_URL}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `${MOV_API_URL}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      });
      if (movieData) {
        setSavedCards([movieData, ...savedMovies]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function movieDel(movie) {
    const savedMovie = savedMovies.find(
      (card) => card.movieId === movie.id || card.movieId === movie.movieId
    );
    try {
      const data = await MainApi.cardDel(savedMovie._id);
      if (data) {
        setSavedCards((state) =>
          state.filter((card) => card._id !== savedMovie._id)
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleScrollEffect(targetRef) {
    targetRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  /* useEffect(() => {
     setCards(moviesCards);
     setSavedCards(moviesSavedCards);
   }, []);*/



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
                  onSearch={getAllMovies}
                  savedMovies={savedMovies}
                  onCardSave={handleMovSave}
                  logIn={logIn}
                  isSerchErr={isSerchErr}
                  isLoading={isLoading}
                  onCardDel={movieDel}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <SavedMovies
                  savedMovies={savedMovies}
                  onFilterChange={handleFilterChange}
                  logIn={logIn}
                  onCardDel={movieDel}
                />
              }
            />
            <Route path="/profile" element={
              <Profile
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
