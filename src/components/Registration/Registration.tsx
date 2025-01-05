import React, { FormEvent, useState } from 'react';
import { FC } from 'react';
import z from 'zod';
import { registrationUser } from '../../api/AuthApi';

const registrationSchema = z
  .object({
    email: z.string().email('Некорhектный email'),
    name: z.string().min(1, 'Имя обязательно'),
    surname: z.string().min(1, 'Фамилия обязательна'),
    password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
    confirmPassword: z.string().min(6, 'Подтверждение пароля обязательно'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

const Registration: FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    const formData = { email, name, surname, password, confirmPassword };
    try {
      registrationSchema.parse(formData);
      setError('');
      setSuccess('');
      await registrationUser(email, name, surname, password);
      setIsRegistered(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors.map(e => e.message).join(', '));
      } else {
        setError('Ошибка при регистрации. Попробуйте еще раз.');
      }
    }
  };
  return (
    <div>
      {isRegistered ? (
        <div>
          <h3 className="title form__title">Регистрация прошла успешно!</h3>
          <p>Используйте вашу электронную почту для входа</p>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <h3 className="title form__title">Регистрация</h3>
          <ul className="list-reset form__list">
            <li className="form__item">
              <input
                className="form__input"
                type="text"
                placeholder="Электронная почта"
                onChange={e => setEmail(e.target.value)}
                required
              />
            </li>
            <li className="form__item">
              <input
                className="form__input"
                type="text"
                placeholder="Имя"
                onChange={e => setName(e.target.value)}
                required
              />
            </li>
            <li className="form__item">
              <input
                className="form__input"
                type="text"
                placeholder="Фамилия"
                onChange={e => setSurname(e.target.value)}
                required
              />
            </li>
            <li className="form__item">
              <input
                className="form__input"
                type="password"
                placeholder="Пароль"
                onChange={e => setPassword(e.target.value)}
                required
              />
            </li>
            <li className="form__item">
              <input
                className="form__input"
                type="password"
                placeholder="Подтвердить пароль"
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </li>
          </ul>
          <button type="submit" className="btn-reset modal__btn--login">
            Создать аккаунт
          </button>
        </form>
      )}
    </div>
  );
};

export default Registration;
