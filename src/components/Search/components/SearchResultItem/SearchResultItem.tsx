import React from 'react';
import { Link } from 'react-router-dom';
import { Film } from '../../../../interfaces';
import MovieInfo from '../../../MovieInfo/MovieInfo';

interface SearchResultItemProps {
  movie: Film;
  onClick: (movie: Film) => void;
  onAboutMovie: (id: number) => void;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({
  movie,
  onClick,
  onAboutMovie,
}) => (
  <Link to={`/movie/${movie.id}`} onClick={() => onAboutMovie(movie.id)}>
    <li onClick={() => onClick(movie)}>
      <div>
        <img
          src={movie.posterUrl}
          className="search-results__img"
          alt={movie.title}
          loading="lazy"
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
);
