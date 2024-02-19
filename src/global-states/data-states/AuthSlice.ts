import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import GchoiceAxios from '../../api';


interface AuthState {
  authToken: string;
  refreshToken: string;
}

const initialState: AuthState = {
  authToken: '',
  refreshToken: '',
};

export const refreshAccessToken = createAsyncThunk(
  'auth/refresh',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { refreshToken } = (getState() as RootState).auth;

    try {
      const response = await GchoiceAxios.post('/auth/refresh', {
        refreshToken: refreshToken
      });

      const newAccessToken = response.data.accessToken;

      dispatch(setAuth({ authToken: newAccessToken, refreshToken }));

      return newAccessToken;
    } catch (error) {
      dispatch(logout());
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.authToken = action.payload.authToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.authToken = '';
      state.refreshToken = '';
    },
  },
});

export const { setAuth, logout } = authSlice.actions;

const AuthReducer = authSlice.reducer;

export { AuthReducer };