import React from 'react';
import {connect} from 'react-redux';
import addItemToCart from '../store/cart';

export class AddToCart extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.props.isLoggedIn) {
      await this.props.addItem(this.props.candle, this.props.user);
    } else {
      const guestCart = JSON.parse(localStorage.getItem('cart'));
      if (guestCart) {
        guestCart.push(this.props.candle);
        localStorage.setItem('cart', JSON.stringify(guestCart));
      } else {
        localStorage.setItem('cart', JSON.stringify([this.props.candle]));
      }
    }
  }

  render() {
    return (
      <div className="btn-group">
        <form className="btn btn-secondary btn-sm" onSubmit={this.handleSubmit}>
          <button type="submit" className="btn btn-secondary btn-sm">
            Add to Cart
          </button>
          <label className="btn btn-secondary btn-sm">
            Quantity
            <select
              name="quantity"
              type="select"
              className="btn btn-secondary btn-sm dropdown-toggle"
              value={this.state.quantity}
              onChange={this.handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addItem: (item, user) => dispatch(addItemToCart(item, user)),
  };
};

export default connect(mapState, mapDispatch)(AddToCart);
