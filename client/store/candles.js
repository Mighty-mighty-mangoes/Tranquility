import axios from 'axios';

const SET_CANDLES = 'SET_CANDLES';
const SINGLE_CANDLE = 'SINGLE_CANDLE';

export const setCandles = (candles) => ({
  type: SET_CANDLES,
  candles,
});

export const singleCandle = (candle) => ({
  type: SINGLE_CANDLE,
  candle,
});

//get all candles
export const fetchCandles = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/candles');
      dispatch(setCandles(data));
    } catch (err) {
      console.log('Something is wrong in the all candles thunk: ', err);
    }
  };
};
//get single candle
export const fetchSingleCandle = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/candles/${id}`);
      console.log('fetch single candle thunk', data);
      dispatch(singleCandle(data));
    } catch (err) {
      console.log('Something is wrong in the single candles thunk: ', err);
    }
  };
};
let initialState = {
  singleCandle: {},
  candles: [],
};
export default function candleReducer(state = initialState, action) {
  console.log('fetch candleReducer', action.type, 'state', state);
  switch (action.type) {
    case SET_CANDLES:
      return action.candles;

    case SINGLE_CANDLE:
      return {...state, singleCandle: action.candle};

    default:
      return state;
  }
}
//thought this was needed?  return null
