import React from 'react';
import {connect} from 'react-redux';
import {getCartContents, deleteItemFromCart, checkoutCart} from '../store/cart';
import EditCartItem from './EditCartItem';
import {me} from '../store/user';

export class Cart extends React.Component {
  constructor() {
    super();
    this.handleCheckout = this.handleCheckout.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    await this.props.loadUser();
    if (this.props.isLoggedIn) {
      await this.props.loadCartContents(this.props.user);
    }
  }

  getTotal(cartContents) {
    return (
      cartContents.reduce(
        (total, item) => total + item.price * item.orderItem.quantity,
        0
      ) / 100
    );
  }

  async handleDelete(event, cartItem) {
    event.preventDefault();
    await this.props.deleteItem(cartItem, this.props.user);
  }

  async handleCheckout(event) {
    event.preventDefault();
    await this.props.checkout(this.props.cartContents, this.props.user);
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
            }).format(this.getTotal(cartContents).toFixed(2))}
            {cartContents.length ? (
              <button
                type="submit"
                onClick={(event) => this.handleCheckout(event)}
                className="btn m-3 btn-secondary btn-sm"
              >
                Checkout
              </button>
            ) : (
              <div />
            )}
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
  checkout: (cartContents, user) => dispatch(checkoutCart(cartContents, user)),
});

export default connect(mapState, mapDispatch)(Cart);
