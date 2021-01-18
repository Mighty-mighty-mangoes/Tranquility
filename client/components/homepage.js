import React from 'react';
import {connect} from 'react-redux';
import {me} from '../store/user';

class Homepage extends React.Component {
  async componentDidMount() {
    await this.props.loadUser();
  }

  render() {
    return (
      <div>
        <h1>tranquility: candles for finding your peace</h1>
        {this.props.isLoggedIn ? (
          <p className="text-center">Welcome back, {this.props.name}!</p>
        ) : (
          <p className="text-center">Welcome to our little shop!</p>
        )}
        <div className="d-flex justify-content-center">
          <img
            src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/01/17/11/istock-994807816.jpg"
            className="img-fluid featureImage rounded"
            alt="candles"
          />
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    name: state.user.firstName,
  };
};

const mapDispatch = (dispatch) => ({
  loadUser: () => dispatch(me()),
});

export default connect(mapState, mapDispatch)(Homepage);
