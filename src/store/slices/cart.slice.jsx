import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../helpers/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart:(state,action)=>{
            return action.payload;
        }
    }
})
// 
export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .get("https://e-commerce-api.academlo.tech/api/v1/cart",getConfig())
      .then((res) => {
        dispatch(setCart(res.data.data.cart.products)); 
        })
      .catch(()=>dispatch(setCart([])))
      .finally(() => dispatch(setIsLoading(false)));
  };

  export const confirmCartThunk = (data) => (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .post("https://e-commerce-api.academlo.tech/api/v1/cart",data,getConfig())
      .then((res) => console.log(res))
      .finally(() => dispatch(setIsLoading(false)));
  };

  export const addToCartThunk = (data) => (dispatch) => {
    dispatch(setIsLoading(true));
    axios.post("https://e-commerce-api.academlo.tech/api/v1/cart",data,getConfig())
      .then((res) => dispatch(getCartThunk()))
      .finally(() => dispatch(setIsLoading(false)));
  };

  export const deletePorductCartThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    axios.delete("https://e-commerce-api.academlo.tech/api/v1/cart/"+id,getConfig())
      .then((res) => dispatch(getCartThunk()))
      .finally(() => dispatch(setIsLoading(false)));
  };

  export const cartPurchaseThunk = (data) => (dispatch) => {
    dispatch(setIsLoading(true));
    axios.post("https://e-commerce-api.academlo.tech/api/v1/purchases",data,getConfig())
      .then((res) => dispatch(setCart([])))
      .finally(() => dispatch(setIsLoading(false)));
  };

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
