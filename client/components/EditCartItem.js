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
    event.preventDefault();
    await this.props.editItem(
      this.props.candle,
      this.state.quantity,
      this.props.user
    );
  }

  render() {
    return (
      <div className="col-5 btn-group">
        <form className="m-2 btn btn-secondary btn-sm">
          <label className="btn btn-secondary btn-sm">
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
