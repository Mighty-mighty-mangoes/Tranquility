import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import candleReducer from './candles';
import cart from './cart';

const reducer = combineReducers({
  cart: cart,
  user: user,
  candles: candleReducer,
  singleCandle: candleReducer,
  foodCandles: candleReducer,
  spiceCandles: candleReducer,
  flowerCandles: candleReducer,
  coderCandles: candleReducer,
});

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
