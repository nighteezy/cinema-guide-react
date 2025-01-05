import axiosInstance from './axiosConfig';
import { Login, Profile, Registration } from '../interfaces';

export const LoginUser = async (
  email: string,
  password: string
): Promise<Login> => {
  const url = `/auth/login`;
  const response = await axiosInstance.post<Login>(url, { email, password });
  return response.data;
};

export const LogOutUser = async (): Promise<void> => {
  const url = `/auth/logout`;
  const response = await axiosInstance.get(url);
  return response.data;
};

export const registrationUser = async (
  email: string,
  password: string,
  name: string,
  surname: string
): Promise<Registration> => {
  const url = `/user`;
  const response = await axiosInstance.post<Registration>(url, {
    email,
    password,
    name,
    surname,
  });
  return response.data;
};

export const profileUser = async (): Promise<Profile> => {
  const url = `/profile`;
  const response = await axiosInstance.get<Profile>(url);
  return response.data;
};
