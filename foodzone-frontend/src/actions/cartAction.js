import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from '../constants/cartConstants';

import axios from 'axios';
import { API } from '../global';
//add to cart
//getstate used to access state
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`${API}/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    },
  });

  //saving to avoid data lost after reloading
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

//remove from cart

export const removeItemsFromCart = id => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });
  localStorage.removeItem(
    'cartItems',
    JSON.stringify(getState().cart.cartItems)
  );

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

//save shipping info

export const saveShippingInfo = data => async dispatch => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  sessionStorage.setItem('shippingInfo', JSON.stringify(data));
};
