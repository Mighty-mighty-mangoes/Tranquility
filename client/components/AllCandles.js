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
      <div className="container">
        <h1>
          <center>...all our candles...</center>
        </h1>

        <div className="row">
          {candles.map((candle) => {
            return (
              <div key={candle.id} className="col-sm-3">
                <div>
                  <h4>
                    <small>experience...</small>
                    <br />
                    <strong>
                      <center>{candle.name}</center>
                    </strong>
                  </h4>
                  <img src={candle.imageUrl} className="img-list-view" />
                  <center>Price: {candle.formattedPrice}</center>
                  <center>
                    <p>
                      This {candle.size} sized candle is from our {candle.theme}{' '}
                      collection...
                    </p>
                  </center>
                  {candle.stock < 10 && (
                    <h6 className="warning">
                      <center> Hurry! Only {candle.stock} remaining...</center>
                    </h6>
                  )}
                  <Link
                    to={`/viewSingleCandle/${candle.id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    more info
                  </Link>
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
