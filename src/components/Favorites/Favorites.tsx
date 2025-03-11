import React, { FC, useEffect, useState } from 'react';
import { Film, Movies } from '../../interfaces';
import { deleteFavorites, getFavorites } from '../../api/FavoritesApi';
import './Favorites.css';
import { Link } from 'react-router-dom';
import ButtonClose from '../ButtonClose/ButtonClose';

const Favorites: FC = () => {
  const [movieList, setData] = useState<Movies>([]);
  const [hoveredMovieId, setHoveredMovieId] = useState<number | null>(null);
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

  const handleDelete = async (id: number) => {
    try {
      await deleteFavorites(id.toString());
      setData(movieList.filter(movie => movie.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении из избранного:', error);
    }
  };

  return (
    <div className="favorites">
      <ul className="favorites__list list-reset">
        {movieList.map((film: Film) => (
          <div
            key={film.id}
            className="favorites__item"
            onMouseEnter={() => setHoveredMovieId(film.id)}
            onMouseLeave={() => setHoveredMovieId(null)}
          >
            <Link to={`/movie/${film.id}`}>
              <img
                src={film.posterUrl}
                alt={`Постер фильма ${film.title}`}
                className="favorites__item-img"
              />
            </Link>
            {hoveredMovieId === film.id && (
              <ButtonClose
                className="favorites__btn-delete"
                onClick={() => handleDelete(film.id)}
              />
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
