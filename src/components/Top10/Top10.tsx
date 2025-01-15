import { FC, useEffect, useState } from 'react';
import { Movies } from '../../interfaces';
import React from 'react';
import { getTop10Movie } from '../../api/MovieApi';
import { Link } from 'react-router-dom';
import './Top10.css';
import { useAppDispatch } from '../../store/hooks';
import { setMovie } from '../../store/movieSlice';
import Loading from '../Loader/Loader';

export const Top10: FC = () => {
  const [data, setData] = useState<Movies>([]);
  const dispatch = useAppDispatch();

  const getData = async (): Promise<void> => {
    const data = await getTop10Movie();
    const topRatedMovies = data;

    setData(topRatedMovies);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleMovieClick = (movie: any) => {
    dispatch(setMovie(movie));
  };

  return (
    <div>
      <div className="top10">
        <h2 className="top10__title">Топ 10 фильмов</h2>
        <ul className="top10__list list-reset">
          {data.map((movie, index) => (
            <div className="top10__item" key={movie.id}>
              <Link
                className="top10__link"
                to={`/movie/${data[index].id}`}
                onClick={() => handleMovieClick(movie)}
                key={data[index].id}
              >
                <span className="top10__place">{index + 1}</span>
                {movie.posterUrl ? (
                  <img
                    src={movie.posterUrl}
                    className="top10__img"
                    alt={`Постер фильма ${movie.title}`}
                  />
                ) : (
                  <span className="top10__alt">{movie.title}</span>
                )}
              </Link>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Top10;
