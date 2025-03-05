import { FC, useEffect, useState } from 'react';
import React from 'react';
import { Film } from '../../interfaces';
import './Movie.css';
import { Link } from 'react-router-dom';
import MovieInfo from '../MovieInfo/MovieInfo';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/authSlice';
import {
  addFavorites,
  deleteFavorites,
  getFavorites,
} from '../../api/FavoritesApi';
import { closeModal, openModal, selectModal } from '../../store/modalSlice';
import { getRandomMovie } from '../../api/MovieApi';
import Modal from 'react-modal';
import ReactPlayer from 'react-player';
import ButtonClose from '../ButtonClose/ButtonClose';

type TProps = {
  data: Film;
  getData?: () => Promise<void>;
};

export const Movie: FC<TProps> = ({ data, getData }) => {
  const user = useAppSelector(selectUser);
  const { isOpen, activeModal } = useAppSelector(selectModal);
  const dispatch = useAppDispatch();
  const [movieData, setMovieData] = useState<Film>(data);
  const [isPlaying, setIsPlaying] = useState(false);
  const [movieList, setMovieList] = useState<string[]>([]);
  const [titleVisible, setTitleVisible] = useState(false);
  const [btnCloseVisible, setBtnCloseVisible] = useState(false);

  if (!data) {
    return <p>Данные о фильме не загружены.</p>;
  }
  const primaryGenre =
    data.genres && data.genres.length > 0 ? data.genres[0] : 'Не указано';

  const getFavorit = async (): Promise<void> => {
    const favorit = await getFavorites();
    setMovieList(favorit.map(movie => movie.id.toString()));
  };

  useEffect(() => {
    getFavorit();
  }, []);

  const handleFavorites = async () => {
    if (!user) {
      dispatch(openModal('trailer'));
      return;
    }
    const isFavorite = movieList.includes(data.id.toString());
    try {
      if (isFavorite) {
        await deleteFavorites(data.id.toString());
        setMovieList(movieList.filter(id => id !== data.id.toString()));
      } else {
        await addFavorites(data.id);
        setMovieList([...movieList, data.id.toString()]);
      }
    } catch (error) {
      console.error('Ошибка при добавлении/удалении из избранных:', error);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setTitleVisible(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
    setTitleVisible(true);
  };

  const handleTrailer = async () => {
    dispatch(openModal('trailer'));
    setIsPlaying(true);
    setBtnCloseVisible(true);
  };

  const handleUpdateMovie = async () => {
    try {
      if (getData) {
        await getData();
        setMovieData(data);
      } else {
        const newMovieData = await getRandomMovie();
        setMovieData(newMovieData);
      }
    } catch (error) {
      console.error('Ошибка при обновлении фильма:', error);
    }
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    setIsPlaying(false);
    setTitleVisible(false);
    setBtnCloseVisible(false);
  };

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(var(--color-black-rgb), 0.75)',
      zIndex: 1000,
    },
  };

  return (
    <div className="movie">
      <div className="movie__wrapper">
        <img
          className="movie__img"
          src={data.backdropUrl}
          alt={`Постер фильма ${data.title}`}
        />
      </div>

      <div className="movie__card">
        <MovieInfo
          tmdbRating={data.tmdbRating}
          releaseYear={data.releaseYear}
          genre={primaryGenre}
          runtime={data.runtime}
        />
        <h1 className="movie__title title">{data.title}</h1>
        <p className="movie__descr">{data.plot}</p>

        <ul className="movie__btns list-reset">
          <li className="movie__btns-item" onClick={handleTrailer}>
            <button className="movie__btns-trailer">Трейлер</button>
          </li>
          {getData && (
            <li className="movie__btns-item">
              <Link to={`/movie/${data.id}`} key={data.id}>
                <button className="movie__btns-about">О фильме</button>
              </Link>
            </li>
          )}
          <li className="movie__btns-item">
            <button className="movie__btns-favorite" onClick={handleFavorites}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5 0C17.5376 0 20 2.5 20 6C20 13 12.5 17 10 18.5C7.5 17 0 13 0 6C0 2.5 2.5 0 5.5 0C7.35997 0 9 1 10 2C11 1 12.64 0 14.5 0ZM10.9339 15.6038C11.8155 15.0485 12.61 14.4955 13.3549 13.9029C16.3337 11.533 18 8.9435 18 6C18 3.64076 16.463 2 14.5 2C13.4241 2 12.2593 2.56911 11.4142 3.41421L10 4.82843L8.5858 3.41421C7.74068 2.56911 6.5759 2 5.5 2C3.55906 2 2 3.6565 2 6C2 8.9435 3.66627 11.533 6.64514 13.9029C7.39 14.4955 8.1845 15.0485 9.0661 15.6038C9.3646 15.7919 9.6611 15.9729 10 16.1752C10.3389 15.9729 10.6354 15.7919 10.9339 15.6038Z"
                  fill="white"
                />
              </svg>
            </button>
          </li>
          {getData && (
            <li className="movie__btns-item">
              <button
                className="movie__btns-update"
                onClick={handleUpdateMovie}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4C14.7486 4 17.1749 5.38626 18.6156 7.5H16V9.5H22V3.5H20V5.99936C18.1762 3.57166 15.2724 2 12 2C6.47715 2 2 6.47715 2 12H4C4 7.58172 7.58172 4 12 4ZM20 12C20 16.4183 16.4183 20 12 20C9.25144 20 6.82508 18.6137 5.38443 16.5H8V14.5H2V20.5H4V18.0006C5.82381 20.4283 8.72764 22 12 22C17.5228 22 22 17.5228 22 12H20Z"
                    fill="white"
                  />
                </svg>
              </button>
            </li>
          )}
        </ul>
      </div>

      <Modal
        isOpen={isOpen && activeModal === 'trailer'}
        className="movie__player"
        style={customStyles}
      >
        <ReactPlayer
          width="100%"
          height="100%"
          url={data.trailerUrl}
          playing={isPlaying}
          onPlay={handlePlay}
          onPause={handlePause}
        />

        {titleVisible && (
          <div className="movie__player-container">
            <h2 className="container__text">{data.title}</h2>
          </div>
        )}

        {btnCloseVisible && (
          <ButtonClose onClick={handleCloseModal} className="btn-close" />
        )}
      </Modal>
    </div>
  );
};

export default Movie;
