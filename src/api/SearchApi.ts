import { Movies } from '../interfaces';
import axiosInstance from './axiosConfig';

export const getSearchMovie = async (title: string): Promise<Movies> => {
  const url = `/movie?count=5&page=0&title=${title}`;
  const response = await axiosInstance.get<Movies>(url);
  return response.data;
};
