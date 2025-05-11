import React, { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { fetchAuth, fetchUserProfile } from '../../store/authSlice';
import { closeModal } from '../../store/modalSlice';
import EmailIcon from '../icons/EmailIcon';
import PasswordIcon from '../icons/PasswordIcon';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userResponse = await dispatch(
        fetchAuth({ email, password })
      ).unwrap();
      if (userResponse) {
        await dispatch(fetchUserProfile()).unwrap();
        dispatch(closeModal());
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка входа. Попробуйте еще раз.');
    }
  };

  return (
    <>
      <form className="auth-form form" onSubmit={handleLogin}>
        <ul className="list-reset form__list">
          <li className="form__item">
            <EmailIcon />
            <input
              className="form__input"
              placeholder="Электронная почта"
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              required
            />
          </li>

          <li className="form__item">
            <PasswordIcon />
            <input
              className="form__input"
              placeholder="Пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              required
            />
          </li>
        </ul>

        <button type="submit" className="btn-reset modal__btn--login">
          Войти
        </button>
      </form>
    </>
  );
};

export default Auth;
