import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchFlowerCandles} from '../store/candles';

export class FlowerCandles extends React.Component {
  componentDidMount() {
    this.props.loadFlowerCandles();
  }

  render() {
    const {flowerCandles} = this.props.candles || [];
    let candles = flowerCandles.filter((candle) => candle.stock > 0);

    return (
      <div>
        <h1>
          <center>...candles for flower lovers...</center>
        </h1>
        <div className="list-wrapper">
          {candles.map((candle) => {
            return (
              <div key={candle.id} className="item-container">
                <div>
                  <h4>
                    <small>experience...</small> <br />
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
    candles: state.flowerCandles,
  };
};
const mapDispatch = (dispatch) => ({
  loadFlowerCandles: () => dispatch(fetchFlowerCandles()),
});

export default connect(mapState, mapDispatch)(FlowerCandles);
