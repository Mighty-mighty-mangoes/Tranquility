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

  async componentDidMount() {
    await this.props.loadUser();
  }

  handleChange(event) {
    this.setState({quantity: event.target.value});
  }

  async handleSubmit(event) {
    console.log('In add to cart, something added: qty', this.state.quantity);
    event.preventDefault();
    if (this.props.isLoggedIn) {
      await this.props.addItem(this.props.candle, this.state.user);
    }
  }

  render() {
    return (
      <div className="btn-group">
        <form className="btn btn-secondary btn-sm">
          <button
            type="submit"
            onChange={this.handleSubmit}
            className="btn btn-secondary btn-sm"
          >
            Add to Cart
          </button>
          <label className="btn btn-secondary btn-sm">
            Quantity
            <select
              type="select"
              className="btn btn-secondary btn-sm dropdown-toggle"
              value={this.state.value}
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
  };
};

const mapDispatch = (dispatch) => ({
  loadUser: () => dispatch(me()),
  addItem: (item, user) => dispatch(addItemToCart(item, user)),
});

export default connect(mapState, mapDispatch)(AddToCart);
