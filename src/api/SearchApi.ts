import axios from 'axios';
import { API_URL } from './config';
import { Movies } from '../interfaces';

export const getSearchMovie = async (title: string): Promise<Movies> => {
  const url = `${API_URL}/movie?count=5&page=0&title=${title}`;
  const response = await axios.get<Movies>(url);
  return response.data;
};
