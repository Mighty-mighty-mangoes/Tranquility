import React from 'react';
import {connect} from 'react-redux';
import {fetchCoderCandles} from '../store/candles';
import CandleBlock from './CandleBlock';

class CoderCandles extends React.Component {
  componentDidMount() {
    this.props.loadCoderCandles();
  }

  render() {
    const {coderCandles} = this.props.candles || [];
    let candles = coderCandles.filter((candle) => candle.stock > 0);
    return (
      <div className="container">
        <h1 className="page-title">
          <center>...candles for coders...</center>
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
    candles: state.coderCandles,
  };
};
const mapDispatch = (dispatch) => ({
  loadCoderCandles: () => dispatch(fetchCoderCandles()),
});

export default connect(mapState, mapDispatch)(CoderCandles);
