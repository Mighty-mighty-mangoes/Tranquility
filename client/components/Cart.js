import React from 'react';
import {connect} from 'react-redux';
import {getCartContents} from '../store/cart';
import {me} from '../store/user';

export class Cart extends React.Component {
  async componentDidMount() {
    await this.props.loadUser();
    await this.props.loadCartContents();
  }

  render() {
    const cartContents = this.props.cartContents || [];
    console.log('Props:', this.props);
    return (
      <div className="list-wrapper">
        {cartContents.map((cartItem) => {
          return (
            <div key={cartItem.id} className="item-container">
              <p>candleId: {cartItem.id}</p>
              <p>Quantity: {cartItem.orderItem.quantity}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cartContents: state.cart.cartContents,
    user: state.user,
  };
};
const mapDispatch = (dispatch) => ({
  loadUser: () => dispatch(me()),
  loadCartContents: () => dispatch(getCartContents()),
});

export default connect(mapState, mapDispatch)(Cart);
