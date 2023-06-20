import React from "react";
import './MoviesCardList.css'
import MoviesCard from "../MoviesCard/MoviesCard";



function MoviesCardList() {

  return (
    <section className="cards">
      <ul className="cards__container">
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      </ul>
        <button type="button" aria-label="Показать больше" className="cards__more-button">Ещё</button>
    </section>
  );
}

export default MoviesCardList;