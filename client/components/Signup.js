import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {auth} from '../store/user';

const defaultState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
};

class Signup extends React.Component {
  constructor() {
    super();
    this.state = defaultState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.props.auth(this.state, 'signup');
    this.setState(defaultState);
  }

  render() {
    return (
      <div className="mx-auto mt-3">
        <h2 className="text-center">Create an Account:</h2>
        <form
          className="container-signup needs-validation"
          onSubmit={this.handleSubmit}
        >
          <div className="row">
            <div className="col">
              <label htmlFor="firstName" className="form-label">
                First name
              </label>
              <input
                name="firstName"
                type="text"
                className="form-control"
                id="firstName"
                onChange={this.handleChange}
                value={this.state.firstName}
                required
              />
              <div className="invalid-feedback">
                Please input your first name.
              </div>
            </div>
            <div className="col">
              <label htmlFor="lastName" className="form-label">
                Last name
              </label>
              <input
                name="lastName"
                type="text"
                className="form-control"
                id="lastName"
                onChange={this.handleChange}
                value={this.state.lastName}
                required
              />
              <div className="invalid-feedback">
                Please input your last name.
              </div>
            </div>
            <div className="col">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                name="phone"
                type="text"
                className="form-control"
                id="phone"
                onChange={this.handleChange}
                value={this.state.phoneNumber}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                name="email"
                type="email"
                className="form-control"
                id="email"
                onChange={this.handleChange}
                value={this.state.email}
                required
              />
              <div className="invalid-feedback">Please input your email.</div>
            </div>
            <div className="col">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="password"
                onChange={this.handleChange}
                value={this.state.password}
                required
              />
              <div className="invalid-feedback">Please input a password.</div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="street" className="form-label">
                Street
              </label>
              <input
                name="street"
                type="street"
                className="form-control"
                id="street"
                onChange={this.handleChange}
                value={this.state.street}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                name="city"
                type="text"
                className="form-control"
                id="city"
                onChange={this.handleChange}
                value={this.state.city}
              />
            </div>
            <div className="col">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <input
                name="state"
                type="state"
                className="form-control"
                id="state"
                onChange={this.handleChange}
                value={this.state.state}
              />
            </div>
            <div className="col">
              <label htmlFor="zipCode" className="form-label">
                Zip Code
              </label>
              <input
                name="zipCode"
                type="text"
                className="form-control"
                id="zipCode"
                onChange={this.handleChange}
                value={this.state.zipCode}
              />
            </div>
          </div>
          <div className="row">
            <input
              className="btn btn-dark"
              type="submit"
              value="Sign Up"
            ></input>
          </div>
        </form>
        <p className="text-center">Or...</p>
        <div className="row mx-auto">
          <Link to="/login" className="text-center">
            Log In Here
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    auth: (info, method) => dispatch(auth(info, method)),
  };
};

export default connect(null, mapDispatch)(Signup);
