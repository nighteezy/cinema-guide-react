import axios from 'axios';
import { API_URL } from './config';
import { Film, Movies } from '../interfaces/Movies';

export const getRandomMovie = async (): Promise<Film> => {
  const url = `${API_URL}/movie/random`;
  const response = await axios.get<Film>(url);
  return response.data;
};

export const getTop10Movie = async (): Promise<Movies> => {
  const url = `${API_URL}/movie/top10`;
  const response = await axios.get<Movies>(url);
  return response.data;
};