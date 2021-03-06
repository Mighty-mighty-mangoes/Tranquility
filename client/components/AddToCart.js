import React from 'react';
import {connect} from 'react-redux';
import {addItemToCart} from '../store/cart';

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
    await this.props.addItem(
      this.props.candle,
      this.state.quantity,
      this.props.user
    );
  }

  render() {
    return (
      <div className="btn-group">
        <form className="btn btn-secondary btn-sm" onSubmit={this.handleSubmit}>
          <button type="submit" className="btn btn-secondary btn-sm">
            Add to Cart
          </button>
          <label htmlFor="quantity" className="btn btn-secondary btn-sm">
            Quantity
            <input
              name="quantity"
              type="number"
              min="1"
              max={this.props.candle.stock}
              className="form-control"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
          </label>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = (dispatch) => ({
  addItem: (item, quantity, user) =>
    dispatch(addItemToCart(item, quantity, user)),
});

export default connect(mapState, mapDispatch)(AddToCart);
