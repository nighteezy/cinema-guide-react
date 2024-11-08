import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchMovieById,
  selectLoading,
  selectError,
  selectSelectedMovie,
  resetMovie,
} from '../../store/movieSlice';

import Movie from '../../components/Movie/Movie';
import AboutMovie from '../../components/AboutMovie/AboutMovie';

const MoviePage: FC = () => {
  const dispatch = useAppDispatch();
  const { movieId } = useParams<{ movieId: string }>();
  const movie = useAppSelector(selectSelectedMovie);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    if (movieId) {
      dispatch(resetMovie());
      dispatch(fetchMovieById(movieId));
    }
  }, [movieId, dispatch]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!movie) return <p>Фильм не найден.</p>;

  return (
    <div>
      <Movie data={movie} />
      <AboutMovie data={movie} />
    </div>
  );
};

export default MoviePage;
