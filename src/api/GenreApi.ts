import { Genre } from '../interfaces';
import axiosInstance from './axiosConfig';

export const getGenre = async (): Promise<Genre> => {
  const url = `/movie/genres`;
  const response = await axiosInstance.get<Genre>(url);
  return response.data;
};
