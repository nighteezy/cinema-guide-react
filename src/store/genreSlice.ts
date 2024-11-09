import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Genres } from '../interfaces';
import { getGenre } from '../api/GenreApi';
import { RootState } from './store';

interface GenreState {
  data: Genres;
  loading: boolean;
  error: string | null;
}

const initialState: GenreState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchGenres = createAsyncThunk('genre/fetchGenres', async () => {
  const genres = await getGenre();
  return genres;
});

export const genreSlice = createSlice({
  name: 'genre',
  initialState,
  reducers: {
    setGenre: (state, action: PayloadAction<Genres>) => {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGenres.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке';
      });
  },
});

export const { setGenre } = genreSlice.actions;
export default genreSlice.reducer;
export const selectGenre = (state: RootState) => state.genre.data;
