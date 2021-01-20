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
    await this.props.auth(this.state, 'login');
    localStorage.setItem('user', this.props.user);
    this.setState({
      email: '',
      password: '',
    });
  }

  render() {
    return (
      <div className="mx-auto mt-3">
        <h2 className="text-center">Log In to Your Account:</h2>
        <form className="container-login" onSubmit={this.handleSubmit}>
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
              required
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
              required
            />
          </div>
          <div className="row">
            <input
              className="btn btn-dark"
              type="submit"
              value="Submit"
            ></input>
          </div>
          <p className="text-center">Or...</p>
          <div className="row mx-auto">
            <Link to="/signup" className="text-center">
              Sign Up Here
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    auth: (info, method) => dispatch(auth(info, method)),
  };
};

export default connect(mapState, mapDispatch)(Login);
