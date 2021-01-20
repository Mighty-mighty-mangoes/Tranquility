import React from 'react';
import {connect} from 'react-redux';
import {getCartContents, deleteItemFromCart} from '../store/cart';
import EditCartItem from './EditCartItem';
import {me} from '../store/user';

export class Cart extends React.Component {
  async componentDidMount() {
    await this.props.loadUser();
    await this.props.loadCartContents(this.props.user);
  }

  getTotal() {
    return (
      this.props.cartContents.reduce(
        (total, item) => total + item.price * item.orderItem.quantity,
        0
      ) / 100
    );
  }

  async handleDelete(event, cartItem) {
    event.preventDefault();
    if (this.props.isLoggedIn) {
      await this.props.deleteItem(cartItem, this.props.user);
    }
  }

  render() {
    const cartContents = this.props.cartContents || [];
    const guestCart = JSON.parse(localStorage.getItem('cart')) || [];
    return (
      <div className="container">
        <div className="row">
          <div className="col-8 m-3 cartList">
            <h2>Your Cart:</h2>
            {this.props.isLoggedIn
              ? cartContents.map((cartItem) => {
                  return (
                    <div key={cartItem.id} className="item-container">
                      <img
                        className="img-thumbnail-view"
                        src={cartItem.imageUrl}
                      />{' '}
                      {cartItem.name}
                      <button
                        type="submit"
                        onClick={(event) => this.handleDelete(event, cartItem)}
                        className="btn btn-secondary btn-sm"
                      >
                        Remove
                      </button>
                      <EditCartItem candle={cartItem} />
                    </div>
                  );
                })
              : guestCart.map((item) => {
                  return (
                    <div key={item.id} className="row">
                      <p className="col-6">Item Name: {item.name}</p>
                      <p className="col-5">Quantity: x</p>
                      <p>Price: {item.formattedPrice}</p>
                    </div>
                  );
                })}
          </div>
          <div className="col-3 m-3 cartList">
            <h2>Total:</h2>
            {this.props.isLoggedIn &&
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(this.getTotal().toFixed(2))}
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
});

export default connect(mapState, mapDispatch)(Cart);
