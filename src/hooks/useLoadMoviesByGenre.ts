import { useEffect } from 'react';
import { fetchMoviesByGenre, resetMovieList } from '../store/movieSlice';
import { useAppDispatch } from '../store/hooks';

export const useLoadMoviesByGenre = (genreName: string | undefined) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetMovieList());
    if (genreName) {
      dispatch(fetchMoviesByGenre({ genre: genreName, count: 0 }));
    }
  }, [genreName, dispatch]);
};
