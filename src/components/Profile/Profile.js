import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css'
import '../Main/Main.css'
import Header from '../Header/Header';


function Profile() {

    return (
        <>
            <Header />
            <section className='profile'>
            <div className='profile__container'>
                <h2 className='profile__title'>Привет, Виталий!</h2>
                <form className='profile__form'>
                    <fieldset className='profile__fieldset'>
                        <label className='profile__fields'>
                            <p className='profile__input-name'>Имя</p>
                            <input className='profile__input'
                                type='text'
                                name='name'
                                placeholder='Имя'
                            />
                        </label>
                        <label className='profile__fields'>
                            <p className='profile__input-email'>E-mail</p>
                            <input className='profile__input'
                                type='email'
                                name='email'
                                placeholder='E-mail'
                                required />
                        </label>
                    </fieldset>
                    <div className='profile__box'>
                        <button className='profile__button_edit' type='submit'>Редактировать</button>
                        <Link to="/sign-in"><button className='profile__button_logout' >Выйти из аккаунта</button></Link>
                    </div>
                </form>
                </div>
            </section>
        </>
    );
}

export default Profile;