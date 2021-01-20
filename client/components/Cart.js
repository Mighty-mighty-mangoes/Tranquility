import React from 'react';
import {connect} from 'react-redux';
import {getCartContents, deleteItemFromCart} from '../store/cart';
import EditCartItem from './EditCartItem';
import {me, checkout} from '../store/user';

export class Cart extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  async componentDidMount() {
    await this.props.loadUser();
    await this.props.loadCartContents(this.props.user);
  }

  getTotal() {
    if (this.props.cartContents) {
      return (
        this.props.cartContents.reduce(
          (total, item) => total + item.price * item.orderItem.quantity,
          0
        ) / 100
      );
    }
  }

  async handleClick(event) {
    event.preventDefault();
    await this.props.checkout();
  }

  async handleDelete(event, cartItem) {
    event.preventDefault();
    if (this.props.isLoggedIn) {
      await this.props.deleteItem(cartItem, this.props.user);
    }
  }

  render() {
    const cartContents = this.props.cartContents || [];
    return (
      <div className="container">
        <div className="row">
          <div className="col-8 m-3 cartList">
            <h2>Your Cart:</h2>
            {cartContents.map((cartItem) => {
              return (
                <div key={cartItem.id} className="container row">
                  <div className="col">
                    <img
                      className="rounded img-thumbnail-view"
                      src={cartItem.imageUrl}
                    />
                    <p className="text-start">{cartItem.name}</p>
                  </div>
                  <button
                    type="submit"
                    onClick={(event) => this.handleDelete(event, cartItem)}
                    className="col btn"
                  >
                    Remove
                  </button>
                  <EditCartItem candle={cartItem} />
                </div>
              );
            })}
          </div>
          <div className="col-3 m-3 cartList">
            <h2>Total:</h2>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(this.getTotal().toFixed(2))}
            <button
              type="submit"
              onClick={this.handleClick}
              className="m-3 btn btn-secondary btn-sm"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    cartContents: state.cart.cartContents,
    user: state.user,
  };
};
const mapDispatch = (dispatch) => ({
  loadUser: () => dispatch(me()),
  loadCartContents: (user) => dispatch(getCartContents(user)),
  deleteItem: (item, user) => dispatch(deleteItemFromCart(item, user)),
  checkout: () => dispatch(checkout()),
});

export default connect(mapState, mapDispatch)(Cart);
