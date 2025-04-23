import React from 'react';
import SearchIcon from '../../../icons/SerachIcon';
import CloseIcon from '../../../icons/CloseIcon';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Поиск',
}) => (
  <div className="search">
    <SearchIcon />
    <input
      type="text"
      placeholder={placeholder}
      className="search__input"
      value={value}
      onChange={onChange}
      aria-label="Поиск фильмов"
    />
    {value && (
      <button
        className="search__close btn-reset"
        onClick={onClear}
        aria-label="Очистить поиск"
      >
        <CloseIcon />
      </button>
    )}
  </div>
);
