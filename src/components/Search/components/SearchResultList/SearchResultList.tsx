import React from 'react';
import { SearchResultItem } from '../SearchResultItem/SearchResultItem';
import { Film } from '../../../../interfaces';
import Loader from '../../../Loader/Loader';
import { ErrorMessage } from '../../../ErrorMessage/ErrorMessage';
import { EmptyState } from '../../../EmptyState/EmptyState';

interface SearchResultsListProps {
  loading: boolean;
  error: string | null;
  results: Film[];
  isOpen: boolean;
  onItemClick: (film: Film) => void;
  onAboutMovie: (id: number) => void;
}

export const SearchResultsList: React.FC<SearchResultsListProps> = ({
  loading,
  error,
  results,
  isOpen,
  onItemClick,
  onAboutMovie,
}) => {
  if (!isOpen) return null;
  return (
    <ul className="search-results list-reset" role="listbox">
      {loading && (
        <li className="search-results__status-item">
          <Loader />
        </li>
      )}
      {error && (
        <li className="search-results__status-item">
          <ErrorMessage error={error} />
        </li>
      )}
      {!loading && !error && results.length === 0 && (
        <li className="search-results__status-item">
          <EmptyState
            title="Ничего не найдено"
            description="Попробуйте изменить запрос"
          />
        </li>
      )}
      {results.map(movie => (
        <SearchResultItem
          key={movie.id}
          movie={movie}
          onClick={onItemClick}
          onAboutMovie={onAboutMovie}
        />
      ))}
    </ul>
  );
};
