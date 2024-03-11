import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import GchoiceAxios from '../../api';


interface AuthState {
  authToken: string;
  refreshToken: string;
  userInfo: any; // Add userInfo to store user information
}

const initialState: AuthState = {
  authToken: '',
  refreshToken: '',
  userInfo: null,
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
      await dispatch(fetchUserInfo(newAccessToken));

      return newAccessToken;
    } catch (error) {
      dispatch(logout());
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchUserInfo = createAsyncThunk(
  'auth/fetchUserInfo',
  async (accessToken: string, { dispatch, rejectWithValue }) => {
    try {
      const userResponse = await GchoiceAxios.get('/user/currentUser', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      dispatch(updateUserInfo(userResponse.data));

      return userResponse.data;
    } catch (error) {
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
      state.userInfo = null; // Reset user information on logout
    },
    updateUserInfo: (state, action: PayloadAction<any>) => {
      console.log('updateUserInfo action:', action);
      state.userInfo = action.payload;
    },
  },
});

export const { setAuth, logout, updateUserInfo } = authSlice.actions;

const AuthReducer = authSlice.reducer;

export { AuthReducer };
