import React from 'react';
import './Promo.css'
import '../Main.css'
import bigLogo from '../../../images/hero-logo.svg';

function Promo(onAnchClick, aboutRef) {

  return (
    <section className='promo'>
      <div className='promo__container'>
        <h1 className='promo__title'>Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className='promo__text'>
          Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его
          создателя.
        </p>
        <button className='promo__btn-anch btn-hover'
          type='button'
          onClick={() => onAnchClick(aboutRef)}>Узнать больше</button>
      </div>
      <img className='promo__image' src={bigLogo} alt='лого' />
    </section>
  );
}

export default Promo;