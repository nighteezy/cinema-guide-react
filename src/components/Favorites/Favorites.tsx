import React, { FC, useEffect, useState } from 'react';
import { Movies } from '../../interfaces';
import { deleteFavorites, getFavorites } from '../../api/FavoritesApi';
import './Favorites.css';
import { Link } from 'react-router-dom';
import ButtonClose from '../ButtonClose/ButtonClose';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/authSlice';

const Favorites: FC = () => {
  const user = useAppSelector(selectUser); // Добавлено
  const [movieList, setData] = useState<Movies>([]);
  const [hoveredMovieId, setHoveredMovieId] = useState<number | null>(null);

  const getData = async () => {
    try {
      const data = await getFavorites();
      setData(data);
    } catch (error) {
      setData([]);
    }
  };

  useEffect(() => {
    if (user) {
      getData();
    } else {
      setData([]);
    }
  }, [user]);

  if (movieList.length === 0) {
    return <p>Избранные фильмы отсутствуют.</p>;
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteFavorites(id);
      setData(movieList.filter(movie => movie.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
  };

  return (
    <div className="favorites">
      <ul className="favorites__list list-reset">
        {movieList.map(film => (
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
