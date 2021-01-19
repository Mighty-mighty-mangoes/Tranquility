import React from 'react';
import {connect} from 'react-redux';
import {fetchCandles} from '../store/candles';
import CandleBlock from './CandleBlock';

export class AllCandles extends React.Component {
  componentDidMount() {
    this.props.loadCandles();
  }

  render() {
    let {candles} = this.props.candles || [];
    candles = candles.filter((candle) => candle.stock > 0);
    return (
      <div className="container">
        <h1 className="page-title">
          <center>...all our candles...</center>
        </h1>
        <div className="row ">
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
    candles: state.candles,
  };
};
const mapDispatch = (dispatch) => ({
  loadCandles: () => dispatch(fetchCandles()),
});

export default connect(mapState, mapDispatch)(AllCandles);
