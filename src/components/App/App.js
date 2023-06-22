import { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
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

// то, что должно прийти с бэка
import moviesCards from "../utils/tempData/data.json";
import moviesSavedCards from "../utils/tempData/savedData.json";
import userData from "../utils/tempData/userData.json";

function App() {
  // Хуки
  const [isSideMenuOpen, setSideMenuStatus] = useState(false);
  const [isFilterOn, setFilter] = useState(false);
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [isLiked, setLike] = useState(false); // пока нет бэкенда 
  const aboutOnClickRef = useRef(null);

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
      <Routes>
        <Route
          path="/"
          element={<AppPoint onHamburgerClick={handleOpenSideMenu} />}
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
              />
            }
          />
          <Route path="/profile" element={<Profile user={userData} />} />
        </Route>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Registr />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <TripleBurger
        isSideMenuOpen={isSideMenuOpen}
        onClose={handleCloseSideMenu}
      />
    </div>
  );
}

export default App;
