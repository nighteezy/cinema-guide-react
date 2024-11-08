import React, { FC, useEffect, useState } from 'react';
import { Movie } from '../Movie/Movie';
import { Film } from '../../interfaces';
import { useAppDispatch } from '../../store/hooks';
import { getRandomMovie } from '../../api/MovieApi';
import { setMovie } from '../../store/movieSlice';

export const RandomMovie: FC = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Film | null>(null);

  const getData = async () => {
    const data = await getRandomMovie();
    setData(data);
    dispatch(setMovie(data));
    sessionStorage.setItem('movie', JSON.stringify(data));
  };

  useEffect(() => {
    getData();
  }, []);

  if (data) {
    return (
      <div className="random-movie">
        <Movie data={data} getData={getData} />
      </div>
    );
  }
};

export default RandomMovie;
