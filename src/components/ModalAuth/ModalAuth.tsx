import React, { FC, useState } from 'react';
import Registration from '../Registration/Registration';
import Auth from '../Auth/Auth';
import './ModalAuth.css';

const ModalAuth: FC = () => {
  const [registrationModal, setRegustrationModal] = useState(false);
  const toggleMode = () => {
    setRegustrationModal(prev => !prev);
  };

  return (
    <div className="modal__content">
      <img
        src="/images/logo.svg"
        alt="Логотип Cinema Guide"
        className="modal__img"
      />
      {registrationModal ? <Registration /> : <Auth />}
      <button
        type="button"
        onClick={toggleMode}
        className="btn-reset modal__btn--registration"
      >
        {registrationModal ? 'У меня есть пароль' : 'Регистрация'}
      </button>
    </div>
  );
};

export default ModalAuth;
