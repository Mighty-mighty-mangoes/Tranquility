import React from 'react';
import {Link} from 'react-router-dom';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    return (
      <div className="mx-auto mt-3">
        <h2 className="text-center">Log In to Your Account:</h2>
        <form className="container-md">
          <div className="row mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="jess@tranquility.com"
              value={this.state.email}
            />
          </div>
          <div className="row mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={this.state.password}
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
