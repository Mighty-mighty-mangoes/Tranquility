import React from 'react';
import {connect} from 'react-redux';

const Homepage = ({isLoggedIn, name}) => (
  <div>
    <h1>tranquility: candles for finding your peace</h1>
    {isLoggedIn ? (
      <p className="text-center">Welcome back, {name}!</p>
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

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    name: state.user.firstName,
  };
};

export default connect(mapState)(Homepage);
