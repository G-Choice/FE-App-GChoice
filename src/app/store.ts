import {configureStore} from '@reduxjs/toolkit'
import {AuthReducer, ProductReducer, SearchKeyReducer} from "../global-states"

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    product: ProductReducer,
    search: SearchKeyReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch