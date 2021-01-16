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

    console.log('all candles render', this.props);
    return (
      <div className="list-wrapper">
        {candles.map((candle) => {
          return (
            <div key={candle.id} className="item-container">
              <div>
                <h4>
                  <small>experience...</small> <strong>{candle.name}</strong>
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
