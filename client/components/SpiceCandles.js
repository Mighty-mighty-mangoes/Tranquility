import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchSpiceCandles} from '../store/candles';

export class SpiceCandles extends React.Component {
  componentDidMount() {
    this.props.loadSpiceCandles();
  }

  render() {
    const {spiceCandles} = this.props.candles || [];
    let candles = spiceCandles.filter((candle) => candle.stock > 0);

    return (
      <div>
        <h1>
          <center>...candles for spice lovers...</center>
        </h1>
        <div className="list-wrapper">
          {candles.map((candle) => {
            return (
              <div key={candle.id} className="item-container">
                <div>
                  <h4>
                    <small>experience...</small>
                    <br />{' '}
                    <strong>
                      <center>{candle.name}</center>
                    </strong>
                  </h4>
                  <Link to={`/viewSingleCandle/${candle.id}`}>
                    <img src={candle.imageUrl} className="img-list-view" />
                  </Link>
                  <p>{candle.theme}.</p>
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
