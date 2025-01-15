import React, { FC, useEffect, useState } from 'react';
import { Film, Movies } from '../../interfaces';
import { deleteFavorites, getFavorites } from '../../api/FavoritesApi';
import './Favorites.css';
import { Link } from 'react-router-dom';

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
            <Link to={'#'}>
              <img
                src={film.posterUrl}
                alt={`Постер фильма ${film.title}`}
                className="favorites__item-img"
              />
            </Link>
            {hoveredMovieId === film.id && (
              <button
                className="favorites__btn-delete"
                onClick={e => {
                  e.stopPropagation();
                  handleDelete(film.id);
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.9997 5.5865L11.9495 0.636719L13.3637 2.05093L8.4139 7.0007L13.3637 11.9504L11.9495 13.3646L6.9997 8.4149L2.04996 13.3646L0.635742 11.9504L5.5855 7.0007L0.635742 2.05093L2.04996 0.636719L6.9997 5.5865Z"
                    fill="black"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
