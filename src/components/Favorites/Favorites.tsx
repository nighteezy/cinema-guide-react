import React, { FC, useEffect, useState } from 'react';
import { Movies } from '../../interfaces';
import { deleteFavorites, getFavorites } from '../../api/FavoritesApi';
import './Favorites.css';
import { Link } from 'react-router-dom';
import ButtonClose from '../ButtonClose/ButtonClose';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/authSlice';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import Loading from '../Loader/Loader';
import { EmptyState } from '../EmptyState/EmptyState';

interface FavoritesState {
  data: Movies;
  loading: boolean;
  error: string | null;
}

const Favorites: FC = () => {
  const user = useAppSelector(selectUser);
  const [state, setState] = useState<FavoritesState>({
    data: [],
    loading: false,
    error: null,
  });
  const [hoveredMovieId, setHoveredMovieId] = useState<number | null>(null);

  const loadFavorites = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await getFavorites();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: [],
        loading: false,
        error: 'Ошибка загрузки избранных фильмов',
      });
    }
  };

  const handleDelete = async (id: number) => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      await deleteFavorites(id);
      setState(prev => ({
        ...prev,
        data: prev.data.filter(movie => movie.id !== id),
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Ошибка при удалении фильма',
        loading: false,
      }));
    }
  };

  useEffect(() => {
    if (user) {
      loadFavorites();
    } else {
      setState({ data: [], loading: false, error: null });
    }
  }, [user]);

  const { data, loading, error } = state;

  if (loading && !data.length) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (data.length === 0) {
    return (
      <EmptyState
        title="Избранные фильмы отсутствуют"
        description="Выберите понравившиеся фильмы и добавьте их в избранное"
      />
    );
  }

  return (
    <div className="favorites">
      <ul className="favorites__list list-reset">
        {data.map(film => (
          <li
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
