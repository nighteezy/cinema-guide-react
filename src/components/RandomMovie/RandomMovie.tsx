import React, { FC, useEffect, useState, useCallback, useMemo } from 'react';
import { Movie } from '../Movie/Movie';
import { Film } from '../../interfaces';
import { useAppDispatch } from '../../store/hooks';
import { getRandomMovie } from '../../api/MovieApi';
import { setMovie } from '../../store/movieSlice';
import Loader from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import './RandomMovie.css';

export const RandomMovie: FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const [movie, setMovieData] = useState<Film | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRandomMovie = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRandomMovie();
      setMovieData(data);
      dispatch(setMovie(data));
      sessionStorage.setItem('movie', JSON.stringify(data));
    } catch (err) {
      const errorObj =
        err instanceof Error
          ? err
          : new Error('Не удалось загрузить случайный фильм');
      setError(errorObj);
      console.error('Error fetching random movie:', errorObj);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchRandomMovie();
  }, [fetchRandomMovie]);

  const handleRetry = useCallback(() => {
    fetchRandomMovie();
  }, [fetchRandomMovie]);

  const errorState = useMemo(
    () => (
      <div className="random-movie__error">
        <ErrorMessage error={error || new Error('Неизвестная ошибка')} />
      </div>
    ),
    [error, handleRetry]
  );

  const loader = useMemo(
    () => (
      <div className="random-movie__loader">
        <Loader />
      </div>
    ),
    []
  );

  const movieContent = useMemo(() => {
    if (!movie) return null;
    return (
      <section className="random-movie" aria-label="Случайный фильм">
        <Movie data={movie} getData={fetchRandomMovie} />
      </section>
    );
  }, [movie, fetchRandomMovie]);

  if (loading) return loader;
  if (error) return errorState;
  if (!movie)
    return (
      <div className="random-movie__empty">
        <ErrorMessage error={new Error('Фильм не найден')} />
      </div>
    );

  return movieContent;
});

RandomMovie.displayName = 'RandomMovie';
