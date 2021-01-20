import React from 'react';
import {connect} from 'react-redux';
import {getCartContents} from '../store/cart';
import {me} from '../store/user';

export class Cart extends React.Component {
  async componentDidMount() {
    await this.props.loadUser();
    await this.props.loadCartContents(this.props.user);
  }

  getTotal() {
    let total = 0;
    this.props.cartContents.map((item) => {
      // total += item.candles.price?
    });
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
                      <p>candleId: {cartItem.id}</p>
                      <p>Quantity: {cartItem.orderItem.quantity}</p>
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
});

export default connect(mapState, mapDispatch)(Cart);
