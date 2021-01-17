import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchCandles} from '../store/candles';

export class AllCandles extends React.Component {
  componentDidMount() {
    this.props.loadCandles();
  }

  render() {
    let {candles} = this.props.candles || [];
    candles = candles.filter((candle) => candle.stock > 0);
    return (
      <div>
        <h1>
          <center>...all our candles...</center>
        </h1>
        <div className="list-wrapper">
          {candles.map((candle) => {
            return (
              <div key={candle.id} className="item-container">
                <div>
                  <h4>
                    <small>experience...</small>
                    <br />
                    <strong>
                      <center>{candle.name}</center>
                    </strong>
                  </h4>
                  <Link to={`/viewSingleCandle/${candle.id}`}>
                    <img src={candle.imageUrl} className="img-list-view" />
                  </Link>
                  <p>from our {candle.theme} collection...</p>
                  {candle.stock < 10 && (
                    <h6 className="warning">
                      <center>
                        Hurry! Supplies are limited! Only {candle.stock}{' '}
                        remaining...
                      </center>
                    </h6>
                  )}
                </div>
              </div>
            );
          })}
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
