import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout, selectUser } from '../../store/authSlice';
import React from 'react';
import './Settings.css';
import { useNavigate } from 'react-router-dom';

const Settings: FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  if (!user) return <p>Ничего нет</p>;

  const handleLogOut = () => {
    dispatch(logout());
    navigate(`/`);
  };
  return (
    <div className="settings">
      <div className="settings__container">
        <div className="settings__wrapper">
          <div className="settings__icon">
            {`${user.name[0].toUpperCase() + user.surname[0].toUpperCase()}`}
          </div>
          <div className="settings__text">
            <span className="settings__label">Имя Фамилия</span>
            <span>
              {`${user.name[0].toUpperCase() + user.name.slice(1)} 
                                ${
                                  user.surname[0].toUpperCase() +
                                  user.surname.slice(1)
                                }`}
            </span>
          </div>
        </div>
        <div className="settings__wrapper">
          <div className="settings__icon settings__svg">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="settings__text">
            <span className="settings__label">Электронная почта</span>
            <span>{user.email}</span>
          </div>
        </div>
      </div>

      <button className="btn-primary btn-reset" onClick={handleLogOut}>
        Выйти из аккаунта
      </button>
    </div>
  );
};

export default Settings;
