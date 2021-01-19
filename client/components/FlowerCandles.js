import React from 'react';
import {connect} from 'react-redux';
import {fetchFlowerCandles} from '../store/candles';
import CandleBlock from './CandleBlock';

export class FlowerCandles extends React.Component {
  componentDidMount() {
    this.props.loadFlowerCandles();
  }

  render() {
    const {flowerCandles} = this.props.candles || [];
    let candles = flowerCandles.filter((candle) => candle.stock > 0);

    return (
      <div className="container">
        <h1 className="page-title">
          <center>...candles for flower lovers...</center>
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
    candles: state.flowerCandles,
  };
};
const mapDispatch = (dispatch) => ({
  loadFlowerCandles: () => dispatch(fetchFlowerCandles()),
});

export default connect(mapState, mapDispatch)(FlowerCandles);
