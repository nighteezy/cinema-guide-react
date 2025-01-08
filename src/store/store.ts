import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';
import searchReducer from './searchSlive';
import genreReducer from './genreSlice';
import authReducer from './authSlice';
import modalReducer from './modalSlice';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    search: searchReducer,
    genre: genreReducer,
    auth: authReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
