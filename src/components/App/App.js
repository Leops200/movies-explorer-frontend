
import React from 'react';
import '../../index.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route exact path="/movies" element={<Movies />} />
      <Route exact path="/saved-movies" element={<SavedMovies />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/sign-in" element={<Login />} />
      <Route exact path="/sign-up" element={<Register />} />
      <Route exact path="*" element={<NotFound />} />
    </Routes>

  );
}

export default App;
