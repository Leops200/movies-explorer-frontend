import React from 'react';
import './Main.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Techs from './Techs/Techs';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutPriject';
import AboutMe from './AboutMe/AboutMe';

function Main() {

    return (

        <div className='page'>
            <Header />
            <main>
                <Promo />
                <AboutProject />
                <AboutMe />
                <Techs />
            </main>
            <Footer />
        </div>
    );

}

export default Main;