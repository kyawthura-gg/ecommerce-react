import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";
import { formatNumber } from "../utils/formatNumber";

export const addToCart = (slug, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${slug}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data.slug,
      name: data.name,
      image: data.image,
      price: formatNumber(data.price),
      count_stock: data.count_stock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (slug) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: slug,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
