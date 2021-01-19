import React from 'react';
import {connect} from 'react-redux';
import addItemToCart from '../store/cart';
import me from '../store/user';

export class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {quantity: 1};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({quantity: event.target.value});
  }

  async handleSubmit(event) {
    console.log('In add to cart, something added: qty', this.state.quantity);
    event.preventDefault();
    if (this.props.isLoggedIn) {
      await this.props.addItem(
        this.props.candle,
        this.state.quantity,
        this.props.user
      );
    }
  }

  render() {
    return (
      <div className="btn-group">
        <form className="btn btn-secondary btn-sm">
          <button
            type="submit"
            onClick={this.handleSubmit}
            className="btn btn-secondary btn-sm"
          >
            Add to Cart
          </button>
          <label className="btn btn-secondary btn-sm">
            Quantity
            <select
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
    user: state.user,
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = (dispatch) => ({
  addItem: (item, quantity, user) =>
    dispatch(addItemToCart(item, quantity, user)),
});

export default connect(mapState, mapDispatch)(AddToCart);
