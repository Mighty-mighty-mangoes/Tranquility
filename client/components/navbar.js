import React from 'react';
import {me} from '../store/user';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';
import logo from '../../public/logo.png';
import {getCartContents} from '../store/cart';

class Navbar extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  async componentDidMount() {
    await this.props.loadUser();
  }

  async handleClick() {
    await this.props.logout();
    await this.props.getCartContents({});
  }

  render() {
    return (
      <div>
        <img src={logo} className="img-fluid d-block" />
        <div className="text-end me-3">
          <Link to="/cart" className="m-2 p-2 cartLink">
            🛒Cart
          </Link>
        </div>
        <nav
          className="navbar navbar-expand-sm navbar-light"
          style={{backgroundColor: '#BEDCFE'}}
        >
          <ul className="navbar-nav nav-justified">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Shop
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link to="/allCandles" className="dropdown-item">
                    All Candles
                  </Link>
                </li>
                <li>
                  <Link to="/foodCandles" className="dropdown-item">
                    Food
                  </Link>
                </li>
                <li>
                  <Link to="/flowerCandles" className="dropdown-item">
                    Flowers
                  </Link>
                </li>
                <li>
                  <Link to="/spiceCandles" className="dropdown-item">
                    Spices
                  </Link>
                </li>
                <li>
                  <Link to="/coderCandles" className="dropdown-item">
                    Candles for Coders
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/aboutUs" className="nav-link">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
            {this.props.isLoggedIn ? (
              <li className="nav-item">
                <a className="nav-link" onClick={this.handleClick}>
                  Logout
                </a>
              </li>
            ) : (
              <li className="row nav-item">
                <Link to="/login" className="col nav-link">
                  Log In
                </Link>
                <Link to="/signup" className="col nav-link">
                  Sign Up
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCartContents: (user) => dispatch(getCartContents(user)),
    logout: () => dispatch(logout()),
    loadUser: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(Navbar);
