import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movies, Movie } from '../../interfaces';
import { getTop10Movie } from '../../api/MovieApi';
import { useAppDispatch } from '../../store/hooks';
import { setMovie } from '../../store/movieSlice';
import Loader from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { EmptyState } from '../EmptyState/EmptyState';
import './Top10.css';

export const Top10: FC = () => {
  const [movies, setMovies] = useState<Movies>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const fetchTopMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTop10Movie();
      setMovies(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Не удалось загрузить топ фильмов'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopMovies();
  }, []);

  const handleMovieClick = (movie: Movie) => {
    dispatch(setMovie(movie));
  };

  const renderContent = () => {
    if (loading) return <Loader />;
    if (error) return <ErrorMessage error={error} />;
    if (movies.length === 0)
      return (
        <EmptyState
          title="Топ фильмов пуст"
          description="Попробуйте обновить страницу"
        />
      );

    return (
      <ul className="top10__list list-reset">
        {movies.map((movie, index) => (
          <li key={movie.id} className="top10__item">
            <Link
              to={`/movie/${movie.id}`}
              onClick={() => handleMovieClick(movie)}
              className="top10__link"
              aria-label={`Фильм ${index + 1}: ${movie.title}`}
            >
              <span className="top10__place">{index + 1}</span>
              {movie.posterUrl ? (
                <img
                  src={movie.posterUrl}
                  className="top10__img"
                  alt={`Постер ${movie.title}`}
                  loading="lazy"
                  width={150}
                  height={225}
                />
              ) : (
                <span className="top10__alt">{movie.title}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className="top10">
      <h2 className="top10__title">Топ 10 фильмов</h2>
      {renderContent()}
    </section>
  );
};
