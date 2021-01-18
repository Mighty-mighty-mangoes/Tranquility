import React from 'react';
import {connect} from 'react-redux';
import {fetchSingleCandle} from '../store/candles';

export class SingleCandle extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.candleId; //make sure this checks out
    this.props.loadSingleCandle(id);
  }

  render() {
    const candle = this.props.candle.singleCandle;
    console.log('in single candle render', candle);
    return (
      <div className="single-list-wrapper">
        <h1>
          <center>
            experience... <strong>{candle.name}</strong>
          </center>
        </h1>
        <img src={candle.imageUrl} className="img-single-view" />
        <br />
        <h2>
          <center>
            <br />
            This {candle.size}, {candle.color} candle will awaken your senses
            and remind you of your favorite {candle.theme}. {candle.description}
            .
          </center>
        </h2>
        {candle.stock < 10 && (
          <h3 className="warning">
            Hurry! Supplies are limited! <br />
            Only {candle.stock} remaining...
          </h3>
        )}
        <h3>
          <center>Price: {candle.formattedPrice}</center>
        </h3>
        <input
          className="btn btn-dark"
          type="submit"
          value="Add to Cart"
        ></input>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    candle: state.singleCandle,
  };
};

const mapDispatch = (dispatch) => ({
  loadSingleCandle: (id) => dispatch(fetchSingleCandle(id)),
});
export default connect(mapState, mapDispatch)(SingleCandle);
