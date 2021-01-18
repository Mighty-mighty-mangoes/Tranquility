import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';
import logo from '../../public/logo.png';

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <img src={logo} className="img-fluid d-block" />
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
              <Link to="/listAllCandles" className="dropdown-item">
                All Candles
              </Link>
            </li>
            <li>
              <a className="nav-link dropdown-item">Food</a>
            </li>
            <li>
              <a className="nav-link dropdown-item">Flowers</a>
            </li>
            <li>
              <a className="nav-link dropdown-item">Spices</a>
            </li>
            <li>
              <a className="nav-link dropdown-item">Candles for Coders</a>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link">About Us</a>
        </li>
        <li className="nav-item">
          <a className="nav-link">Contact</a>
        </li>
        {isLoggedIn ? (
          <li className="nav-item">
            <a className="nav-link">Logout</a>
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

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

// const mapDispatch = (dispatch) => {
//   return {
//     handleClick() {
//       dispatch(logout());
//     },
//   };
// };

export default connect(mapState)(Navbar);

/**
 * PROP TYPES
 */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired,
// };
