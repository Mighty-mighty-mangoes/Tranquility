/* eslint-disable no-unused-vars */
/* eslint-disable complexity */
import axios from 'axios';

// Action types
const ADD_CART_ITEM = 'ADD_CART_ITEM';
const EDIT_CART_ITEM = 'EDIT_CART_ITEM';
const DELETE_CART_ITEM = 'DELETE_CART_ITEMS';
const SET_CART_CONTENTS = 'SET_CART_CONTENTS';

// Action creators
const addCartItem = (cartItem) => {
  console.log('Inside addCartItem action creator');
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
    let cartContents = [];
    if (user.id) {
      const order = await axios.get('/api/cart');
      if (order.data) {
        cartContents = order.data.candles;
      }
    }
    dispatch(setCartContents(cartContents));
  };
};
export const addItemToCart = (candle, quantity, user) => {
  return async (dispatch) => {
    console.log('Inside thunk creator addItemToCart');
    const orderItem = {candleId: candle.id, quantity};
    const cartItem = {...candle, orderItem};
    if (user.id) {
      await axios.post('/api/cart', orderItem);
    }
    dispatch(addCartItem(cartItem));
  };
};
export const editItemInCart = (candle, quantity, user) => {
  return async (dispatch) => {
    const orderItem = {candleId: candle.id, quantity};
    const cartItem = {...candle, orderItem};
    if (user.id) {
      await axios.put('/api/cart', orderItem);
    }
    dispatch(editCartItem(cartItem));
  };
};
export const deleteItemFromCart = (candle, user) => {
  return async (dispatch) => {
    const orderItem = {candleId: candle.id};
    const cartItem = {...candle, orderItem};
    if (user.id) {
      await axios.delete('/api/cart', orderItem);
    }
    dispatch(deleteCartItem(cartItem));
  };
};

const initialState = {cartContents: []};
// Reducer
export default function cartItemReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CART_ITEM: {
      if (action.cartItem.orderItem.quantity === 0) return state;
      let cartContents = [...state.cartContents];
      let index = 0;
      while (
        index < cartContents.length &&
        cartContents[index].id !== action.cartItem.id
      ) {
        index++;
      }
      if (index < cartContents.length) {
        const orderItem = {...action.cartItem.orderItem};
        orderItem.quantity += cartContents[index].orderItem.quantity;
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
      if (action.cartItem.quantity === 0) {
        return {
          ...state,
          cartContents: state.cartContents.filter(
            (cartItem) => cartItem.id !== action.cartItem.id
          ),
        };
      }
      return {
        ...state,
        cartContents: state.cartContents.map((cartItem) =>
          cartItem.id === action.cartItem.id ? action.cartItem : cartItem
        ),
      };
    }
    case DELETE_CART_ITEM:
      return {
        ...state,
        cartContents: state.cartContents.filter(
          (cartItem) => cartItem.id !== action.cartItem.id
        ),
      };
    case SET_CART_CONTENTS:
      return {...state, cartContents: action.cartContents};
    default:
      return state;
  }
}
