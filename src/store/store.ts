import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';
import searchReducer from './searchSlive';
import genreReducer from './genreSlice';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    search: searchReducer,
    genre: genreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
