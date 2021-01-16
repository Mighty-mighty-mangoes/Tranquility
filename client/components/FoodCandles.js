import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchFoodCandles} from '../store/candles';

export class FoodCandles extends React.Component {
  componentDidMount() {
    this.props.loadFoodCandles();
  }

  render() {
    const candles = this.props.candles.foodCandles || [];

    console.log('food candles render', candles);
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
  console.log('mapState in food/ state', state);
  return {
    candles: state.foodCandles,
  };
};
const mapDispatch = (dispatch) => ({
  loadFoodCandles: () => dispatch(fetchFoodCandles()),
});

export default connect(mapState, mapDispatch)(FoodCandles);
