import React, { FC, useEffect, useState } from 'react';
import { Film, Movies } from '../../interfaces';
import { getFavorites } from '../../api/FavoritesApi';
import './Favorites.css';
import { Link } from 'react-router-dom';

const Favorites: FC = () => {
  const [movieList, setData] = useState<Movies>([]);
  const getData = async (): Promise<void> => {
    const data = await getFavorites();
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);
  if (movieList.length === 0) {
    return <p>Избранные фильмы отсутствуют.</p>;
  }

  return (
    <div className="favorites">
      <ul className="favorites__list list-reset">
        {movieList.map((film: Film, index) => (
          <Link to={`/movie/${movieList[index].id}`}>
            <li key={film.id} className="favorites__item">
              <img
                src={film.posterUrl}
                alt={`Постер фильма ${film.title}`}
                className="favorites__item-img"
              />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
