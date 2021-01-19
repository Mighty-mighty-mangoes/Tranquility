import React from 'react';
import {connect} from 'react-redux';
import {fetchFoodCandles} from '../store/candles';
import CandleBlock from './CandleBlock';

export class FoodCandles extends React.Component {
  componentDidMount() {
    this.props.loadFoodCandles();
  }

  render() {
    const {foodCandles} = this.props.candles || [];
    let candles = foodCandles.filter((candle) => candle.stock > 0);

    return (
      <div className="container">
        <h1 className="page-title">
          <center>...candles for food lovers...</center>
        </h1>
        <div className="row">
          {candles.map((candle) => (
            <CandleBlock key={candle.id} candle={candle} />
          ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    candles: state.foodCandles,
  };
};
const mapDispatch = (dispatch) => ({
  loadFoodCandles: () => dispatch(fetchFoodCandles()),
});

export default connect(mapState, mapDispatch)(FoodCandles);
