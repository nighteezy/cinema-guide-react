import { FC, useEffect, useState } from 'react';
import { Movies } from '../../interfaces';
import React from 'react';
import { getTop10Movie } from '../../api/MovieApi';
import { Link } from 'react-router-dom';
import './Top10.css';

export const Top10: FC = () => {
  const [data, setData] = useState<Movies>([]);

  const getData = async (): Promise<void> => {
    const data = await getTop10Movie();
    const topRatedMovies = data
      .filter(movie => movie.posterUrl && movie.tmdbRating > 0)
      .sort((a, b) => b.tmdbRating - a.tmdbRating)
      .slice(0, 10);

    setData(topRatedMovies);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <div className="top10">
        <h2 className="top10__title">Топ 10 фильмов</h2>

        <ul className="top10__list list-reset">
          {data.map((movie, index) => (
            <div className="top10__item" key={movie.id}>
              <Link
                className="top10__link"
                to={`/movie/${data[index].id}`}
                key={data[index].id}
              >
                <span className="top10__place">{index + 1}</span>
                <img
                  src={movie.posterUrl}
                  className="top10__img"
                  alt={`Постер фильма ${movie.title}`}
                />
              </Link>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
