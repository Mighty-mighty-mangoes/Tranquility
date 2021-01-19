import React from 'react';
import {connect} from 'react-redux';
import {fetchSpiceCandles} from '../store/candles';
import CandleBlock from './CandleBlock';

export class SpiceCandles extends React.Component {
  componentDidMount() {
    this.props.loadSpiceCandles();
  }

  render() {
    const {spiceCandles} = this.props.candles || [];
    let candles = spiceCandles.filter((candle) => candle.stock > 0);

    return (
      <div className="container">
        <h1 className="page-title">
          <center>...candles for spice lovers...</center>
        </h1>
        {/* <div className="list-wrapper"> */}
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
    candles: state.spiceCandles,
  };
};
const mapDispatch = (dispatch) => ({
  loadSpiceCandles: () => dispatch(fetchSpiceCandles()),
});

export default connect(mapState, mapDispatch)(SpiceCandles);
