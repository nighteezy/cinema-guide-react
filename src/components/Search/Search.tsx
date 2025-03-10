import React, { FC, useEffect } from 'react';
import './Search.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import { fetchMovies, setClose, setQuery } from '../../store/searchSlive';
import { Film } from '../../interfaces';
import { Link } from 'react-router-dom';
import MovieInfo from '../MovieInfo/MovieInfo';
import { setMovie } from '../../store/movieSlice';

export const Search: FC = () => {
  const dispatch = useAppDispatch();
  const { query, results, isOpen, loading, error } = useAppSelector(
    (state: RootState) => state.search
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setQuery(value));
    if (value.length >= 1) {
      dispatch(fetchMovies(value));
    } else {
      dispatch(setClose());
    }
  };

  const handleClearInput = () => {
    dispatch(setQuery(''));
    dispatch(setClose());
  };

  const handleResultClick = (results: Film) => {
    dispatch(setQuery(results.title));
    dispatch(setClose());
  };

  const handleAboutMovie = (movieId: number) => {
    dispatch(setMovie(movieId));
  };

  useEffect(() => {
    if (query.length === 0) {
      dispatch(setClose());
    }
  }, [query, dispatch]);
  return (
    <div className="search-wrapper">
      <div className="search">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="search__icon"
        >
          <path
            d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
            fill="white"
            fillOpacity="0.5"
          />
        </svg>
        <input
          type="text"
          placeholder="Поиск"
          className="search__input"
          value={query}
          onChange={handleInputChange}
        />
        {query.length > 0 && (
          <button
            className="search__close btn-reset"
            onClick={handleClearInput}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"
                fill="white"
                fillOpacity="0.5"
              />
            </svg>
          </button>
        )}
      </div>
      {isOpen && (
        <ul className="search-results list-reset">
          {loading && <div className="loader"></div>}

          {error && <p className="error">{error}</p>}
          {!loading && !error && results.length > 0
            ? results.map((movie: Film) => (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  onClick={() => handleAboutMovie(movie.id)}
                >
                  <li onClick={() => handleResultClick(movie)}>
                    <div>
                      <img
                        src={movie.posterUrl}
                        className="search-results__img"
                        alt={movie.title}
                      />
                    </div>
                    <div className="search-results__info">
                      <MovieInfo
                        tmdbRating={movie.tmdbRating}
                        releaseYear={movie.releaseYear}
                        genre={movie.genres[0]}
                        runtime={movie.runtime}
                        pageClass="movie__info-search"
                        spanClass="movie__rating--font"
                      />
                      <h1 className="search__title title">{movie.title}</h1>
                    </div>
                  </li>
                </Link>
              ))
            : !loading && !error && <p>Нет результатов</p>}
        </ul>
      )}
    </div>
  );
};
