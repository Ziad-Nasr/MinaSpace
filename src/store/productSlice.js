import { createSlice, combineReducers } from "@reduxjs/toolkit";

const initialProductState = [];

const productsSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    setNewProductList: (state, action) => {
      return action.payload;
    },
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    removeProduct: (state, action) => {
      return state.filter((obj) => obj.name !== action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) state[index] = action.payload;
    },
  },
});
export const productReducer = productsSlice.reducer;
export const productActions = productsSlice.actions;
