import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { getSearchMovie } from '../api/SearchApi';
import { Movies } from '../interfaces';

interface SearchState {
  query: string;
  results: Movies;
  isOpen: boolean;
  loading: boolean;
  error: string | null;
}
const initialState: SearchState = {
  query: '',
  results: [],
  isOpen: false,
  loading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk(
  'search/fetchMovies',
  async (title: string) => {
    const movies = await getSearchMovie(title);
    return movies;
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.isOpen = action.payload.length > 0;
    },
    setClose: state => {
      state.isOpen = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.results = action.payload;
        state.loading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке';
      });
  },
});

export const { setQuery, setClose } = searchSlice.actions;
export default searchSlice.reducer;
export const selectIsOpen = (state: RootState) => state.search.isOpen;
