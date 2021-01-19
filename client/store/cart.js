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
export const getCartContents = () => {
  return async (dispatch) => {
    const order = await axios.get('/api/cart');
    const cartContents = (order.data && order.data.candles) || [];
    dispatch(setCartContents(cartContents));
  };
};
export const addItemToCart = (cartItem, user) => {
  return async (dispatch) => {
    if (user.id) {
      await axios.post('/api/cart', cartItem.orderItem);
    }
    dispatch(addCartItem(cartItem));
  };
};
export const editItemInCart = (cartItem, user) => {
  return async (dispatch) => {
    if (user.id) {
      await axios.put('/api/cart', cartItem.orderItem);
    }
    dispatch(editCartItem(cartItem));
  };
};
export const deleteItemFromCart = (cartItem, user) => {
  return async (dispatch) => {
    if (user.id) {
      await axios.delete('/api/cart', cartItem.orderItem);
    }
  };
};

const initialState = {cartContents: []};
// Reducer
export default function cartItemReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CART_ITEM: {
      if (action.cartItem.quantity === 0) return state;
      let cartContents = [...state.cartContents];
      let index = 0;
      while (
        index < cartContents.length &&
        cartContents[index].id !== action.cartItem.id
      ) {
        index++;
      }
      if (index < cartContents.length) {
        cartContents[index] = {
          candle: action.cartItem.candle,
          quantity:
            cartContents[index].order.quantity +
            action.cartItem.orderItem.quantity,
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
            (cartItem) => cartItem.candle.id !== action.cartItem.candle.id
          ),
        };
      }
      let cartContents = state.cartContents.map((cartItem) =>
        cartItem.id === action.cartItem.id ? action.cartItem : cartItem
      );
      return {...state, cartContents};
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
