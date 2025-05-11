import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchMoviesByGenre, setMovie } from '../../store/movieSlice';
import { useLoadMoviesByGenre } from '../../hooks/useLoadMoviesByGenre';
import Loading from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import './Genre.css';
import { EmptyState } from '../EmptyState/EmptyState';

const Genre: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { genreName } = useParams<{ genreName: string }>();
  const movieList = useAppSelector(state => state.movie.movies);
  const loading = useAppSelector(state => state.movie.loading);
  const error = useAppSelector(state => state.movie.error);

  useLoadMoviesByGenre(genreName);

  const loadMoreMovies = () => {
    if (!genreName) return;
    dispatch(fetchMoviesByGenre({ genre: genreName, count: movieList.length }));
  };

  const handleMovieToStorage = (movieId: number) => {
    const movie = movieList.find(m => m.id === movieId);
    if (movie) {
      dispatch(setMovie(movie));
    }
  };

  return (
    <div className="genre">
      <h2 className="genre__title title-secondary">
        <button
          onClick={() => navigate(-1)}
          className="genre__back-btn btn-reset"
          aria-label="Вернуться к списку жанров"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.048 20.0012L26.2977 28.2507L23.9407 30.6077L13.334 20.0012L23.9407 9.39453L26.2977 11.7515L18.048 20.0012Z"
              fill="white"
            />
          </svg>
        </button>
        {genreName}
      </h2>

      {error && <ErrorMessage error={error} className="genre__error" />}
      {!error && loading && !movieList.length && <Loading />}
      {!loading && movieList.length === 0 && !error && (
        <EmptyState title={`Нет фильмов в жанре "${genreName}"`} />
      )}

      {!loading && movieList.length > 0 && (
        <ul className="list-reset genre__list">
          {movieList.map(movie => (
            <li className="genre__item" key={movie.id}>
              <Link
                onClick={() => handleMovieToStorage(movie.id)}
                className="genre__link"
                to={`/movie/${movie.id}`}
              >
                <img
                  src={movie.posterUrl}
                  className="genre__img"
                  alt={movie.title}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={loadMoreMovies}
        disabled={loading}
        className="genre__btn btn-reset btn-primary"
      >
        {loading ? 'Загрузка...' : 'Показать ещё'}
      </button>
    </div>
  );
};

export default Genre;
