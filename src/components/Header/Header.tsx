import React, { useState } from 'react';
import { FC } from 'react';
import { Search } from '../Search/Search';
import './Header.css';
import { Link, NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import { useAppDispatch } from '../../store/hooks';
import { fetchAuth, SelectResult } from '../../store/authSlice';
import Auth from '../Auth/Auth';
import { useSelector } from 'react-redux';
import Registration from '../Registration/Registration';

Modal.setAppElement('#root');

export const Header: FC = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [registrationModal, setRegustrationModal] = useState(false);
  const authResult = useSelector(SelectResult);
  const dispatch = useAppDispatch();

  const closeLoginModal = () => {
    setLoginModal(false);
    setRegustrationModal(false);
  };
  const openLoginModal = () => {
    setLoginModal(true);
  };

  const handleLogin = (email: string, password: string) => {
    dispatch(fetchAuth({ email, password }));
    closeLoginModal();
  };

  const toggleMode = () => {
    setRegustrationModal(prev => !prev); // переключение между логином и регистрацией
  };
  return (
    <header className="header">
      <div className="container header__container">
        <Link to={'/'} className="logo">
          <img src="/images/logo.svg" alt="Логотип Cinema Guide" />
        </Link>

        <nav className="nav">
          <NavLink to={'/'}>Главная</NavLink>
          <NavLink to={'/genres'}>Жанры</NavLink>
        </nav>

        <Search />
        <button className="header__btn btn-reset" onClick={openLoginModal}>
          {!authResult ? 'Войти' : 'user'}
        </button>
        <Modal isOpen={loginModal} onRequestClose={closeLoginModal}>
          <img src="/images/logo.svg" alt="Логотип Cinema Guide" />
          {registrationModal ? <Registration /> : <Auth />}
          <button>{registrationModal ? 'Создать аккаунт' : 'Войти'}</button>
          <button onClick={toggleMode}>
            {registrationModal ? 'У меня есть пароль' : 'Регистрация'}
          </button>
        </Modal>
      </div>
    </header>
  );
};

export default Header;
