import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchSpiceCandles} from '../store/candles';
import AddToCart from './AddToCart';

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
          {candles.map((candle) => {
            return (
              <div key={candle.id} className="col-sm-3 border border-muted">
                <div>
                  <h4>
                    <small>experience...</small>
                    <br />{' '}
                    <strong>
                      <center>{candle.name}</center>
                    </strong>
                  </h4>
                  <center>
                    <img src={candle.imageUrl} className="img-list-view" />
                    <br />
                    Price: {candle.formattedPrice}
                  </center>

                  <center>
                    <Link to={`/viewSingleCandle/${candle.id}`}>more info</Link>
                    <br />
                    <AddToCart candleId={candle.id} />
                    {candle.stock < 10 && (
                      <h6 className="warning">
                        <center>Hurry! Only {candle.stock} remaining...</center>
                      </h6>
                    )}
                  </center>
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
    candles: state.spiceCandles,
  };
};
const mapDispatch = (dispatch) => ({
  loadSpiceCandles: () => dispatch(fetchSpiceCandles()),
});

export default connect(mapState, mapDispatch)(SpiceCandles);
