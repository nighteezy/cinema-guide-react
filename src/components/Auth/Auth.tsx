import React from 'react';
import { FC } from 'react';

const Auth: FC = () => {
  return (
    <>
      <form className="auth-form">
        <ul className="list-reset">
          <li>
            <svg
              width="22"
              height="18"
              viewBox="0 0 22 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 0C21.5523 0 22 0.44772 22 1V17.0066C22 17.5552 21.5447 18 21.0082 18H2.9918C2.44405 18 2 17.5551 2 17.0066V16H20V4.3L12 11.5L2 2.5V1C2 0.44772 2.44772 0 3 0H21ZM8 12V14H0V12H8ZM5 7V9H0V7H5ZM19.5659 2H4.43414L12 8.8093L19.5659 2Z"
                fill="black"
                fillOpacity="0.4"
              />
            </svg>
            <input
              className="auth-form__input"
              placeholder="Электронная почта"
            />
          </li>
          <li>
            <svg
              width="22"
              height="12"
              viewBox="0 0 22 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.917 7C11.441 9.8377 8.973 12 6 12C2.68629 12 0 9.3137 0 6C0 2.68629 2.68629 0 6 0C8.973 0 11.441 2.16229 11.917 5H22V7H20V11H18V7H16V11H14V7H11.917ZM6 10C8.20914 10 10 8.2091 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.2091 3.79086 10 6 10Z"
                fill="black"
                fillOpacity="0.4"
              />
            </svg>
            <input className="auth-form__input" placeholder="Пароль" />
          </li>
        </ul>
      </form>
    </>
  );
};

export default Auth;