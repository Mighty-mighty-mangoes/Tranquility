import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchFlowerCandles} from '../store/candles';
import AddToCart from './AddToCart';

export class FlowerCandles extends React.Component {
  componentDidMount() {
    this.props.loadFlowerCandles();
  }

  render() {
    const {flowerCandles} = this.props.candles || [];
    let candles = flowerCandles.filter((candle) => candle.stock > 0);

    return (
      <div className="container">
        <h1 className="page-title">
          <center>...candles for flower lovers...</center>
        </h1>
        <div className="row">
          {candles.map((candle) => {
            return (
              <div key={candle.id} className="col-sm-3 border border-muted">
                <div>
                  <h4>
                    <small>experience...</small> <br />
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
                    <Link to={`/viewSingleCandle/${candle.id}`}>
                      more info...
                    </Link>
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
    candles: state.flowerCandles,
  };
};
const mapDispatch = (dispatch) => ({
  loadFlowerCandles: () => dispatch(fetchFlowerCandles()),
});

export default connect(mapState, mapDispatch)(FlowerCandles);
