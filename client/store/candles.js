import axios from 'axios';

const SET_CANDLES = 'SET_CANDLES'; //all candles
const SINGLE_CANDLE = 'SINGLE_CANDLE';
const SET_FOOD_CANDLES = 'SET_FOOD_CANDLES';

export const setCandles = (candles) => ({
  type: SET_CANDLES,
  candles,
});

export const singleCandle = (candle) => ({
  type: SINGLE_CANDLE,
  candle,
});

export const setFoodCandles = (candles) => ({
  type: SET_FOOD_CANDLES,
  candles,
});

//get all candles-works
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
//get single candle-works
export const fetchSingleCandle = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/candles/${id}`);
      dispatch(singleCandle(data));
    } catch (err) {
      console.log('Something is wrong in the single candles thunk: ', err);
    }
  };
};

//get food candles
export const fetchFoodCandles = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/candles/food');
      console.log('data in the food candles thunk: ', data);
      dispatch(setFoodCandles(data));
    } catch (err) {
      console.log('Something is wrong in the food candles thunk: ', err);
    }
  };
};

let initialState = {
  singleCandle: {},
  candles: [],
  foodCandles: [],
};
export default function candleReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CANDLES:
      return {...state, candles: action.candles};

    case SINGLE_CANDLE:
      return {...state, singleCandle: action.candle};

    case SET_FOOD_CANDLES:
      return {...state, foodCandles: action.candles};

    default:
      return state;
  }
}
//thought this was needed?  return null
