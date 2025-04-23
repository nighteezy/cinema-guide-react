import React, { FC, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchMovies, setClose, setQuery } from '../../store/searchSlive';
import { SearchInput } from './components/SearchInput/SearchInput';
import { SearchResultsList } from './components/SearchResultList/SearchResultList';
import { setMovie } from '../../store/movieSlice';
import { Film } from '../../interfaces';
import './Search.css';

export const Search: FC = () => {
  const dispatch = useAppDispatch();
  const { query, results, isOpen, loading, error } = useAppSelector(
    state => state.search
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      dispatch(setQuery(value));

      if (value.length >= 1) {
        dispatch(fetchMovies(value));
      } else {
        dispatch(setClose());
      }
    },
    [dispatch]
  );

  const handleClearInput = useCallback(() => {
    dispatch(setQuery(''));
    dispatch(setClose());
  }, [dispatch]);

  const handleResultClick = useCallback(
    (film: Film) => {
      dispatch(setQuery(film.title));
      dispatch(setClose());
    },
    [dispatch]
  );

  const handleAboutMovie = useCallback(
    (movieId: number) => {
      dispatch(setMovie(movieId));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!query.length) {
      dispatch(setClose());
    }
  }, [query, dispatch]);

  return (
    <div className="search-wrapper">
      <SearchInput
        value={query}
        onChange={handleInputChange}
        onClear={handleClearInput}
      />

      <SearchResultsList
        loading={loading}
        error={error}
        results={results}
        isOpen={isOpen} // Передаем состояние открытия
        onItemClick={handleResultClick}
        onAboutMovie={handleAboutMovie}
      />
    </div>
  );
};
