import { createSlice } from "@reduxjs/toolkit"
import { type PayloadAction } from "@reduxjs/toolkit"
import {ProductsResApiType} from "../../@types/ProductsResApiType.ts";

export interface ProductStateType {
  productList: ProductsResApiType[]
}

const initialState: ProductStateType = {
  productList: []
}

export const ProductSlice =  createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<ProductsResApiType[]>) => {
      state.productList = action.payload
    }
  }
})

export const {setProduct} = ProductSlice.actions

const ProductReducer = ProductSlice.reducer

export {ProductReducer}