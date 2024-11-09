import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginUser } from '../api/AuthApi';
import { Login } from '../interfaces';
import { RootState } from './store';

interface AuthState {
  result: boolean;
  user: object | null;
  loading: boolean;
  error: string | null;
}

interface AuthCredentials {
  email: string;
  password: string;
}

const initialState: AuthState = {
  result: false,
  user: null,
  loading: false,
  error: null,
};

export const fetchAuth = createAsyncThunk<Login, AuthCredentials>(
  'auth/fetchAuth',
  async ({ email, password }) => {
    const auth = await LoginUser(email, password);
    return auth;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.result = false;
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAuth.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.result = true;
        state.user = action.payload;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.loading = false;
        state.result = false;
        state.error = action.error.message || 'Ошибка входа';
      });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
export const SelectResult = (state: RootState) => state.auth.result;
export const selectUser = (state: RootState) => state.auth.user;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;
