import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { AuthReducer, ProductReducer, SearchKeyReducer } from '../../global-states';
import groupReducer from '../reducers/groupReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  product: ProductReducer,
  search: SearchKeyReducer,
  group: groupReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
