import React, { FC } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { Link } from 'react-router-dom';
import { setGenre } from '../../store/genreSlice';
import { genres } from '../../interfaces';
import './GenresList.css';

const GenresList: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="genres">
      <h2 className="genres__title title-secondary">Жанры фильмов</h2>
      <ul className="list-reset genres__list">
        {genres.map(genre => (
          <Link
            key={genre.en}
            onClick={() => {
              dispatch(setGenre(genre));
            }}
            className="genres__link"
            to={`/genre/${genre.en}`}
          >
            <div className="genres__item" key={genre.en}>
              <img src={'/images/' + genre.en + '.jpg'} className="genre-img" />
              <span className="genres__text">{genre.ru}</span>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default GenresList;
