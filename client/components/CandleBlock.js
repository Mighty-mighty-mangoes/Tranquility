import React from 'react';
import AddToCart from './AddToCart';
import {Link} from 'react-router-dom';

export default class CandleBlock extends React.Component {
  render() {
    return (
      <div key={this.props.candle.id} className="col-sm-3 border border-muted">
        <div>
          <h4>
            <small>experience...</small>
            <br />
            <strong>
              <center>{this.props.candle.name}</center>
            </strong>
          </h4>
          <center>
            <img
              src={this.props.candle.imageUrl}
              className="img-fluid img-list-view"
            />
            <br />
            Price: {this.props.candle.formattedPrice}
          </center>
          <center>
            <p>
              This {this.props.candle.size} sized candle is from our{' '}
              {this.props.candle.theme} collection...
              <br />
              <Link to={`/viewSingleCandle/${this.props.candle.id}`}>
                more info
              </Link>
            </p>
            <AddToCart candle={this.props.candle} />
            {this.props.candle.stock < 10 && (
              <h6 className="warning">
                Hurry! Only {this.props.candle.stock} remaining...
              </h6>
            )}
          </center>
        </div>
      </div>
    );
  }
}
