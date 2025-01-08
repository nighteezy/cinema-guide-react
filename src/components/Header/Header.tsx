import React, { useState } from 'react';
import { FC } from 'react';
import { Search } from '../Search/Search';
import './Header.css';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { selectUser } from '../../store/authSlice';
import ModalAuth from '../ModalAuth/ModalAuth';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeModal, openModal } from '../../store/modalSlice';

Modal.setAppElement('#root');

export const Header: FC = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const isModalOpen = useAppSelector(state => state.modal.isOpen);
  const dispatch = useAppDispatch();

  const handleProfileCheck = () => {
    if (user) {
      navigate('/profile');
    } else {
      dispatch(openModal());
    }
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
        <button className="header__btn btn-reset" onClick={handleProfileCheck}>
          {user && user.name ? user.name : 'Войти'}
        </button>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => dispatch(closeModal())}
          shouldCloseOnOverlayClick={true}
          className="header__modal"
          overlayClassName="header__overlay"
        >
          <ModalAuth />
        </Modal>
      </div>
    </header>
  );
};

export default Header;
