import React, { FC } from 'react';
import { selectUser } from '../../store/authSlice';
import { useAppSelector } from '../../store/hooks';

const Favorites: FC = () => {
  const user = useAppSelector(selectUser);
  if (!user) {
    return <p>Ничего нет</p>;
  }

  return (
    <div>
      <div>{user.favorites}</div>
    </div>
  );
};

export default Favorites;
