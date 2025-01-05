import { Film, Movies } from '../interfaces/Movies';
import axiosInstance from './axiosConfig';

export const getRandomMovie = async (): Promise<Film> => {
  const url = `/movie/random`;
  const response = await axiosInstance.get<Film>(url);
  return response.data;
};

export const getTop10Movie = async (): Promise<Movies> => {
  const url = `/movie/top10`;
  const response = await axiosInstance.get<Movies>(url);
  return response.data;
};

export const getMovieByGenre = async (
  genre: string,
  page: number
): Promise<Movies> => {
  const url = `/movie?count=15&page=${page}&genre=${genre}`;
  const response = await axiosInstance.get<Movies>(url);
  return response.data;
};

export const getAboutMovie = async (movieId: string): Promise<Movies> => {
  const url = `/movie/${movieId}`;
  const response = await axiosInstance.get<Movies>(url);
  return response.data;
};
