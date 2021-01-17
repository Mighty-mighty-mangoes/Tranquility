import React from 'react';
import {Link} from 'react-router-dom';

export function AllCandles(candles) {
  return (
    <div className="list-wrapper">
      {candles.map((candle) => {
        return (
          <div key={candle.id} className="item-container">
            <div>
              <h4>
                <small>experience...</small> <strong>{candle.name}</strong>
              </h4>
              <Link to={`/viewSingleCandle/${candle.id}`}>
                <img src={candle.imageUrl} className="img-list-view" />
              </Link>
              <p>{candle.description}.</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
