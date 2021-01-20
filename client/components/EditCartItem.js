import React from 'react';
import {connect} from 'react-redux';
import {editItemInCart} from '../store/cart';

const getQuantityOptions = (stock, quantity) => {
  const quantityOptions = [];
  for (let i = 0; i <= stock; i++) {
    quantityOptions.push({value: i, message: i});
  }
  if (quantity > stock) {
    quantityOptions.push({
      value: quantity,
      message: `${quantity} (insufficient stock)`,
    });
  }
  return quantityOptions;
};

export class EditCartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {quantity: props.candle.orderItem.quantity};
    this.quantityOptions = getQuantityOptions(
      props.candle.stock,
      props.candle.orderItem.quantity
    );

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({quantity: event.target.value});
  }

  async handleSubmit(event) {
    console.log('In edit cart, something edited: qty', this.state.quantity);
    event.preventDefault();
    await this.props.editItem(
      this.props.candle,
      this.state.quantity,
      this.props.user
    );
  }

  render() {
    return (
      <div className="btn-group">
        <form className="btn btn-secondary btn-sm">
          <label className="btn btn-secondary btn-sm">
            Quantity
            <select
              type="select"
              className="btn btn-secondary btn-sm dropdown-toggle"
              value={this.state.quantity}
              onChange={this.handleChange}
            >
              {this.quantityOptions.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.message}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            onClick={this.handleSubmit}
            className="btn btn-secondary btn-sm"
          >
            Submit change
          </button>
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
  editItem: (item, quantity, user) =>
    dispatch(editItemInCart(item, quantity, user)),
});

export default connect(mapState, mapDispatch)(EditCartItem);
