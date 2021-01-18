import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchFoodCandles} from '../store/candles';

export class FoodCandles extends React.Component {
  componentDidMount() {
    this.props.loadFoodCandles();
  }

  render() {
    const {foodCandles} = this.props.candles || [];
    let candles = foodCandles.filter((candle) => candle.stock > 0);

    return (
      <div>
        <h1>
          <center>...candles for food lovers...</center>
        </h1>
        <div className="list-wrapper">
          {candles.map((candle) => {
            return (
              <div key={candle.id} className="item-container">
                <div>
                  <h4>
                    <small>experience...</small> <br></br>
                    <strong>
                      <center>{candle.name}</center>
                    </strong>
                  </h4>
                  <img src={candle.imageUrl} className="img-list-view" />
                  <center>Price: {candle.formattedPrice}</center>
                  {candle.stock < 10 && (
                    <h6 className="warning">
                      <center>Hurry! Only {candle.stock} remaining...</center>
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
    candles: state.foodCandles,
  };
};
const mapDispatch = (dispatch) => ({
  loadFoodCandles: () => dispatch(fetchFoodCandles()),
});

export default connect(mapState, mapDispatch)(FoodCandles);
