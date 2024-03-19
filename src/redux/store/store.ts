import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { AuthReducer, ProductReducer, SearchKeyReducer } from '../../global-states';
import   {groupReducer, cartreducer} from '../reducers/reducer';
const rootReducer = combineReducers({
  auth: AuthReducer,
  product: ProductReducer,
  search: SearchKeyReducer,
  group: groupReducer,
  cartGroup: cartreducer
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
