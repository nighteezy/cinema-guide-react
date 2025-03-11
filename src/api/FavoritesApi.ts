import { Movies } from '../interfaces';
import { Favorites } from '../interfaces/Favorites';
import axiosInstance from './axiosConfig';

export const getFavorites = async (): Promise<Movies> => {
  const url = `/favorites`;
  const response = await axiosInstance.get<Movies>(url);
  return response.data;
};

export const addFavorites = async (id: number): Promise<Favorites> => {
  const url = `/favorites`;
  const response = await axiosInstance.post(url, { id });
  return response.data;
};

export const deleteFavorites = async (id: number): Promise<Favorites> => {
  const url = `/favorites/${id}`;
  const response = await axiosInstance.delete(url);
  return response.data;
};
