import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../interfaces';
import { RootState } from './store';

interface MovieState {
  data: Movie;
}

const initialState: MovieState = {
  data: null,
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovie: (state, action: PayloadAction<Movie>) => {
      state.data = action.payload;
    },
  },
});

export const { setMovie } = movieSlice.actions;
export default movieSlice.reducer;
export const selectMovie = (state: RootState) => state.movie.data;
