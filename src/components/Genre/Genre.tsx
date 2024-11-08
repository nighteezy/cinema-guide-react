import React, { FC, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchMoviesByGenre,
  setMovie,
  selectMovies,
  selectLoading,
  selectError,
  resetMovieList,
} from '../../store/movieSlice';
import './Genre.css';

export const Genre: FC = () => {
  const dispatch = useAppDispatch();
  const { genreName } = useParams<{ genreName: string }>();
  const movieList = useAppSelector(selectMovies);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    if (genreName) {
      dispatch(resetMovieList());
      dispatch(fetchMoviesByGenre({ genre: genreName, count: 0 }));
    }
  }, [genreName, dispatch]);

  const loadMoreMovies = () => {
    dispatch(
      fetchMoviesByGenre({ genre: genreName || '', count: movieList.length })
    );
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
        {genreName}
      </h2>

      {error && <p className="error">{error}</p>}
      {loading && <p>Загрузка...</p>}

      <ul className="list-reset genre__list">
        {Array.isArray(movieList) && movieList.length > 0 ? (
          movieList.map((movie, index) => (
            <li className="genre__item" key={`${movie.id}-${index}`}>
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
          ))
        ) : (
          <p>Нет фильмов в этом жанре.</p>
        )}
      </ul>

      <button
        onClick={loadMoreMovies}
        className="genre__btn btn-reset btn-primary"
      >
        Показать ещё
      </button>
    </div>
  );
};

export default Genre;
