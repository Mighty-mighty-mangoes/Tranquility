/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable complexity */
import axios from 'axios';

// Action types
const ADD_CART_ITEM = 'ADD_CART_ITEM';
const EDIT_CART_ITEM = 'EDIT_CART_ITEM';
const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
const SET_CART_CONTENTS = 'SET_CART_CONTENTS';

// Action creators
const addCartItem = (cartItem) => {
  return {type: ADD_CART_ITEM, cartItem};
};
const editCartItem = (cartItem) => {
  return {type: EDIT_CART_ITEM, cartItem};
};
const deleteCartItem = (cartItem) => {
  return {type: DELETE_CART_ITEM, cartItem};
};
const setCartContents = (cartContents) => {
  return {type: SET_CART_CONTENTS, cartContents};
};

// Thunk creators
export const getCartContents = (user) => {
  return async (dispatch) => {
    try {
      let cartContents = [];
      if (user.id) {
        const order = await axios.get('/api/cart');
        if (order.data) {
          cartContents = order.data.candles;
        }
      }
      dispatch(setCartContents(cartContents));
    } catch (err) {
      console.log('Something is wrong in the getCartContents thunk: ', err);
    }
  };
};

export const addItemToCart = (candle, quantity, user) => {
  return async (dispatch) => {
    try {
      const orderItem = {candleId: candle.id, quantity: parseInt(quantity, 10)};
      const cartItem = {...candle, orderItem};
      if (user.id) {
        await axios.post('/api/cart', orderItem);
      }
      dispatch(addCartItem(cartItem));
    } catch (err) {
      console.log('Something is wrong in the addItemToCart thunk: ', err);
    }
  };
};

export const editItemInCart = (candle, quantity, user) => {
  return async (dispatch) => {
    try {
      const orderItem = {candleId: candle.id, quantity: parseInt(quantity, 10)};
      const cartItem = {...candle, orderItem};
      if (user.id) {
        await axios.put('/api/cart', orderItem);
      }
      dispatch(editCartItem(cartItem));
    } catch (err) {
      console.log('Something is wrong in the editItemInCart thunk: ', err);
    }
  };
};

export const deleteItemFromCart = (candle, user) => {
  return async (dispatch) => {
    try {
      const orderItem = {candleId: candle.id};
      const cartItem = {...candle, orderItem};
      if (user.id) {
        await axios.delete(`/api/cart/${candle.id}`);
      }
      dispatch(deleteCartItem(cartItem));
    } catch (err) {
      console.log('Something is wrong in the deleteItemFromCart thunk: ', err);
    }
  };
};

export const checkoutCart = (cartContents, user) => {
  return async (dispatch) => {
    try {
      let response = user.id
        ? await axios.post('/api/cart/checkout')
        : await axios.post('/api/cart/guestCheckout', {cartContents});
      console.log('Order successful');
      dispatch(setCartContents([]));
    } catch (err) {
      if (err.response.status === 409) {
        console.log('Insufficient stock');
        throw err;
      } else {
        console.log('Something is wrong in the checkoutCart thunk: ', err);
      }
    }
  };
};
const initialState = {cartContents: []};
// Reducer
export default function cartItemReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CART_ITEM: {
      if (action.cartItem.orderItem.quantity == 0) return state;
      let cartContents = [...state.cartContents];
      let index = 0;
      while (
        index < cartContents.length &&
        cartContents[index].id != action.cartItem.id
      ) {
        index++;
      }
      if (index < cartContents.length) {
        const orderItem = {...action.cartItem.orderItem};
        orderItem.quantity += parseInt(
          cartContents[index].orderItem.quantity,
          10
        );
        cartContents[index] = {
          ...cartContents[index],
          orderItem,
        };
      } else {
        cartContents.push(action.cartItem);
      }
      return {...state, cartContents};
    }
    case EDIT_CART_ITEM: {
      if (action.cartItem.orderItem.quantity == 0) {
        return {
          ...state,
          cartContents: state.cartContents.filter(
            (cartItem) => cartItem.id != action.cartItem.id
          ),
        };
      }
      return {
        ...state,
        cartContents: state.cartContents.map((cartItem) =>
          cartItem.id == action.cartItem.id ? action.cartItem : cartItem
        ),
      };
    }
    case DELETE_CART_ITEM:
      return {
        ...state,
        cartContents: state.cartContents.filter(
          (cartItem) => cartItem.id != action.cartItem.id
        ),
      };
    case SET_CART_CONTENTS:
      return {...state, cartContents: action.cartContents};
    default:
      return state;
  }
}
