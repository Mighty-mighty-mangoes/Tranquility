import React from 'react';

export default class Homepage extends React.Component {
  render() {
    return (
      <div>
        <h1>tranquility: candles for finding your peace</h1>
        <div className="imageBackground rounded m-auto">
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
