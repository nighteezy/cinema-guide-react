import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movies } from '../interfaces';
import { getAboutMovie, getMovieByGenre } from '../api/MovieApi';
import { RootState } from './store';

interface MovieState {
  movies: Movies;
  selectedMovie: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
  loading: false,
  error: null,
};

export const fetchMoviesByGenre = createAsyncThunk<
  Movies,
  { genre: string; count: number }
>('movies/fetchMoviesByGenre', async ({ genre, count }) => {
  const response = await getMovieByGenre(genre, count);
  return response;
});

export const fetchMovieById = createAsyncThunk(
  'movies/fetchById',
  async (id: string) => {
    const response = await getAboutMovie(id);
    return response;
  }
);

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovie: (state, action: PayloadAction<any>) => {
      state.selectedMovie = action.payload;
    },
    resetMovie: state => {
      state.selectedMovie = null;
    },
    resetMovieList: state => {
      state.movies = [];
    },
    addMovies: (state, action: PayloadAction<Movies>) => {
      const newMovies = action.payload.filter(
        newMovie =>
          !state.movies.some(existingMovie => existingMovie.id === newMovie.id)
      );
      state.movies.push(...newMovies);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMoviesByGenre.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.loading = false;
        state.movies.push(
          ...action.payload.filter(
            movie =>
              !state.movies.some(existingMovie => existingMovie.id === movie.id)
          )
        );
      })
      .addCase(fetchMoviesByGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке фильмов.';
      })
      .addCase(fetchMovieById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Ошибка при загрузке деталей фильма.';
      });
  },
});

export const { setMovie, resetMovie, resetMovieList } = movieSlice.actions;

export const selectMovies = (state: RootState) => state.movie.movies;
export const selectSelectedMovie = (state: RootState) =>
  state.movie.selectedMovie;
export const selectLoading = (state: RootState) => state.movie.loading;
export const selectError = (state: RootState) => state.movie.error;

export default movieSlice.reducer;
