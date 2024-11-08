import React from 'react';
import { getRatingClass } from '../utils/getRatingClass';
import { getFormattedRating } from '../utils/getFormattedRating';
import { getTimeForMins } from '../utils/getTimeForMins';
import './MovieInfo.css';

interface MovieInfoProps {
  tmdbRating: number;
  releaseYear: number;
  genre: string;
  runtime: number;
  pageClass?: string;
  spanClass?: string;
}

const MovieInfo: React.FC<MovieInfoProps> = ({
  tmdbRating,
  releaseYear,
  genre,
  runtime,
  pageClass,
  spanClass,
}) => {
  return (
    <div className={`movie__info ${pageClass}`}>
      <span className={`${getRatingClass(tmdbRating)} ${spanClass}`}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.00105 12.1733L3.29875 14.8054L4.34897 9.51991L0.392578 5.86118L5.74394 5.22669L8.00105 0.333313L10.2581 5.22669L15.6095 5.86118L11.6531 9.51991L12.7033 14.8054L8.00105 12.1733Z"
            fill="white"
          />
        </svg>
        {getFormattedRating(tmdbRating)}
      </span>
      <span className="movie__release">{releaseYear}</span>
      <span className="movie__genre">{genre}</span>
      <span className="movie__runtime">{getTimeForMins(runtime)}</span>
    </div>
  );
};

export default MovieInfo;
