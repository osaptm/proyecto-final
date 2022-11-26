import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";

export const productsSlice = createSlice({
  name: "news",
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    }
  }
});

export const getProductsThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  axios
    .get("https://e-commerce-api.academlo.tech/api/v1/products")
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const filterProductsThunk = (idcat) => (dispatch) => {
  dispatch(setIsLoading(true));
  axios
    .get("https://e-commerce-api.academlo.tech/api/v1/products?category="+idcat)
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const filterSearchThunk = (inputSearch) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get(
      `https://e-commerce-api.academlo.tech/api/v1/products?query=${inputSearch}`
    )
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
};


export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;