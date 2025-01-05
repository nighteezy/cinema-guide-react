import { FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/authSlice';
import React from 'react';

const AccountSetting: FC = () => {
  const user = useAppSelector(selectUser);
  return <div>{user?.name}</div>;
};

export default AccountSetting;
