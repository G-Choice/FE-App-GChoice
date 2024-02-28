import { createSlice } from "@reduxjs/toolkit"
import { type PayloadAction } from "@reduxjs/toolkit"

export interface SearchStateType {
  searchKeys: string[]
}

const initialState: SearchStateType = {
  searchKeys: []
}

export const SearchKeySlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    saveSearchKey: (state, action: PayloadAction<string>) => {
      state.searchKeys.push(action.payload);
    },
  }
})

export const {saveSearchKey} = SearchKeySlice.actions

const SearchKeyReducer = SearchKeySlice.reducer

export {SearchKeyReducer}