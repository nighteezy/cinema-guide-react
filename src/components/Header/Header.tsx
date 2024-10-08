import React from 'react';
import { FC } from 'react';
import { Search } from '../Search/Search';
import './Header.css';
import { Link, NavLink } from 'react-router-dom';

export const Header: FC = () => {
  return (
    <>
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
          <button className="header__btn">Войти</button>
        </div>
      </header>
    </>
  );
};
