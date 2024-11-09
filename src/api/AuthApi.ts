import axios from 'axios';
import { Login, Profile, Registration } from '../interfaces';
import { API_URL } from './config';

export const LoginUser = async (
  email: string,
  password: string
): Promise<Login> => {
  const url = `${API_URL}/auth/login`;
  const response = await axios.get<Login>(url);
  return response.data;
};

export const LogOutUser = async (): Promise<Login> => {
  const url = `${API_URL}/auth/logout`;
  const response = await axios.get<Login>(url);
  return response.data;
};

export const registrationUser = async (
  email: string,
  password: string,
  name: string,
  surname: string
): Promise<Registration> => {
  const url = `${API_URL}/user`;
  const response = await axios.get<Registration>(url);
  return response.data;
};

export const profileUser = async (): Promise<Profile> => {
  const url = `${API_URL}/profile`;
  const response = await axios.get<Profile>(url);
  return response.data;
};
