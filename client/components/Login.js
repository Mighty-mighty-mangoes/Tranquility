import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {auth} from '../store/user';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
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
        <h2 className="text-center">Log In to Your Account:</h2>
        <form className="container-md" onSubmit={this.handleSubmit}>
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
          <input className="btn btn-dark" type="submit" value="Submit"></input>
          <div className="row">
            <Link to="/signup">Sign Up Here</Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    auth: (email, password, method) => dispatch(auth(email, password, method)),
  };
};

export default connect(null, mapDispatch)(Login);
