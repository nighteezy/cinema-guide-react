import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginUser, profileUser } from '../api/AuthApi';
import { Login, Profile } from '../interfaces';
import { RootState } from './store';

interface AuthState {
  result: boolean;
  user: Profile | null;
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
    const authResponse = await LoginUser(email, password);
    return authResponse;
  }
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async () => {
    const response = await profileUser();
    return response;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
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
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.loading = false;
        state.result = false;
        state.error = action.error.message || 'Ошибка входа';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      });
  },
});

export default authSlice.reducer;
export const { logout, setUser } = authSlice.actions;

export const selectResult = (state: RootState) => state.auth.result;
export const selectUser = (state: RootState) => state.auth.user;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;
