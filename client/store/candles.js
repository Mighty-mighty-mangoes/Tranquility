import axios from 'axios';

const SET_CANDLES = 'SET_CANDLES'; //all candles
const SINGLE_CANDLE = 'SINGLE_CANDLE';
const SET_FOOD_CANDLES = 'SET_FOOD_CANDLES';
const SET_SPICE_CANDLES = 'SET_SPICE_CANDLES';
const SET_FLOWER_CANDLES = 'SET_FLOWER_CANDLES';
const SET_CODER_CANDLES = 'SET_CODER_CANDLES';

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

export const setSpiceCandles = (candles) => ({
  type: SET_SPICE_CANDLES,
  candles,
});
export const setFlowerCandles = (candles) => ({
  type: SET_FLOWER_CANDLES,
  candles,
});

export const setCoderCandles = (candles) => ({
  type: SET_CODER_CANDLES,
  candles,
});
//ALL CANDLES-works
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
//SINGLE CANDLE-works
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

//FOOD CANDLES -works
export const fetchFoodCandles = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/candles/food');
      dispatch(setFoodCandles(data));
    } catch (err) {
      console.log('Something is wrong in the food candles thunk: ', err);
    }
  };
};
//SPICE  CANDLES-works
export const fetchSpiceCandles = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/candles/spices');
      dispatch(setSpiceCandles(data));
    } catch (err) {
      console.log('Something is wrong in the spice candles thunk: ', err);
    }
  };
};
//FLOWER CANDLES-works
export const fetchFlowerCandles = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/candles/flowers');
      dispatch(setFlowerCandles(data));
    } catch (err) {
      console.log('Something is wrong in the flower candles thunk: ', err);
    }
  };
};

//CODER CANDLES-works
export const fetchCoderCandles = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/candles/coders');
      dispatch(setCoderCandles(data));
    } catch (err) {
      console.log('Something is wrong in the coder candles thunk: ', err);
    }
  };
};

let initialState = {
  singleCandle: {},
  candles: [],
  foodCandles: [],
  spiceCandles: [],
  flowerCandles: [],
  coderCandles: [],
};
export default function candleReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CANDLES:
      return {...state, candles: action.candles};

    case SINGLE_CANDLE:
      return {...state, singleCandle: action.candle};

    case SET_FOOD_CANDLES:
      return {...state, foodCandles: action.candles};

    case SET_SPICE_CANDLES:
      return {...state, spiceCandles: action.candles};

    case SET_FLOWER_CANDLES:
      return {...state, flowerCandles: action.candles};

    case SET_CODER_CANDLES:
      return {...state, coderCandles: action.candles};

    default:
      return state;
  }
}
