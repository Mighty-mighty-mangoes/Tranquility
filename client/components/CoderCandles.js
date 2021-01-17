import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchCoderCandles} from '../store/candles';

export class CoderCandles extends React.Component {
  componentDidMount() {
    this.props.loadCoderCandles();
  }

  render() {
    const {coderCandles} = this.props.candles || [];
    let candles = coderCandles.filter((candle) => candle.stock > 0);
    return (
      <div>
        <h1>
          <center>...candles for coders...</center>
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
    candles: state.coderCandles,
  };
};
const mapDispatch = (dispatch) => ({
  loadCoderCandles: () => dispatch(fetchCoderCandles()),
});

export default connect(mapState, mapDispatch)(CoderCandles);
