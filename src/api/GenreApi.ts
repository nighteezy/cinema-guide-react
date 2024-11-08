import axios from 'axios';
import { API_URL } from './config';
import { Genre } from '../interfaces';

export const getGenre = async (): Promise<Genre> => {
  const url = `${API_URL}/movie/genres`;
  const response = await axios.get<Genre>(url);
  return response.data;
};
