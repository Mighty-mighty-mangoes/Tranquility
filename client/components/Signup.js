import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {auth} from '../store/user';

export default class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      street: '',
      city: '',
      state: '',
      zipcode: '',
    };
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
    await this.props.auth(this.state.email, this.state.password, 'login');
    this.setState({
      email: '',
      password: '',
    });
  }

  render() {
    return (
      <div className="mx-auto mt-3">
        <h2 className="text-center">Create an Account:</h2>
        <form
          className="container needs-validation"
          onSubmit={this.handleSubmit}
          noValidate
        >
          <div className="col-md-4">
            <label htmlFor="firstName" className="form-label">
              First name
            </label>
            <input
              name="firstName"
              type="text"
              className="form-control"
              id="firstName"
              value={this.state.firstName}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="lastName" className="form-label">
              Last name
            </label>
            <input
              name="lastName"
              type="text"
              className="form-control"
              id="lastName"
              value={this.state.lastName}
              required
            />
          </div>
          <div className="row mb-3">
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
            />
          </div>
          <div className="row mb-3">
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
            />
          </div>
          <div className="row mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              type="phoneNumber"
              className="form-control"
              id="phoneNumber"
              onChange={this.handleChange}
              value={this.state.phoneNumber}
            />
          </div>
          <div className="row mb-3">
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
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="validationCustom03" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="validationCustom03"
              required
            />
            <div className="invalid-feedback">Please provide a valid city.</div>
          </div>
          <div className="row mb-3">
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
            />
          </div>
          <div className="row mb-3">
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
            />
          </div>
          <input className="btn btn-dark" type="submit" value="Submit"></input>
          <div className="row">
            <Link to="/signup">Sign Up Here</Link>
          </div>
        </form>
      </div>
    );
  }
}

// const mapDispatch = (dispatch) => {
//   return {
//     auth: (email, password, method) => dispatch(auth(email, password, method)),
//   };
// };

// export default connect(null, mapDispatch)(Login);
