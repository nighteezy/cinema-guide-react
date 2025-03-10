import React, { useState } from 'react';
import { FC } from 'react';
import { Search } from '../Search/Search';
import './Header.css';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { selectUser } from '../../store/authSlice';
import ModalAuth from '../ModalAuth/ModalAuth';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeModal, openModal, selectModal } from '../../store/modalSlice';
import ButtonClose from '../ButtonClose/ButtonClose';

Modal.setAppElement('#root');

export const Header: FC = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const { isOpen, activeModal } = useAppSelector(selectModal);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';

  const handleProfileClick = (event: React.MouseEvent) => {
    if (!user) {
      event.preventDefault(); // Отменяем переход
      dispatch(openModal('auth')); // Открываем модалку
    }
  };

  return (
    <header className="header">
      <div className="container header__container">
        <Link to={'/'} className="logo">
          <img src="/images/logo.svg" alt="Логотип Cinema Guide" />
        </Link>

        <nav className="nav">
          <NavLink className="nav__link" to={'/'}>
            Главная
          </NavLink>
          <NavLink className="nav__link" to={'/genres'}>
            Жанры
          </NavLink>
        </nav>

        <Search />
        <NavLink
          to="/profile" // Для авторизованных: переход на /profile
          className={({ isActive }) =>
            `header__btn btn-reset ${isProfilePage ? 'active' : ''} ${
              isActive ? 'active' : ''
            }`
          }
          onClick={handleProfileClick} // Обработчик для неавторизованных
        >
          {user?.name || 'Войти'}
        </NavLink>
        <Modal
          isOpen={isOpen && activeModal === 'auth'}
          className="header__modal"
          overlayClassName="header__overlay"
        >
          <ModalAuth />
          <ButtonClose
            onClick={() => dispatch(closeModal())}
            className="btn-close"
          />
        </Modal>
      </div>
    </header>
  );
};

export default Header;
