import React, { FormEvent, useState, FC } from 'react';
import z from 'zod';
import { registrationUser } from '../../api/AuthApi';
import EmailIcon from '../icons/EmailIcon/EmailIcon';
import PasswordIcon from '../icons/PasswordIcon/PasswordIcon';
import { FormData } from '../../interfaces';
import NameIcon from '../icons/NameIcon/NameIcon';

const registrationSchema = z
  .object({
    email: z.string().email('Некоректный email'),
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
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    surname: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<Record<string, string>>({});
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      registrationSchema.parse(formData);
      setError({});
      await registrationUser(
        formData.email,
        formData.name,
        formData.surname,
        formData.password
      );
      setIsRegistered(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc, err) => {
          acc[err.path.join('.')] = err.message;
          return acc;
        }, {} as Record<string, string>);
        setError(formattedErrors);
      } else {
        setError({ general: 'Ошибка при регистрации. Попробуйте еще раз.' });
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
          {error.general && <p className="form__error">{error.general}</p>}
          <ul className="list-reset form__list">
            <li className="form__item">
              <EmailIcon />
              <input
                className="form__input"
                type="text"
                placeholder="Электронная почта"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </li>
            <li className="form__item">
              <NameIcon />
              <input
                className="form__input"
                type="text"
                placeholder="Имя"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </li>
            <li className="form__item">
              <NameIcon />
              <input
                className="form__input"
                type="text"
                placeholder="Фамилия"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </li>
            <li className="form__item">
              <PasswordIcon />
              <input
                className="form__input"
                type="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </li>
            <li className="form__item">
              <PasswordIcon />
              <input
                className="form__input"
                type="password"
                placeholder="Подтвердить пароль"
                value={formData.confirmPassword}
                onChange={handleChange}
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
